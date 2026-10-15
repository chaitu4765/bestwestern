import LinearCard from "@/components/ui/linear-card";
import { GlowingProfileCard } from "@/components/ui/award-badge";
import {SectionNav} from "./JourneyMotion";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Check,
  Wallet,
  Plane,
  Gift,
  LogOut,
  Heart,
  UserRound,
} from "lucide-react";
import { useStore, initial, type Profile, type Booking } from "./store";
import { accountLinks, hotels, money, today, rateOptions } from "./data";
import { Go, Field, Modal, Empty } from "./ui";
import { HotelCard } from "./Booking";
import { refundablePoints } from "./domain";
export function Auth({
  join = false,
  recover = false,
}: {
  join?: boolean;
  recover?: boolean;
}) {
  const { setState, notify } = useStore();
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <main className="auth-layout">
      <div className="auth-story">
        <UserRound size={48} />
        <h1>
          {join
            ? "Good things start with a welcome."
            : recover
              ? "Let’s get you back in."
              : "Welcome to your next chapter."}
        </h1>
        <p>Your stays. Your rewards. Your kind of travel.</p>
        <div className="membership-art">
          <span>BEST WESTERN</span>
          <strong>Rewards.</strong>
          <span>ROOM FOR MORE.</span>
        </div>
      </div>
      <div className="auth-form">
        <p>Local demo account</p>
        <h2>
          {join
            ? "Become a member."
            : recover
              ? "Account access."
              : "Good to see you."}
        </h2>
        {done ? (
          <div role="status">
            <h3>Your demo reset is ready.</h3>
            <p>
              No email is sent. Use “Enter demo account” to continue with your
              local profile.
            </p>
            <Go to="/login">Return to sign in</Go>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (recover) {
                setDone(true);
                return;
              }
              const f = new FormData(e.currentTarget);
              setState((s) => ({
                ...s,
                signedIn: true,
                profile: join
                  ? {
                      ...s.profile,
                      first: String(f.get("first")),
                      last: String(f.get("last")),
                      email: String(f.get("email")),
                    }
                  : s.profile,
              }));
              notify(
                join
                  ? "Your demo membership is ready."
                  : "Welcome to your demo account.",
              );
              nav("/account");
            }}
          >
            {join && (
              <div className="form-grid">
                <Field label="First name">
                  <input name="first" required autoComplete="given-name" />
                </Field>
                <Field label="Last name">
                  <input name="last" required autoComplete="family-name" />
                </Field>
              </div>
            )}
            <Field label="Email address">
              <input
                type="email"
                name="email"
                required
                defaultValue={join ? "" : "alex@example.com"}
                autoComplete="email"
              />
            </Field>
            {!recover && (
              <>
                <Field label="Demo password">
                  <input
                    type={show ? "text" : "password"}
                    required
                    minLength={10}
                    placeholder="Use any 10+ character demo password"
                    autoComplete="off"
                  />
                </Field>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={show}
                    onChange={(e) => setShow(e.target.checked)}
                  />
                  Show password
                </label>
              </>
            )}
            {join && (
              <>
                <Field label="Country">
                  <select>
                    <option>India</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Other</option>
                  </select>
                </Field>
                <label className="check">
                  <input required type="checkbox" />I accept the{" "}
                  <Link to="/terms">demo terms</Link>.
                </label>
              </>
            )}
            <p className="muted">
              Use invented information. This is a local session, not
              authentication to Best Western. Passwords are never saved.
            </p>
            <button className="button">
              {recover
                ? "Reset demo access"
                : join
                  ? "Create demo membership"
                  : "Enter demo account"}
              <ArrowRight size={18} />
            </button>
            {!join && !recover && (
              <div className="auth-links">
                <Link to="/forgot-password">Forgot password?</Link>
                <Link to="/join">Join Rewards</Link>
              </div>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
export function Account() {
  const { state, setState, notify } = useStore();
  const path = useLocation().pathname.split("/")[2] || "";
  const nav = useNavigate();
  if (!state.signedIn)
    return (
      <main className="container">
        <Empty
          title="Your travels, all together."
          text="Sign in to the local demo account to manage your stays, points and preferences."
          to="/login"
          action="Enter demo account"
        />
        <p className="center">
          Already made a demo booking?{" "}
          <Link to="/reservations">Look it up here.</Link>
        </p>
      </main>
    );
  return (
    <main className="container account-layout">
      <div className="account-profile-spotlight">
        <GlowingProfileCard first={state.profile.first} last={state.profile.last} />
      </div>
      <aside className="account-nav">
        <p>YOUR ACCOUNT</p>
        <nav aria-label="Account navigation">
          {accountLinks.map(([url, label]) => (
            <NavLink key={url} end to={"/account" + (url ? "/" + url : "")}>
              {label}
              <ArrowUpRight size={15} />
            </NavLink>
          ))}
        </nav>
        <button
          className="text-button"
          onClick={() => {
            setState((s) => ({ ...s, signedIn: false }));
            nav("/");
            notify("You’re signed out of the demo.");
          }}
        >
          <LogOut size={16} />
          Sign out
        </button>
      </aside>
      <div className="account-content">
        {path === "" ? (
          <Overview />
        ) : path === "profile" ? (
          <ProfilePage />
        ) : path === "wallet" ? (
          <WalletPage />
        ) : path === "reservations" ? (
          <Reservations />
        ) : path === "favorites" ? (
          <>
            <h1>Worth coming back to.</h1>
            <p>Your saved Tejvivaan stay.</p>
            {hotels
              .filter((h) => h.id === 'tejvivaan' && state.favorites.includes(h.id))
              .map((h) => (
                <HotelCard key={h.id} hotel={h} />
              ))}
            {!state.favorites.includes('tejvivaan') && (
              <Empty
                title="Keep a little inspiration."
                text="Tap the heart on a hotel to save it here."
                to="/hotels"
                action="Explore stays"
              />
            )}
          </>
        ) : path === "activity" ? (
          <>
            <h1>Your Rewards activity.</h1>
            <p>Local demo transactions appear here as you use points.</p>
            {state.activity.length ? (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Activity</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.activity.map((a, i) => (
                      <tr key={i}>
                        <td>{a.date}</td>
                        <td>{a.label}</td>
                        <td>
                          {a.amount > 0 ? "+" : ""}
                          {a.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Empty
                title="A fresh page."
                text="Your local points transactions will appear here."
                to="/rewards/redeem"
                action="Explore rewards"
              />
            )}
            <Go to="/support/missing-points" className="text-link">
              Missing points?
            </Go>
          </>
        ) : path === "messages" ? (
          <>
            <h1>Your message center.</h1>
            {state.requests.length ? (
              state.requests.map((r, i) => (
                <LinearCard as="article" className="list-item" key={i}>
                  <h3>{r.type}</h3>
                  <p>{r.date} · Saved locally</p>
                  <p>{r.details}</p>
                </LinearCard>
              ))
            ) : (
              <Empty
                title="You’re all caught up."
                text="Local enquiries and reward confirmations appear here."
              />
            )}
          </>
        ) : path === "offers" ? (
          <>
            <h1>A little more for you.</h1>
            <p>
              Explore member rates and ways to make the most of your membership.
              Live promotions are not connected.
            </p>
            <LinearCard as="div" className="blue-panel">
              <Gift size={36} />
              <h2>Your next stay is calling.</h2>
              <p>Compare the demo room rates in Visakhapatnam.</p>
              <Go to="/hotels" className="button light">
                Find a stay <ArrowRight size={18} />
              </Go>
            </LinearCard>
            <Go to="/offers" className="text-link">
              All offers
            </Go>
          </>
        ) : (
          <Empty
            title="Page not found"
            text="Choose an account page from the menu."
          />
        )}
      </div>
    </main>
  );
}
function Overview() {
  const { state } = useStore();
  return (
    <>
      <div className="account-heading">
        <p>Here’s to what’s next.</p>
        <h1>
          Make room
          <br />
          for more.
        </h1>
      </div>
      <div className="rewards-summary">
        <LinearCard className="reward-stat reward-stat-points" title="Your Rewards points">
          <span>YOUR POINTS</span>
          <strong>{state.points.toLocaleString()}</strong>
          <Go to="/rewards/redeem" className="text-link">
            Find your next reward <ArrowUpRight size={18} />
          </Go>
        </LinearCard>
        <LinearCard className="reward-stat" title="Your next milestone">
          <span>YOUR NEXT MILESTONE</span>
          <h2>Hello, Gold.</h2>
          <div className="progress">
            <span />
          </div>
          <p>0 of 5 qualifying nights · Demo progress</p>
          <Go to="/rewards/tiers" className="text-link">
            Explore member benefits <ArrowUpRight size={18} />
          </Go>
        </LinearCard>
      </div>
      <div className="account-shortcuts">
        {[
          [Plane, "My trips", "/account/reservations"],
          [Wallet, "Travel wallet", "/account/wallet"],
          [Heart, "Saved stays", "/account/favorites"],
        ].map(([Icon, label, url]) => {
          const I = Icon as typeof Plane;
          return (
            <LinearCard className="shortcut-card" title={String(label)} key={String(label)}><Go to={String(url)} className="shortcut">
              <I size={26} />
              <span>{String(label)}</span>
              <ArrowUpRight size={20} />
            </Go></LinearCard>
          );
        })}
      </div>
      <div className="section-title">
        <h2>On the horizon.</h2>
        <Go to="/account/reservations" className="text-link">
          All reservations <ArrowRight size={16} />
        </Go>
      </div>
      {state.bookings
        .filter((b) => b.status === "Upcoming")
        .slice(0, 1)
        .map((b) => (
          <ReservationRow key={b.id} booking={b} />
        ))}
      {!state.bookings.some((b) => b.status === "Upcoming") && (
        <Empty
          title="Your next adventure is unwritten."
          text="A city of sea breezes, hilltop views and warm welcomes is waiting."
          to="/hotels"
          action="Explore Visakhapatnam"
        />
      )}
    </>
  );
}
function ReservationRow({ booking: b }: { booking: Booking }) {
  const { setState, notify } = useStore();
  const [cancel, setCancel] = useState(false);
  const [modify, setModify] = useState(false);
  const h = hotels.find((h) => h.id === b.hotel)!;
  return (
    <LinearCard as="article" className="reservation">
      <div>
        <span>
          {b.status} · {b.id}
        </span>
        <h3>{h.name}</h3>
        <p>
          {b.checkin} → {b.checkout} · {b.rooms} room(s)
        </p>
        <p>
          {b.room} ·{" "}
          {b.points ? b.points.toLocaleString() + " points" : money(b.total)}
        </p>
      </div>
      <div className="actions">
        <Go className="button outline" to={"/confirmation/" + b.id}>
          Details
        </Go>
        {b.status === "Upcoming" && b.checkin >= today() && (
          <>
            <button className="text-button" onClick={() => setModify(true)}>
              Modify
            </button>
            <button className="text-button" onClick={() => setCancel(true)}>
              Cancel stay
            </button>
          </>
        )}
      </div>
      {cancel && (
        <Modal title="Cancel this demo stay?" onClose={() => setCancel(false)}>
          <p>
            {b.room.includes("Advance")
              ? "This is an advance demo rate. No refund would be due under the displayed demo conditions."
              : "Your demo stay will move to Cancelled. Any redeemed demo points will be returned."}
          </p>
          <p>No actual reservation or payment is affected.</p>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                setState((s) => ({
                  ...s,
                  bookings: s.bookings.map((x) =>
                    x.id === b.id ? { ...x, status: "Cancelled" } : x,
                  ),
                  points:
                    s.points +
                    refundablePoints(
                      b.room,
                      b.points,
                      s.bookings.find((x) => x.id === b.id)?.status ||
                        "Cancelled",
                    ),
                  activity:
                    b.points && !b.room.includes("Advance")
                      ? [
                          {
                            label: "Cancellation refund · " + b.id,
                            amount: b.points,
                            date: today(),
                          },
                          ...s.activity,
                        ]
                      : s.activity,
                }));
                setCancel(false);
                notify("Demo reservation cancelled.");
              }}
            >
              Confirm cancellation
            </button>
            <button className="button outline" onClick={() => setCancel(false)}>
              Keep stay
            </button>
          </div>
        </Modal>
      )}
      {modify && (
        <Modal title="Modify your stay" onClose={() => setModify(false)}>
          <p>
            For a different hotel, room or dates, cancel this demo stay and
            create a new one. Guest-name corrections can be saved here.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const guest = String(new FormData(e.currentTarget).get("guest"));
              setState((s) => ({
                ...s,
                bookings: s.bookings.map((x) =>
                  x.id === b.id ? { ...x, guest } : x,
                ),
              }));
              setModify(false);
              notify("Guest details updated.");
            }}
          >
            <Field label="Guest name">
              <input name="guest" defaultValue={b.guest} required />
            </Field>
            <button className="button">Save guest name</button>
          </form>
        </Modal>
      )}
    </LinearCard>
  );
}
export function Reservations({ lookup = false }: { lookup?: boolean }) {
  const { state } = useStore();
  const [tab, setTab] = useState("Upcoming");
  const [found, setFound] = useState<Booking | null | undefined>();
  let bookings = state.bookings.filter((b) =>
    tab === "Cancelled"
      ? b.status === "Cancelled"
      : b.status !== "Cancelled" &&
        (tab === "Past" ? b.checkout < today() : b.checkout >= today()),
  );
  return (
    <div className={lookup ? "container lookup" : ""}>
      <h1>{lookup ? "Find your reservation." : "Your next adventure."}</h1>
      {lookup ? (
        <>
          <p>Enter the details from your local demo confirmation.</p>
          <form
            className="lookup-form"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              setFound(
                state.bookings.find(
                  (b) =>
                    b.id.toLowerCase() ===
                      String(f.get("id")).trim().toLowerCase() &&
                    b.guest
                      .toLowerCase()
                      .includes(String(f.get("last")).trim().toLowerCase()),
                ) || null,
              );
            }}
          >
            <Field label="Last name">
              <input name="last" required />
            </Field>
            <Field label="Confirmation number">
              <input name="id" required placeholder="BW-XXXXXXXX" />
            </Field>
            <button className="button">
              Find reservation <ArrowRight size={18} />
            </button>
          </form>
          {found === null && (
            <p role="alert">
              No matching demo reservation was found in this browser.
            </p>
          )}
          {found && <ReservationRow booking={found} />}
          <Go to="/account/reservations" className="text-link">
            View account reservations
          </Go>
        </>
      ) : (
        <>
          <div className="tabs" role="group" aria-label="Reservation status">
            {["Upcoming", "Past", "Cancelled"].map((t) => (
              <button
                aria-pressed={tab === t}
                className={tab === t ? "active" : ""}
                key={t}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          {bookings.map((b) => (
            <ReservationRow key={b.id} booking={b} />
          ))}
          {!bookings.length && (
            <Empty
              title={
                tab === "Upcoming" ? "Where to next?" : "Nothing here just yet."
              }
              text={
                "Your " +
                tab.toLowerCase() +
                " demo reservations will appear here."
              }
              to="/hotels"
              action="Find your next stay"
            />
          )}
        </>
      )}
    </div>
  );
}
function ProfilePage() {
  const { state, setState, notify } = useStore();
  const [p, setP] = useState<Profile>(state.profile);
  const [address, setAddress] = useState<number | null>(null);
  const [password, setPassword] = useState(false);
  const [reset, setReset] = useState(false);
  const [error, setError] = useState("");
  const dirty = JSON.stringify(p) !== JSON.stringify(state.profile);
  function save(e: React.FormEvent) {
    e.preventDefault();
    setState((s) => ({ ...s, profile: { ...p, email: s.profile.email } }));
    notify("Your preferences are saved.");
  }
  return (
    <>
      <h1>A stay that feels like you.</h1>
      <p>Manage your local demo profile and travel preferences.</p>
      <SectionNav label="Profile sections" items={[{id:"personal",label:"Personal"},{id:"addresses",label:"Addresses"},{id:"travel",label:"Travel style"},{id:"communications",label:"Communications"},{id:"security",label:"Security"}]} />
      <form onSubmit={save}>
        <LinearCard as="section" className="form-section" id="personal">
          <h2>Personal details</h2>
          <div className="form-grid">
            <Field label="First name">
              <input readOnly value={p.first} />
            </Field>
            <Field label="Last name">
              <input readOnly value={p.last} />
            </Field>
          </div>
          <p className="muted">
            Name changes are handled through customer support on the original
            service.
          </p>
          <div className="form-grid">
            <Field label="Phone type">
              <select
                value={p.phoneType}
                onChange={(e) => setP({ ...p, phoneType: e.target.value })}
              >
                {["Home", "Business", "Mobile", "Fax", "Other"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </Field>
            <Field label="Phone number">
              <input
                type="tel"
                value={p.phone}
                onChange={(e) => setP({ ...p, phone: e.target.value })}
              />
            </Field>
          </div>
        </LinearCard>
        <LinearCard as="section" className="form-section" id="addresses">
          <div className="section-title">
            <h2>Your addresses</h2>
            <button
              type="button"
              className="text-button"
              onClick={() => setAddress(-1)}
            >
              <Plus size={16} />
              Add address
            </button>
          </div>
          {p.addresses.length ? (
            p.addresses.map((a, i) => (
              <LinearCard as="div" className="list-item" key={i}>
                <strong>
                  {a.type}
                  {a.primary ? " · Primary" : ""}
                </strong>
                <p>
                  {a.line}, {a.city} {a.postal}, {a.country}
                </p>
                <button
                  type="button"
                  className="text-button"
                  onClick={() => setAddress(i)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="text-button"
                  onClick={() =>
                    setP({
                      ...p,
                      addresses: p.addresses.filter((_, j) => j !== i),
                    })
                  }
                >
                  Remove
                </button>
              </LinearCard>
            ))
          ) : (
            <p>No addresses added yet.</p>
          )}
        </LinearCard>
        <LinearCard as="section" className="form-section" id="travel">
          <h2>Your travel style</h2>
          <div className="form-grid">
            <Field label="Earning preference">
              <select
                value={p.earning}
                onChange={(e) => setP({ ...p, earning: e.target.value })}
              >
                <option>Best Western Rewards points</option>
                <option>Airline / partner rewards</option>
              </select>
            </Field>
            <Field label="Travel purpose">
              <select
                value={p.purpose}
                onChange={(e) => setP({ ...p, purpose: e.target.value })}
              >
                <option>Leisure</option>
                <option>Business</option>
                <option>Both</option>
              </select>
            </Field>
            {p.earning === "Airline / partner rewards" && (
              <Field label="Partner & membership number">
                <input
                  value={p.partner}
                  onChange={(e) => setP({ ...p, partner: e.target.value })}
                />
              </Field>
            )}
            <Field label="Preferred rate program">
              <select
                value={p.rate}
                onChange={(e) => setP({ ...p, rate: e.target.value })}
              >
                {rateOptions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </Field>
          </div>
          <h3>What brings you away?</h3>
          <div className="interest-options">
            {[
              "Amusement parks",
              "Beaches",
              "Family",
              "Historical sites",
              "Motorcycle travel",
              "National parks",
              "Pets",
              "Shopping",
              "Sports",
            ].map((i) => (
              <label
                className={p.interests.includes(i) ? "selected" : ""}
                key={i}
              >
                <input
                  type="checkbox"
                  checked={p.interests.includes(i)}
                  onChange={() =>
                    setP({
                      ...p,
                      interests: p.interests.includes(i)
                        ? p.interests.filter((x) => x !== i)
                        : [...p.interests, i],
                    })
                  }
                />
                {i}
              </label>
            ))}
          </div>
        </LinearCard>
        <LinearCard as="section" className="form-section" id="communications">
          <h2>Keep in touch, your way.</h2>
          <label className="check">
            <input
              type="checkbox"
              checked={p.emailNews}
              onChange={(e) => setP({ ...p, emailNews: e.target.checked })}
            />
            Best Western news and offers by email
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={p.partnerNews}
              onChange={(e) => setP({ ...p, partnerNews: e.target.checked })}
            />
            Travel partner news and offers by email
          </label>
          <p className="muted">
            Saved locally. No marketing subscriptions are created.
          </p>
        </LinearCard>
        <div className={"save-bar " + (dirty ? "dirty" : "")}>
          <span>
            {dirty
              ? "You have unsaved changes."
              : "Your preferences are up to date."}
          </span>
          <button
            type="button"
            className="button outline"
            disabled={!dirty}
            onClick={() => setP(state.profile)}
          >
            Discard
          </button>
          <button className="button" disabled={!dirty}>
            Save preferences <Check size={18} />
          </button>
        </div>
      </form>
      <LinearCard as="section" className="form-section" id="security">
        <h2>Email & security</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const email = String(new FormData(e.currentTarget).get("email"));
            setState((s) => ({ ...s, profile: { ...s.profile, email } }));
            setP({ ...p, email });
            notify("Email updated locally.");
          }}
        >
          <Field label="Email address">
            <input
              type="email"
              name="email"
              required
              defaultValue={state.profile.email}
            />
          </Field>
          <button className="button outline">Save email</button>
        </form>
        <button className="text-button" onClick={() => setPassword(true)}>
          Change demo password
        </button>
      </LinearCard>
      <LinearCard as="section" className="form-section" id="demo-data">
        <h2>Demo data</h2>
        <p>
          Clear local reservations, profile, wallet and preferences to start
          fresh.
        </p>
        <button className="button outline" onClick={() => setReset(true)}>
          Reset this demo
        </button>
      </LinearCard>
      {address !== null && (
        <Modal
          title={address < 0 ? "Add an address" : "Edit address"}
          onClose={() => setAddress(null)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const a = {
                type: String(f.get("type")),
                line: String(f.get("line")),
                city: String(f.get("city")),
                postal: String(f.get("postal")),
                country: String(f.get("country")),
                primary: f.get("primary") === "on",
              };
              let addresses = p.addresses.map((x, i) =>
                i === address ? a : a.primary ? { ...x, primary: false } : x,
              );
              if (address === -1) addresses.push(a);
              setP({ ...p, addresses });
              setAddress(null);
              notify(
                "Address added to your draft. Save preferences to keep it.",
              );
            }}
          >
            <div className="form-grid">
              <Field label="Address type">
                <select name="type" defaultValue={p.addresses[address]?.type}>
                  {["Home", "Business", "Other"].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </Field>
              <Field label="Country">
                <input
                  name="country"
                  required
                  defaultValue={p.addresses[address]?.country || "India"}
                />
              </Field>
            </div>
            <Field label="Street address">
              <input
                name="line"
                required
                defaultValue={p.addresses[address]?.line}
              />
            </Field>
            <div className="form-grid">
              <Field label="City">
                <input
                  name="city"
                  required
                  defaultValue={p.addresses[address]?.city}
                />
              </Field>
              <Field label="Postal code">
                <input
                  name="postal"
                  required
                  defaultValue={p.addresses[address]?.postal}
                />
              </Field>
            </div>
            <label className="check">
              <input
                name="primary"
                type="checkbox"
                defaultChecked={p.addresses[address]?.primary}
              />
              Primary address
            </label>
            <button className="button">Use this address</button>
          </form>
        </Modal>
      )}
      {password && (
        <Modal title="Change demo password" onClose={() => setPassword(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const a = String(f.get("new"));
              if (
                !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{10,}$/.test(a) ||
                a !== f.get("confirm")
              ) {
                setError(
                  "Use 10+ characters with a letter, number and symbol. Both passwords must match.",
                );
                return;
              }
              setPassword(false);
              notify(
                "Password format accepted. No password is stored in this demo.",
              );
            }}
          >
            <Field label="New demo password">
              <input type="password" name="new" required autoComplete="off" />
            </Field>
            <Field label="Confirm password">
              <input
                type="password"
                name="confirm"
                required
                autoComplete="off"
              />
            </Field>
            {error && <p role="alert">{error}</p>}
            <p>No password is saved or sent.</p>
            <button className="button">Validate password</button>
          </form>
        </Modal>
      )}
      {reset && (
        <Modal title="Start fresh?" onClose={() => setReset(false)}>
          <p>This removes all demo data saved in this browser.</p>
          <button
            className="button"
            onClick={() => {
              setState(() => ({ ...initial }));
              notify("Your local demo has been reset.");
            }}
          >
            Clear demo data
          </button>
        </Modal>
      )}
    </>
  );
}
function WalletPage() {
  const { state, setState, notify } = useStore();
  const [tab, setTab] = useState("Current");
  const [sort, setSort] = useState("Recently added");
  const [add, setAdd] = useState(false);
  const [type, setType] = useState("Gift card");
  const [error, setError] = useState("");
  let items = state.wallet.filter((w) => w.status === tab);
  if (sort === "Amount") items = [...items].sort((a, b) => b.amount - a.amount);
  if (sort === "Type")
    items = [...items].sort((a, b) => a.type.localeCompare(b.type));
  return (
    <>
      <div className="section-title">
        <h1>A little getaway fund.</h1>
        <button className="button" onClick={() => setAdd(true)}>
          <Plus size={18} />
          Add to wallet
        </button>
      </div>
      <p>Gift cards and travel awards, all in one place.</p>
      <div className="results-toolbar">
        <div className="tabs">
          {["Current", "Expired", "Used"].map((t) => (
            <button
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <select
          aria-label="Sort wallet"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option>Recently added</option>
          <option>Amount</option>
          <option>Type</option>
        </select>
      </div>
      {items.length ? (
        items.map((w) => (
          <LinearCard as="div" className="wallet-card" key={w.id}>
            <Wallet size={30} />
            <div>
              <h2>{w.type}</h2>
              <p>DEMO · ending {w.id.slice(-4)}</p>
            </div>
            <strong>{money(w.amount)}</strong>
          </LinearCard>
        ))
      ) : (
        <Empty
          title="Your wallet is traveling light."
          text={
            "No " +
            tab.toLowerCase() +
            " gift cards or awards. Add a demo card to try it out."
          }
        />
      )}
      <Go to="/gift-cards" className="text-link">
        Explore gift cards
      </Go>
      {add && (
        <Modal title="Add to your travel wallet" onClose={() => setAdd(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const number = String(f.get("number"));
              if (state.wallet.some((w) => w.id === number)) {
                setError("This demo card is already in your wallet.");
                return;
              }
              setState((s) => ({
                ...s,
                wallet: [
                  { id: number, type, amount: 1000, status: "Current" },
                  ...s.wallet,
                ],
              }));
              setAdd(false);
              notify("Demo card added with an illustrative ₹1,000 balance.");
            }}
          >
            <Field label="Card type">
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option>Gift card</option>
                <option>Travel award</option>
              </select>
            </Field>
            <Field label={type + " number"}>
              <input
                name="number"
                required
                pattern="[0-9]{6,20}"
                placeholder="Use 6–20 invented digits"
              />
            </Field>
            {type === "Travel award" && (
              <Field label="Sequence number">
                <input required inputMode="numeric" />
              </Field>
            )}
            <Field label="PIN">
              <input
                type="password"
                required
                minLength={4}
                autoComplete="off"
              />
            </Field>
            <p>
              Use invented numbers only. PINs are discarded. Demo cards cannot
              be used for real stays.
            </p>
            {error && <p role="alert">{error}</p>}
            <button className="button">Add demo card</button>
          </form>
        </Modal>
      )}
    </>
  );
}

