import LinearCard from "@/components/ui/linear-card";
import BeamWordmarkFooter from "./components/ui/beam-wordmark-footer";
import SkewCards from "@/components/ui/gradient-card-showcase";
import NavbarMenu from "@/components/ui/navbar-menu";
import {FurtherAfield,FurtherHotel} from "./FurtherAfield";
import {HomeHero} from "./HomeHero";
import {JourneyMotion} from "./JourneyMotion";
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Menu,
  X,
  UserRound,
  Globe,
  ArrowDown,
  Check,
  Compass,
  Gift,
  Plus,
  Minus,
} from "lucide-react";
import { Provider, useStore } from "./store";
import { hotels, coast, pages, brands, slug, today, type Page } from "./data";
import { Go, Field, Modal, Empty } from "./ui";
import {
  Search,
  HotelCard,
  HotelSearch,
  HotelDetail,
  Rooms,
  Checkout,
  Confirmation,
} from "./Booking";
import { Account, Auth, Reservations } from "./Account";
import { DynamicHero, ScrollMotion } from "./DynamicHero";
hotels[1].image =
  "https://www.bestwestern.se/images/c127fee3-49f6-46e5-93ef-5bcaf88a23b0__bwimages__large__21834672.webp";
function Header() {
  const { state } = useStore();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);
  return (
    <>
      <div className="utility">
        <span>A fresh perspective on a familiar welcome.</span>
        <div>
          <span>Local demo</span>
          <span>
            <Globe size={12} /> English · INR
          </span>
        </div>
      </div>
      <header className="site-header" onKeyDown={event => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          event.currentTarget.querySelector<HTMLButtonElement>(".mobile-menu")?.focus();
        }
      }}>
        <Link to="/" className="wordmark" aria-label="Best Western home">
          <span className="brand-mark">BW</span>
          <span>
            Best
            <br />
            Western<sup>®</sup>
          </span>
        </Link>
        <NavbarMenu open={open} onNavigate={() => setOpen(false)} />
        <div className="header-actions">
          <Link className="reservation-link" to="/reservations">
            Check reservations
          </Link>
          <Link
            className="account-button"
            to={state.signedIn ? "/account" : "/login"}
          >
            <UserRound size={18} />
            <span>{state.signedIn ? state.profile.first : "Sign in"}</span>
          </Link>
          <button
            className="icon-button mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
