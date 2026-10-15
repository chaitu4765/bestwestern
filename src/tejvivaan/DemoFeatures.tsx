import { useEffect, useState, type ReactNode } from 'react';
import { Gift, Plus, Minus } from 'lucide-react';
import { ArrowUpRight, ArrowRight, ArrowLeft, Menu, X, Phone, Mail, MapPin, Heart, Check, Maximize2 } from 'lucide-react';
import { useStore } from '@/store';
import { hotels, today, type Page } from '@/data';
import { Go, Field, Modal, Empty } from '@/ui';
import LinearCard from '@/components/ui/linear-card';

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
  const [done, setDone] = useState(false);
  return done ? (
    <div role="status" className="notice">
      <Check />
      <h2>Email draft prepared.</h2>
      <p>Your email app should open with the enquiry ready. Review it and send it to contact Best Western.</p>
      <a href="mailto:reservations@bwtejvivaan.in">Email the hotel directly</a>
    </div>
  ) : (
    <form
      className="enquiry-form"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const subject = type === "group" ? "Group enquiry" : type === "points" ? "Missing points enquiry" : "Rate claim enquiry";
        const body = [...f.entries()].map(([key, value]) => `${key}: ${value}`).join("\n");
        window.location.href = `mailto:reservations@bwtejvivaan.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setDone(true);
      }}
    >
      <div className="form-grid">
        <Field label="Name">
          <input required name="name" />
        </Field>
        <Field label="Email">
          <input required type="email" name="email" />
        </Field>
        {type === "group" ? (
          <>
            <Field label="Event type">
              <select name="event type">
                <option>Rooms only</option>
                <option>Rooms and event</option>
                <option>Event only</option>
              </select>
            </Field>
            <Field label="Number of rooms">
              <input name="number of rooms" type="number" required min="1" defaultValue="10" />
            </Field>
          </>
        ) : (
          <>
            <Field label="Confirmation number">
              <input name="confirmation number" required />
            </Field>
            <Field label="Hotel">
              <select name="hotel">
                {hotels.filter(h => h.id === 'tejvivaan').map((h) => (
                  <option key={h.id}>{h.name}</option>
                ))}
              </select>
            </Field>
          </>
        )}
        <Field label="Arrival date">
          <input name="arrival date" type="date" required />
        </Field>
        <Field label="Departure date">
          <input name="departure date" type="date" required />
        </Field>
      </div>
      {type === "claim" && (
        <Field label="Competing rate URL">
          <input name="competing rate URL" type="url" required />
        </Field>
      )}
      <Field label="Details">
        <textarea name="details" required />
      </Field>
      <button className="button">
        Prepare email <ArrowRight size={18} />
      </button>
    </form>
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
