import LinearCard from "@/components/ui/linear-card";
import {FurtherAfield} from "./FurtherAfield";
import {SectionNav,BookingSteps} from "./JourneyMotion";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Heart,
  Wifi,
  Utensils,
  Dumbbell,
  ArrowUpRight,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import { hotels, money, nights, today, addDays, rateOptions } from "./data";
import { useStore, type Booking } from "./store";
import { Go, Modal, Field, Empty } from "./ui";
import { quoteStay, roomFits } from "./domain";
import { RoomPhoto, RoomGallery } from "./RoomGallery";
export function Search({ compact = false }: { compact?: boolean }) {
  const { state, setState } = useStore();
  const nav = useNavigate();
  const [t, setT] = useState(state.trip);
  const [error, setError] = useState("");
  const [more, setMore] = useState(false);
  return (
    <form
      className={"trip-search " + (compact ? "compact" : "")}
      onSubmit={(e) => {
        e.preventDefault();
        if (nights(t.checkin, t.checkout) < 1) {
          setError("Check-out must be after check-in.");
          return;
        }
        setState((s) => ({ ...s, trip: t }));
        nav("/hotels");
      }}
    >
      <div className="trip-fields">
        <Field label="Where are you going?">
          <span className="input-icon">
            <MapPin size={19} />
            <input
              aria-label="Destination"
              value="Visakhapatnam, India"
              readOnly
            />
          </span>
        </Field>
        <Field label="Check-in">
          <input
            type="date"
            min={today()}
            required
            value={t.checkin}
            onChange={(e) => {
              const checkin = e.target.value;
              setT({
                ...t,
                checkin,
                checkout:
                  checkin >= t.checkout ? addDays(checkin, 1) : t.checkout,
              });
            }}
          />
        </Field>
        <Field label="Check-out">
          <input
            type="date"
            required
            min={addDays(t.checkin, 1)}
            value={t.checkout}
            onChange={(e) => setT({ ...t, checkout: e.target.value })}
          />
        </Field>
        <button
          type="button"
          className="guest-control"
          onClick={() => setMore(!more)}
          aria-expanded={more}
        >
          <span>Rooms & guests</span>
          <strong>
            {t.rooms} room · {t.adults + t.children} guests
          </strong>
        </button>
        <button className="button search-submit">
          Find your stay <ArrowRight size={20} />
        </button>
      </div>
      {more && (
        <div className="search-extra">
          <Field label="Rooms">
            <input
              type="number"
              min="1"
              max="9"
              value={t.rooms}
              onChange={(e) => setT({ ...t, rooms: +e.target.value })}
            />
          </Field>
          <Field label="Adults per room">
            <input
              type="number"
              min="1"
              max="4"
              value={t.adults}
              onChange={(e) => setT({ ...t, adults: +e.target.value })}
            />
          </Field>
          <Field label="Children per room">
            <input
              type="number"
              min="0"
              max="3"
              value={t.children}
              onChange={(e) => setT({ ...t, children: +e.target.value })}
            />
          </Field>
          <Field label="Rate program">
            <select
              value={t.rate}
              onChange={(e) => setT({ ...t, rate: e.target.value })}
            >
              {rateOptions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </Field>
          {["Corporate", "Promotional"].includes(t.rate) && (
            <Field label="Rate code">
              <input
                required
                value={t.code}
                onChange={(e) => setT({ ...t, code: e.target.value })}
              />
            </Field>
          )}
        </div>
      )}
      <div className="search-note">
        <span>
          {nights(t.checkin, t.checkout)} nights. A little more time to explore.
        </span>
        <button
          type="button"
          className="text-button"
          onClick={() => setMore(!more)}
        >
          {t.rate} <SlidersHorizontal size={13} />
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
export function HotelCard({
  hotel,
  small = false,
}: {
  hotel: (typeof hotels)[number];
  small?: boolean;
}) {
  const { state, setState, notify } = useStore();
  const saved = state.favorites.includes(hotel.id);
  return (
    <LinearCard as="article" className={"hotel-card " + (small ? "small" : "")}>
      <div className="hotel-photo">
        <Link to={"/hotels/" + hotel.id}>
          <img
            src={hotel.image}
            alt={hotel.name + " exterior"}
            loading="lazy"
          />
        </Link>
        <button
          className={"save-hotel " + (saved ? "saved" : "")}
          aria-label={(saved ? "Unsave " : "Save ") + hotel.name}
          aria-pressed={saved}
          onClick={() => {
            setState((s) => ({
              ...s,
              favorites: saved
                ? s.favorites.filter((x) => x !== hotel.id)
                : [...s.favorites, hotel.id],
            }));
            notify(
              saved
                ? "Hotel removed from saved stays."
                : "Hotel saved for later.",
            );
          }}
        >
          <Heart size={20} fill={saved ? "currentColor" : "none"} />
        </button>
        <span className="photo-tag">BEST WESTERN PLUS</span>
      </div>
      <div className="hotel-copy">
        <p className="location">
          <MapPin size={15} />
          {hotel.area} · Visakhapatnam
        </p>
        <h3>
          <Link to={"/hotels/" + hotel.id}>
            {hotel.name.replace("Best Western Plus ", "")}
          </Link>
        </h3>
        <p>{hotel.intro}</p>
        <div className="amenities">
          <span>
            <Wifi size={16} />
            Wi-Fi
          </span>
          <span>
            <Utensils size={16} />
            {hotel.id === "ramachandra" ? "Breakfast" : "Dining"}
          </span>
          <span>
            <Dumbbell size={16} />
            Fitness
          </span>
        </div>
        <div className="hotel-bottom">
          <div>
            <small>Demo rate / night</small>
            <strong>{money(hotel.price)}</strong>
          </div>
          <Go to={"/hotels/" + hotel.id} className="button outline">
            Explore stay <ArrowUpRight size={18} />
          </Go>
        </div>
      </div>
    </LinearCard>
  );
}
export function HotelSearch() {
  const [filter, setFilter] = useState<string[]>([]);
  const [sort, setSort] = useState("Recommended");
  const [max, setMax] = useState(7000);
  const [map, setMap] = useState(false);
  let list = hotels.filter(
    (h) => h.price <= max && filter.every((f) => h.amenities.includes(f)),
  );
  if (sort === "Price: low to high")
    list = [...list].sort((a, b) => a.price - b.price);
  return (
    <>
      <section className="search-top">
        
      <Search compact />
      </section>
      <main className="container">
        <div className="page-heading">
          <div>
            <p>Andhra Pradesh, India</p>
            <h1>
              Your Vizag stay
              <br />
              starts here.
            </h1>
          </div>
          <p>
            Two welcoming hotels.
            <br />
            One unforgettable coastal city.
          </p>
        </div>
        <div className="results-toolbar">
          <span>{list.length} hotels in Visakhapatnam</span>
          <div>
            <button className="text-button" onClick={() => setMap(!map)}>
              {map ? "List view" : "Location view"} <MapPin size={16} />
            </button>
            <label className="inline-label">
              Sort{" "}
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option>Recommended</option>
                <option>Price: low to high</option>
              </select>
            </label>
          </div>
        </div>
        <div className="results-layout">
          <LinearCard as="aside" className="filters">
            <h2>Make it your stay.</h2>
            <Field label={"Maximum nightly rate: " + money(max)}>
              <input
                type="range"
                min="4000"
                max="7000"
                step="100"
                value={max}
                onChange={(e) => setMax(+e.target.value)}
              />
            </Field>
            <h3>Amenities</h3>
            {[
              "Wi-Fi",
              "Breakfast",
              "Restaurant",
              "Fitness center",
              "Spa",
              "Meeting spaces",
            ].map((a) => (
              <label className="check" key={a}>
                <input
                  type="checkbox"
                  checked={filter.includes(a)}
                  onChange={() =>
                    setFilter(
                      filter.includes(a)
                        ? filter.filter((f) => f !== a)
                        : [...filter, a],
                    )
                  }
                />
                {a}
              </label>
            ))}
            <button
              className="text-button"
              onClick={() => {
                setFilter([]);
                setMax(7000);
              }}
            >
              Reset filters
            </button>
            <p className="muted">
              Rates and room availability are illustrative. Final demo totals
              include a clearly shown simulated tax.
            </p>
          </LinearCard>
          <div className="results">
            {map && (
              <LinearCard as="div" className="location-panel">
                <MapPin size={36} />
                <h2>Find your neighborhood.</h2>
                <p>Open each hotel in Google Maps for its exact location.</p>
                {hotels.map((h) => (
                  <Go
                    key={h.id}
                    to={
                      "https://www.google.com/maps/search/?api=1&query=" +
                      encodeURIComponent(h.name + " Visakhapatnam")
                    }
                    className="button outline"
                  >
                    {h.area}
                    <ArrowUpRight size={18} />
                  </Go>
                ))}
              </LinearCard>
            )}
            {list.map((h) => (
              <HotelCard key={h.id} hotel={h} />
            ))}
            {!list.length && (
              <Empty
                title="A different filter might do it."
                text="Try increasing your budget or removing an amenity."
              />
            )}
          </div>
        </div>
      </main>
      <FurtherAfield />
    </>
  );
}
export function HotelDetail() {
  const { id } = useParams();
  const h = hotels.find((x) => x.id === id);
  const [gallery, setGallery] = useState(false);
  if (!h)
    return (
      <Empty
        title="Hotel not found"
        text="Explore our Visakhapatnam collection."
        to="/hotels"
        action="View hotels"
      />
    );
  return (
    <main>
      <div className="container">
        <p className="breadcrumbs">
          <Link to="/hotels">Visakhapatnam hotels</Link> / {h.name}
        </p>
        <div className="page-heading">
          <div>
            <p>{h.area} · Visakhapatnam</p>
            <h1>{h.name.replace("Best Western Plus ", "")}</h1>
            <p>Best Western Plus</p>
          </div>
          <Go to={"/hotels/" + h.id + "/rooms"}>
            Choose your room <ArrowRight size={20} />
          </Go>
        </div>
        <div className="property-hero">
          <img src={h.image} alt={h.name + " exterior"} />
          <div>
            <MapPin size={32} />
            <h2>{h.intro}</h2>
            <p>{h.address}</p>
            <button className="button light" onClick={() => setGallery(true)}>
              View photo <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
        <SectionNav label="Hotel sections" items={["Overview","Amenities","Location","Policies","Rooms"].map(label=>({id:label.toLowerCase(),label}))} />
        <div className="detail-layout">
          <div>
            <section id="overview">
              <h2>A good place to come back to.</h2>
              <p>{h.description}</p>
              <p>
                {h.id === "tejvivaan"
                  ? "Set out for the coastline, the city’s museums or a day trip into the Eastern Ghats. Return to a convenient city-center base."
                  : "Settle into Gajuwaka, with the city’s industrial and business districts nearby and the wider coastline waiting to be explored."}
              </p>
            </section>
            <section className="property-room-preview">
              <h2>Picture yourself here.</h2>
              <p>Take a closer look at the rooms at {h.name}.</p>
              <div className="property-room-grid">
                <RoomPhoto hotel={h.id} index={0} />
                <RoomPhoto hotel={h.id} index={1} />
              </div>
            </section>
            <section id="amenities">
              <h2>Make yourself at home.</h2>
              <div className="feature-grid">
                {h.amenities.map((a) => (
                  <span key={a}>
                    <Check size={18} />
                    {a}
                  </span>
                ))}
              </div>
            </section>
            <section id="location">
              <h2>A city worth exploring.</h2>
              <p>{h.address}</p>
              <Go
                to={
                  "https://www.google.com/maps/search/?api=1&query=" +
                  encodeURIComponent(h.name + " Visakhapatnam")
                }
                className="text-link"
              >
                Open map
              </Go>
              <h3>Nearby inspiration</h3>
              <ul>
                {h.nearby.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </section>
            <section id="policies">
              <h2>Know before you go.</h2>
              <p>
                {h.id === "ramachandra"
                  ? "Official listing: check-in and check-out at 12 noon. No pets. No swimming pool."
                  : "Confirm current check-in, check-out and accessibility arrangements directly with the hotel."}
              </p>
              <p>
                Room names, prices and cancellation conditions in this demo are
                illustrative. Read the official property listing before a real
                stay.
              </p>
              <Go to={h.source} className="text-link">
                Official hotel details
              </Go>
            </section>
          </div>
          <LinearCard as="aside" className="booking-box" id="rooms">
            <p>Your next chapter</p>
            <h2>
              {money(h.price)}
              <small> / night</small>
            </h2>
            <p>Illustrative rate, before simulated tax.</p>
            <Go to={"/hotels/" + h.id + "/rooms"}>
              See rooms <ArrowRight size={18} />
            </Go>
            <p>
              <Check size={15} /> Clear prices. No real payment.
            </p>
          </LinearCard>
        </div>
      </div>
      {gallery && (
        <Modal title={h.name} onClose={() => setGallery(false)}>
          <img
            className="gallery-image"
            src={h.image}
            alt={h.name + " exterior"}
          />
          <p>Property exterior · reference photograph</p>
        </Modal>
      )}
    </main>
  );
}
export function Rooms() {
  const { id } = useParams();
  const h = hotels.find((x) => x.id === id);
  const { state } = useStore();
  const [bed, setBed] = useState("All rooms");
  const [flex, setFlex] = useState(true);
  if (!h)
    return (
      <Empty
        title="Hotel not found"
        text="Choose a Visakhapatnam hotel."
        to="/hotels"
        action="Find hotels"
      />
    );
  return (
    <main className="container">
      <p className="breadcrumbs">
        <Link to={"/hotels/" + id}>{h.name}</Link> / Choose a room
      </p>
      <div className="page-heading">
        <div>
          <p>01 / Choose your room</p>
          <h1>Stay your way.</h1>
        </div>
        <p>
          {state.trip.checkin} → {state.trip.checkout}
          <br />
          {nights(state.trip.checkin, state.trip.checkout)} nights ·{" "}
          {state.trip.rooms} room(s) · {state.trip.adults} adults per room
        </p>
      </div>
      <BookingSteps hotel={h.id} step={1}/>
      <Search compact />
      <div className="results-toolbar">
        <label>
          Bed type{" "}
          <select value={bed} onChange={(e) => setBed(e.target.value)}>
            <option>All rooms</option>
            <option>King</option>
            <option>Twin</option>
          </select>
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={flex}
            onChange={(e) => setFlex(e.target.checked)}
          />
          Flexible demo rate
        </label>
      </div>
      <p className="notice">
        Room types, rates and availability below are sample data for this local
        demo.
      </p>
      {["King", "Twin", "Suite"]
        .filter((x) => bed === "All rooms" || x === bed)
        .map((room, i) => {
          const price =
            h.price +
            (room === "Suite" ? 2000 : room === "Twin" ? 300 : 0) +
            (flex ? 400 : 0);
          return (
            <LinearCard as="article" className="room-row" key={room}>
              <RoomPhoto
                hotel={h.id}
                index={room === "King" ? 0 : room === "Twin" ? 1 : 2}
              />
              <div>
                <h2>
                  {room === "Suite" ? "A little more room" : room + " room"}
                </h2>
                <p>
                  {room === "Twin" ? "Two single beds" : "One king bed"} · Up to{" "}
                  {room === "Suite" ? 3 : 2} adults per room
                </p>
                <p>Wi-Fi · Workspace · Non-smoking</p>
                <details>
                  <summary>Rate & cancellation details</summary>
                  <p>
                    {flex
                      ? "Demo flexible rate: cancel locally before the check-in date for a full simulated refund."
                      : "Demo advance rate: non-refundable. No actual payment is taken."}{" "}
                    Availability is illustrative.
                  </p>
                </details>
              </div>
              <div className="room-price">
                <strong>
                  {state.trip.rate === "Rewards Points"
                    ? "12,000 points"
                    : money(price)}
                </strong>
                <small>per room / night</small>
                <Go
                  to={"/checkout/" + h.id + "?room=" + room + "&flex=" + flex}
                >
                  Select room <ArrowRight size={18} />
                </Go>
              </div>
            </LinearCard>
          );
        })}
    </main>
  );
}
export function Checkout() {
  const { id } = useParams();
  const h = hotels.find((x) => x.id === id);
  const { state, setState, notify } = useStore();
  const nav = useNavigate();
  const q = new URLSearchParams(location.search);
  const room = ["King", "Twin", "Suite"].includes(q.get("room") || "")
    ? q.get("room")!
    : "King";
  const flex = q.get("flex") !== "false";
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (!h)
    return (
      <Empty
        title="Choose a hotel first"
        text="Your stay starts in Visakhapatnam."
        to="/hotels"
        action="Find a stay"
      />
    );
  const trip = state.trip;
  const count = nights(trip.checkin, trip.checkout);
  const quote = quoteStay(
    h.price,
    room,
    flex,
    Math.max(1, count),
    trip.rooms,
    trip.rate === "Rewards Points",
  );
  const base = quote.subtotal;
  const points = quote.points;
  return (
    <main className="container">
      <p className="breadcrumbs">
        <Link to={"/hotels/" + id + "/rooms"}>Room selection</Link> / Guest
        details
      </p>
      <div className="page-heading">
        <div>
          <p>02 / Make it yours</p>
          <h1>
            You’re almost
            <br />
            on your way.
          </h1>
        </div>
      </div>
      <BookingSteps hotel={h.id} step={2}/>
      <div className="checkout-layout">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!roomFits(room, trip.adults, trip.children)) {
              setError(
                "This room cannot accommodate your party. Select up to 2 adults (3 for a suite) and 2 children per room.",
              );
              return;
            }
            if (count < 1 || trip.checkin < today()) {
              setError("Please choose valid future stay dates.");
              return;
            }
            if (points > state.points) {
              setError(
                "You do not have enough demo points. Choose Best Rate in your search.",
              );
              return;
            }
            if (points && !state.signedIn) {
              setError(
                "Sign in to the demo account before booking with points.",
              );
              return;
            }
            setBusy(true);
            const f = new FormData(e.currentTarget);
            const booking: Booking = {
              id: "BW-" + crypto.randomUUID().slice(0, 8).toUpperCase(),
              hotel: h.id,
              room: room + (flex ? " · Flexible" : " · Advance"),
              ...trip,
              total: points ? 0 : Math.round(base * 1.12),
              points,
              status: "Upcoming",
              guest: f.get("first") + " " + f.get("last"),
            };
            setState((s) => ({
              ...s,
              bookings: [booking, ...s.bookings],
              points: s.points - points,
              activity: points
                ? [
                    {
                      label: "Room redemption · " + h.name,
                      amount: -points,
                      date: today(),
                    },
                    ...s.activity,
                  ]
                : s.activity,
            }));
            notify("Your demo reservation is confirmed.");
            nav("/confirmation/" + booking.id);
          }}
        >
          <LinearCard as="div" className="form-section">
            <h2>Who’s checking in?</h2>
            <div className="form-grid">
              <Field label="First name">
                <input
                  name="first"
                  autoComplete="given-name"
                  required
                  defaultValue={state.signedIn ? state.profile.first : ""}
                />
              </Field>
              <Field label="Last name">
                <input
                  name="last"
                  autoComplete="family-name"
                  required
                  defaultValue={state.signedIn ? state.profile.last : ""}
                />
              </Field>
              <Field label="Email">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue={state.signedIn ? state.profile.email : ""}
                />
              </Field>
              <Field label="Phone">
                <input name="phone" type="tel" autoComplete="tel" required />
              </Field>
            </div>
            <Field label="Special requests (optional)">
              <textarea
                name="requests"
                placeholder="Anything you’d like us to know?"
              />
            </Field>
            <p>
              Requests are not guaranteed. This demo does not send requests to
              the hotel.
            </p>
          </LinearCard>
          <LinearCard as="div" className="form-section">
            <h2>A practice trip. A real preview.</h2>
            <p>
              No card details needed. No payment is taken and no hotel
              reservation is submitted.
            </p>
            <label className="check">
              <input type="checkbox" required />I understand this is a local
              demo and accept the displayed room conditions.
            </label>
          </LinearCard>
          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}
          <button className="button" disabled={busy}>
            {busy ? "Confirming…" : "Confirm demo reservation"}
            <ArrowRight size={20} />
          </button>
        </form>
        <LinearCard as="aside" className="booking-box">
          <h2>Your stay</h2>
          <h3>{h.name}</h3>
          <p>
            {room} room · {flex ? "Flexible" : "Advance"}
          </p>
          <hr />
          <p>
            {trip.checkin} → {trip.checkout}
          </p>
          <p>
            {count} nights · {trip.rooms} room(s)
          </p>
          <p>
            {trip.adults} adults + {trip.children} children per room
          </p>
          <hr />
          {points ? (
            <h2>{points.toLocaleString()} points</h2>
          ) : (
            <>
              <p className="split">
                Room subtotal <strong>{money(base)}</strong>
              </p>
              <p className="split">
                Simulated tax (12%){" "}
                <strong>{money(Math.round(base * 0.12))}</strong>
              </p>
              <p className="split total">
                Demo total <strong>{money(Math.round(base * 1.12))}</strong>
              </p>
            </>
          )}
          <small>Illustrative pricing only. No charge.</small>
        </LinearCard>
      </div>
    </main>
  );
}
export function Confirmation() {
  const { id } = useParams();
  const { state } = useStore();
  const b = state.bookings.find((x) => x.id === id);
  if (!b)
    return (
      <Empty
        title="Reservation not found"
        text="Check your local demo reservations."
        to="/reservations"
        action="Find a reservation"
      />
    );
  return (
    <main className="container confirmation">
      <div className="confirmation-icon">
        <Check size={40} />
      </div>
      <p>
        {b.status === "Cancelled"
          ? "Reservation cancelled"
          : "03 / You’re all set"}
      </p>
      <h1>
        See you in Vizag.
        <br />
        <span className="outline-text">In your next adventure.</span>
      </h1>
      <p>
        Your local demo reservation is{" "}
        {b.status === "Cancelled" ? "cancelled" : "confirmed"}.<br />
        No hotel booking or payment has been made.
      </p>
      <LinearCard as="div" className="confirmation-ticket">
        <h2>{hotels.find((h) => h.id === b.hotel)?.name}</h2>
        <p>
          {b.guest} · {b.checkin} → {b.checkout}
        </p>
        <p>
          {b.room} · {b.rooms} room(s)
        </p>
        <strong>{b.id}</strong>
        <p>{b.points ? b.points + " points" : money(b.total)} · Demo total</p>
      </LinearCard>
      <div className="actions">
        <Go to="/account/reservations">
          Manage your stay <ArrowRight size={18} />
        </Go>
        <button className="button outline" onClick={() => window.print()}>
          Print confirmation
        </button>
      </div>
    </main>
  );
}