function Footer() {
  const { setState } = useStore();
  const navigate = useNavigate();
  const groups = [
          [
            "Discover",
            ["Offers & discounts", "/offers"],
            ["Visakhapatnam", "/destinations/visakhapatnam"],
            ["Group reservations", "/groups"],
            ["Low Rate Guarantee", "/low-rate-guarantee"],
            ["Gift cards", "/gift-cards"],
            ["Travel professionals", "/travel-professionals"],
            ["Affiliate program", "/affiliate"],
          ],
          [
            "Rewards",
            ["Join Rewards", "/join"],
            ["Earn points", "/rewards/earn"],
            ["Redeem points", "/rewards/redeem"],
            ["Credit cards", "/rewards/credit-card"],
            ["Business Advantage", "/business"],
            ["Status match", "/rewards/status-match"],
          ],
          [
            "About",
            ["Our brands", "/brands"],
            ["About BWH Hotels", "/about"],
            ["Press & media", "/press"],
            ["Careers", "https://jobs.bestwestern.com"],
            ["Hotel development", "https://development.bwhhotels.com"],
            ["Earth, People, Community", "https://www.bwhhotelgroup.com"],
          ],
          [
            "Here to help",
            ["Customer service", "/support"],
            ["FAQs", "/support/faq"],
            ["Contact us", "/support/contacts"],
            ["Best Western To Go", "/app"],
            ["My account", "/account"],
          ],
        ];
  const columns = groups.map(([title, ...links]) => ({title: String(title), links: (links as string[][]).map(([label, href]) => ({label, href}))}));
  columns.push({title: 'Your choices', links: [
    {label: 'Find a stay', href: '/hotels'},
    {label: 'Privacy', href: '/privacy'},
    {label: 'Terms', href: '/terms'},
    {label: 'Accessibility', href: '/accessibility'},
    {label: 'Privacy settings', href: '#privacy-settings'},
  ]});
  return <BeamWordmarkFooter brand="Best Western" company="Best Western · Visakhapatnam redesign" wordmark="Best Western"
    background="#003c7e" ink="#ffffff" muted="#d4e6fa" accent="#a9d5ff" wordTop="#ffffff" wordFoot="#c5e1ff"
    fontSans='"Noto Sans", sans-serif' wordWeight={700} socials={[]} columns={columns}
    credits={[{lead: 'Independent local demo. ', label: 'No real reservations or payments.'}, {lead: 'Hotel names and brand marks belong to their respective owners.', label: ''}]}
    onLinkClick={(_, href) => {
      if (href === '#privacy-settings') setState(s => ({...s, cookies: null}));
      else if (href?.startsWith('/')) navigate(href);
    }} />;
}
function Home() {
  return (
    <>
      <main>
        <ScrollMotion />
        <HomeHero />
        <div id="find-stay" className="home-search">
          <Search />
        </div>
        <div className="benefit-strip">
          <span>
            <Check size={17} />
            Your stay, your way
          </span>
          <span>
            <Gift size={17} />
            More to look forward to
          </span>
          <span>
            <Compass size={17} />
            Two stays. One coastal city.
          </span>
          <Go to="/rewards" className="text-link">
            Meet Rewards <ArrowRight size={17} />
          </Go>
        </div>
        <section className="container home-hotels">
          <div className="section-title">
            <div>
              <p>Room for a new perspective.</p>
              <h2>Find your place in Vizag.</h2>
            </div>
            <Go to="/hotels" className="text-link">
              Explore all stays <ArrowUpRight size={18} />
            </Go>
          </div>
            <SkewCards>
            {hotels.map((h) => (
              <HotelCard key={h.id} hotel={h} small />
            ))}
            </SkewCards>
        </section>
        <FurtherAfield />
        <section className="destination-band">
          <div className="destination-photo">
            <img
              src={coast}
              alt="The hills and coast of Rushikonda"
              loading="lazy"
            />
            <span>THE CITY OF DESTINY.</span>
          </div>
          <div>
            <p>Out of office. Into the blue.</p>
            <h2>
              There’s a whole
              <br />
              other side to Vizag.
            </h2>
            <p>
              Slow mornings by the sea. Hilltop views that stay with you. A city
              that always has one more story to tell.
            </p>
            <Go to="/destinations/visakhapatnam" className="button light">
              Meet Visakhapatnam <ArrowUpRight size={18} />
            </Go>
          </div>
        </section>
        <section className="container rewards-feature">
          <div>
            <p>Best Western Rewards</p>
            <h2>
              Great stays.
              <br />
              Even better returns.
            </h2>
            <p>
              A little recognition goes a long way. Keep your stays, points and
              possibilities together.
            </p>
            <div className="actions">
              <Go to="/join">
                Join Rewards <ArrowRight size={18} />
              </Go>
              <Go to="/rewards" className="text-link">
                Explore benefits
              </Go>
            </div>
          </div>
          <LinearCard as="div" className="rewards-poster">
            <span>BEST WESTERN</span>
            <h3>
              Room
              <br />
              for more.
            </h3>
            <span>REWARDS THAT TRAVEL WITH YOU.</span>
            <ArrowUpRight size={64} />
          </LinearCard>
        </section>
        <section className="brand-band">
          <span>ONE FAMILY. MANY WAYS TO STAY.</span>
          <strong>WorldHotels™</strong>
          <strong>Best Western®</strong>
          <strong>SureStay®</strong>
          <Go to="/brands" className="text-link">
            Explore our brands <ArrowUpRight size={18} />
          </Go>
        </section>
      </main>
    </>
  );
}
function Destination() {
  return (
    <main className="container">
      <div className="page-heading">
        <div>
          <p>Andhra Pradesh · India</p>
          <h1>
            Life looks better
            <br />
            from the coast.
          </h1>
        </div>
        <Go to="/hotels">
          Stay in Visakhapatnam <ArrowRight size={18} />
        </Go>
      </div>
      <img
        className="destination-banner"
        src={coast}
        alt="Rushikonda Beach in Visakhapatnam"
      />
      <div className="editorial-intro">
        <h2>Say hello to Vizag.</h2>
        <p>
          Where the Eastern Ghats meet the Bay of Bengal, make time for a
          different pace. Explore the coast, discover the city’s maritime
          stories, and return to a warm welcome.
        </p>
      </div>
      <div className="editorial-grid">
        {[
          ["RK Beach", "A seafront walk and a chance to slow down."],
          [
            "Kailasagiri",
            "Head for the hilltop for a different view of the city.",
          ],
          [
            "Rushikonda Beach",
            "Make time for the coastline, with a backdrop of green hills.",
          ],
          [
            "INS Kurusura Museum",
            "Discover a piece of maritime history on the beachfront.",
          ],
          [
            "Araku Valley & Borra Caves",
            "Plan a day beyond the city in the Eastern Ghats.",
          ],
          ["Simhachalam Temple", "Explore an important landmark in the hills."],
        ].map(([title, text], i) => (
          <LinearCard as="article" className="editorial-card" key={title}>
            <span className="editorial-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <Go
              className="text-link"
              to={
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent(title + " Visakhapatnam")
              }
            >
              Explore location
            </Go>
          </LinearCard>
        ))}
      </div>
      <section className="home-hotels">
        <h2>Your city base.</h2>
        <div className="hotel-grid">
          {hotels.map((h) => (
            <HotelCard hotel={h} key={h.id} small />
          ))}
        </div>
      </section>
    </main>
  );
}
function Brands() {
  return (
    <main className="container">
      <div className="page-heading">
        <div>
          <p>The BWH Hotels family</p>
          <h1>
            Many ways to stay.
            <br />
            One warm welcome.
          </h1>
        </div>
      </div>
      <p className="lead">
        Discover the brand family. Our current hotel collection focuses on Best
        Western Plus in Visakhapatnam.
      </p>
      <div className="brands-grid">
        {brands.map((b, i) => (
          <LinearCard as="article" className="brand-card" title={b} key={b}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h2>{b}</h2>
            <Link to={"/brands/" + slug(b)}>Explore brand <ArrowUpRight size={18} /></Link>
          </LinearCard>
        ))}
      </div>
    </main>
  );
}
export function Content({ page }: { page: Page }) {
  return (
    <main className="container content-page">
      <div className="page-heading">
        <div>
          <p>Best Western · Explore more</p>
          <h1>{page.title}</h1>
        </div>
      </div>
      <p className="lead">{page.intro}</p>
      {page.form && <Enquiry type={page.form} />}
      <div className="content-sections">
        {page.sections.map((s, i) => (
          <LinearCard as="section" className="content-section-card" title={s.title} key={s.title}>
            <span className="section-index">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              {s.href && (
                <Go to={s.href} className="text-link">
                  {s.label || "Explore"} <ArrowUpRight size={18} />
                </Go>
              )}
            </div>
          </LinearCard>
        ))}
      </div>
    </main>
  );
}
function Enquiry({ type }: { type: string }) {
  const { setState, notify } = useStore();
  const [done, setDone] = useState(false);
  return done ? (
    <div role="status" className="notice">
      <Check />
      <h2>Saved in this browser.</h2>
      <p>
        Your enquiry is in the demo message center. It has not been sent to Best
        Western.
      </p>
      <Go to="/account/messages">View messages</Go>
    </div>
  ) : (
    <form
      className="enquiry-form"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        setState((s) => ({
          ...s,
          requests: [
            {
              type:
                type === "group"
                  ? "Group enquiry"
                  : type === "points"
                    ? "Missing points enquiry"
                    : "Rate claim",
              date: today(),
              details: String(f.get("details")),
            },
            ...s.requests,
          ],
        }));
        setDone(true);
        notify("Demo enquiry saved.");
      }}
    >
      <div className="form-grid">
        <Field label="Name">
          <input required name="name" />
        </Field>
        <Field label="Email">
          <input required type="email" />
        </Field>
        {type === "group" ? (
          <>
            <Field label="Event type">
              <select>
                <option>Rooms only</option>
                <option>Rooms and event</option>
                <option>Event only</option>
              </select>
            </Field>
            <Field label="Number of rooms">
              <input type="number" required min="1" defaultValue="10" />
            </Field>
          </>
        ) : (
          <>
            <Field label="Confirmation number">
              <input required />
            </Field>
            <Field label="Hotel">
              <select>
                {hotels.map((h) => (
                  <option key={h.id}>{h.name}</option>
                ))}
              </select>
            </Field>
          </>
        )}
        <Field label="Arrival date">
          <input type="date" required />
        </Field>
        <Field label="Departure date">
          <input type="date" required />
        </Field>
      </div>
      {type === "claim" && (
        <Field label="Competing rate URL">
          <input type="url" required />
        </Field>
      )}
      <Field label="Details">
        <textarea name="details" required />
      </Field>
      <button className="button">
        Save demo enquiry <ArrowRight size={18} />
      </button>
    </form>
  );
}
function FAQ() {
  const [q, setQ] = useState("");
  const items = [
    [
      "Is this a real reservation website?",
      "This is an independent local redesign demo. Prices, rooms, points and bookings are illustrative. No real hotel reservations or payments are made.",
    ],
    [
      "Which destinations are available?",
      "This first build focuses on Visakhapatnam, with Best Western Plus Tejvivaan and Best Western Plus Ramachandra.",
    ],
    [
      "How do I change or cancel my stay?",
      "Open My reservations, choose your upcoming stay, and use Modify or Cancel stay. Date or room changes require cancelling and creating a new demo reservation.",
    ],
    [
      "Where can I find my confirmation?",
      "Use Check reservations with your demo confirmation number and guest last name, or view My reservations in your account.",
    ],
    [
      "How do Rewards points work here?",
      "The local demo starts with 24,500 points. Choose Rewards Points when searching. Demo redemption deducts points; eligible cancellation returns them.",
    ],
    [
      "How do I update my profile?",
      "Open Profile & preferences. Save your main preferences, email and password validation separately. Addresses are included in the main preferences save.",
    ],
    [
      "Can I request an accessible room?",
      "Confirm specific accessible-room features directly with the hotel through the official property listing before a real stay.",
    ],
    [
      "How can I contact Best Western?",
      "Use Customer Service and Worldwide contacts for official support. Local demo enquiries are saved only in your browser.",
    ],
  ];
  return (
    <main className="container faq-page">
      <h1>A few helpful answers.</h1>
      <Field label="Search questions">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try ‘reservation’ or ‘points’"
        />
      </Field>
      {items
        .filter((x) => x.join(" ").toLowerCase().includes(q.toLowerCase()))
        .map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <Plus size={20} />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      {!items.some((x) =>
        x.join(" ").toLowerCase().includes(q.toLowerCase()),
      ) && (
        <Empty
          title="No matching answers."
          text="Try a shorter search or contact customer service."
          to="/support"
          action="Get help"
        />
      )}
    </main>
  );
}
export function Catalog() {
  const { state, setState, notify } = useStore();
  const [sort, setSort] = useState("Popular");
  const [cart, setCart] = useState<
    { name: string; points: number; qty: number }[]
  >([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  let products = [
    {
      name: "A night to look forward to",
      points: 12000,
      type: "Free-night inspiration",
    },
    { name: "Best Western travel card", points: 10000, type: "Demo reward" },
    { name: "Partner gift card", points: 5000, type: "Demo reward" },
    {
      name: "A little good goes a long way",
      points: 2000,
      type: "Demo charitable reward",
    },
  ];
  if (sort === "Points: low to high")
    products.sort((a, b) => a.points - b.points);
  if (sort === "Title") products.sort((a, b) => a.name.localeCompare(b.name));
  const total = cart.reduce((s, c) => s + c.points * c.qty, 0);
  return (
    <main className="container">
      <div className="page-heading">
        <div>
          <p>Best Western Rewards</p>
          <h1>
            Turn points
            <br />
            into possibilities.
          </h1>
        </div>
        <button className="button" onClick={() => setOpen(true)}>
          Reward basket ({cart.reduce((s, c) => s + c.qty, 0)}){" "}
          <Gift size={18} />
        </button>
      </div>
      <p className="notice">
        This is an illustrative rewards catalog. Demo redemptions do not issue
        real rewards.
      </p>
      <div className="results-toolbar">
        <span>{state.points.toLocaleString()} demo points</span>
        <select
          aria-label="Sort rewards"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option>Popular</option>
          <option>Points: low to high</option>
          <option>Title</option>
        </select>
      </div>
      <div className="catalog-grid">
        {products.map((p, i) => (
          <LinearCard as="article" className="catalog-card" key={p.name}>
            <div className="reward-art">
              <span>0{i + 1}</span>
              <Gift size={65} />
            </div>
            <p>{p.type}</p>
            <h2>{p.name}</h2>
            <strong>{p.points.toLocaleString()} points</strong>
            <button
              className="button outline"
              onClick={() => {
                setCart((c) =>
                  c.some((x) => x.name === p.name)
                    ? c.map((x) =>
                        x.name === p.name ? { ...x, qty: x.qty + 1 } : x,
                      )
                    : [...c, { ...p, qty: 1 }],
                );
                notify("Added to your demo reward basket.");
              }}
            >
              Add to basket <Plus size={16} />
            </button>
          </LinearCard>
        ))}
      </div>
      {open && (
        <Modal title="Your reward basket" onClose={() => setOpen(false)}>
          {cart.length ? (
            <>
              <div>
                {cart.map((c) => (
                  <div className="basket-row" key={c.name}>
                    <div>
                      <h3>{c.name}</h3>
                      <p>{c.points.toLocaleString()} points each</p>
                    </div>
                    <div className="quantity">
                      <button
                        aria-label={"Remove one " + c.name}
                        onClick={() =>
                          setCart(
                            cart
                              .map((x) =>
                                x.name === c.name
                                  ? { ...x, qty: x.qty - 1 }
                                  : x,
                              )
                              .filter((x) => x.qty > 0),
                          )
                        }
                      >
                        <Minus size={15} />
                      </button>
                      <span>{c.qty}</span>
                      <button
                        aria-label={"Add one " + c.name}
                        onClick={() =>
                          setCart(
                            cart.map((x) =>
                              x.name === c.name ? { ...x, qty: x.qty + 1 } : x,
                            ),
                          )
                        }
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <h2>{total.toLocaleString()} points total</h2>
              {error && <p role="alert">{error}</p>}
              <button
                className="button"
                onClick={() => {
                  if (!state.signedIn) {
                    setError("Enter the demo account before redeeming.");
                    return;
                  }
                  if (total > state.points) {
                    setError(
                      "Not enough demo points. Remove an item to continue.",
                    );
                    return;
                  }
                  setState((s) => ({
                    ...s,
                    points: s.points - total,
                    activity: [
                      {
                        label: "Demo reward redemption",
                        amount: -total,
                        date: today(),
                      },
                      ...s.activity,
                    ],
                    requests: [
                      {
                        type: "Demo reward confirmation",
                        details:
                          cart.map((c) => c.qty + " × " + c.name).join(", ") +
                          ". No real rewards issued.",
                        date: today(),
                      },
                      ...s.requests,
                    ],
                  }));
                  setCart([]);
                  setOpen(false);
                  notify(
                    "Demo redemption complete. View your activity and messages.",
                  );
                }}
              >
                Redeem demo points
              </button>
            </>
          ) : (
            <Empty
              title="Room for something good."
              text="Add a reward to your basket."
            />
          )}
        </Modal>
      )}
    </main>
  );
}
function Shell() {
  const { state, setState, toast, notify } = useStore();
  const loc = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title =
      (pages[loc.pathname]?.title || "Best Western · Visakhapatnam") +
      " | Local demo";
  }, [loc.pathname]);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => notify(""), 5000);
      return () => clearTimeout(t);
    }
  }, [toast, notify]);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <JourneyMotion />
      <div id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<HotelSearch />} />
          <Route path="/further-afield/:id" element={<FurtherHotel />} />
          <Route path="/hotels/:id" element={<HotelDetail />} />
          <Route path="/hotels/:id/rooms" element={<Rooms />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/confirmation/:id" element={<Confirmation />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/join" element={<Auth join />} />
          <Route path="/forgot-password" element={<Auth recover />} />
          <Route path="/reservations" element={<Reservations lookup />} />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/destinations/visakhapatnam" element={<Destination />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/support/faq" element={<FAQ />} />
          <Route path="/rewards/catalog" element={<Catalog />} />
          {Object.entries(pages).map(([path, page]) => (
            <Route key={path} path={path} element={<Content page={page} />} />
          ))}
          <Route
            path="*"
            element={
              <main className="container">
                <Empty
                  title="A small detour."
                  text="That page isn’t in this destination collection. Let’s get you back to a good stay."
                  to="/"
                  action="Back to home"
                />
              </main>
            }
          />
        </Routes>
      </div>
      <Footer />
      {toast && (
        <div className="toast" role="status">
          <Check size={18} />
          {toast}
          <button aria-label="Dismiss notification" onClick={() => notify("")}>
            <X size={16} />
          </button>
        </div>
      )}
      {state.cookies === null && (
        <div
          className="cookie-bar"
          role="region"
          aria-label="Privacy preferences"
        >
          <div>
            <strong>A little space for your preferences.</strong>
            <p>
              This demo uses browser storage to remember your local trips and
              settings. <Link to="/privacy">Privacy details</Link>
            </p>
          </div>
          <button
            className="button"
            onClick={() => setState((s) => ({ ...s, cookies: true }))}
          >
            Got it <Check size={16} />
          </button>
        </div>
      )}
    </>
  );
}
export default function App() {
  return (
    <Provider>
      <Shell />
    </Provider>
  );
}




