import { createContext, useContext, useState, type ReactNode } from "react";
import { today, addDays } from "./data";
export type Trip = {
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  rooms: number;
  rate: string;
  code: string;
};
export type Booking = {
  id: string;
  hotel: string;
  room: string;
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  rooms: number;
  total: number;
  points: number;
  status: "Upcoming" | "Cancelled";
  guest: string;
};
export type Profile = {
  first: string;
  last: string;
  email: string;
  phone: string;
  phoneType: string;
  earning: string;
  partner: string;
  purpose: string;
  rate: string;
  interests: string[];
  emailNews: boolean;
  partnerNews: boolean;
  addresses: {
    type: string;
    line: string;
    city: string;
    postal: string;
    country: string;
    primary: boolean;
  }[];
};
export type Wallet = {
  id: string;
  type: string;
  amount: number;
  status: string;
};
export type State = {
  signedIn: boolean;
  points: number;
  profile: Profile;
  bookings: Booking[];
  favorites: string[];
  wallet: Wallet[];
  activity: { label: string; amount: number; date: string }[];
  requests: { type: string; date: string; details: string }[];
  trip: Trip;
  cookies: boolean | null;
};
export const initial: State = {
  signedIn: false,
  points: 24500,
  profile: {
    first: "Alex",
    last: "Morgan",
    email: "alex@example.com",
    phone: "",
    phoneType: "Mobile",
    earning: "Best Western Rewards points",
    partner: "",
    purpose: "Leisure",
    rate: "Best Rate",
    interests: ["Beaches"],
    emailNews: false,
    partnerNews: false,
    addresses: [],
  },
  bookings: [],
  favorites: [],
  wallet: [],
  activity: [],
  requests: [],
  trip: {
    checkin: addDays(today(), 7),
    checkout: addDays(today(), 9),
    adults: 2,
    children: 0,
    rooms: 1,
    rate: "Best Rate",
    code: "",
  },
  cookies: null,
};
const Ctx = createContext<{
  state: State;
  setState: (fn: (s: State) => State) => void;
  notify: (s: string) => void;
  toast: string;
}>({ state: initial, setState: () => {}, notify: () => {}, toast: "" });
export function Provider({ children }: { children: ReactNode }) {
  const [state, set] = useState<State>(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("bw-vizag-v1") || "null");
      return raw && Array.isArray(raw.bookings) && raw.profile && raw.trip
        ? { ...initial, ...raw }
        : initial;
    } catch {
      return initial;
    }
  });
  const [toast, notify] = useState("");
  function setState(fn: (s: State) => State) {
    set((s) => {
      const next = fn(s);
      try {
        localStorage.setItem("bw-vizag-v1", JSON.stringify(next));
      } catch {
        notify(
          "Browser storage is unavailable. Changes will last for this session.",
        );
      }
      return next;
    });
  }
  return (
    <Ctx.Provider value={{ state, setState, notify, toast }}>
      {children}
    </Ctx.Provider>
  );
}
export const useStore = () => useContext(Ctx);
