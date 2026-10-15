export const coast =
  "https://www.clubmahindra.com/blog/images/Visakhapatnams-Rushikonda-Beach-Regains-Prestigious-Blue-Flag-Certification-resized.jpg";
export const hotels = [
  {
    id: "tejvivaan",
    code: "76993",
    name: "Best Western Plus Tejvivaan",
    area: "Dwaraka Nagar",
    address: "Station Road, Dwarkanagar, Visakhapatnam 530016",
    price: 4800,
    image: "https://gos3.ibcdn.com/c0742af1-257d-4f9a-86a6-b6ef45307982.jpg",
    intro: "A city stay, beautifully connected.",
    description:
      "Make Dwaraka Nagar your base for exploring Visakhapatnam. Rooms with workspaces, on-site dining, a spa and meeting spaces bring business and leisure together.",
    amenities: [
      "Wi-Fi",
      "Restaurant",
      "Fitness center",
      "Spa",
      "Meeting spaces",
    ],
    nearby: [
      "RK Beach",
      "Kailasagiri Hill Park",
      "INS Kurusura Submarine Museum",
      "Tenneti Park",
    ],
    source:
      "https://www.bestwestern.com/en_US/book/hotels-in-visakhapatnam/best-western-plus-tejvivaan/propertyCode.76993.html",
  },
  {
    id: "ramachandra",
    code: "76564",
    name: "Best Western Plus Ramachandra",
    area: "Gajuwaka",
    address: "Gajuwaka, Visakhapatnam, Andhra Pradesh",
    price: 4200,
    image: "",
    intro: "An easy arrival. A warmer welcome.",
    description:
      "Stay in Gajuwaka with breakfast, Wi-Fi and a fitness center. Utsav, the on-site restaurant, serves Indian, Chinese and Tandoori dishes.",
    amenities: ["Wi-Fi", "Breakfast", "Restaurant", "Fitness center"],
    nearby: [
      "Simhachalam Temple",
      "Kambalakonda Wildlife Sanctuary",
      "RK Beach",
      "Araku Valley",
    ],
    source:
      "https://www.bestwestern.com/en_US/book/hotels-in-vishakhapatnam/best-western-plus-ramachandra/propertyCode.76564.html",
  },
];
export const brands = [
  "Best Western",
  "Best Western Plus",
  "Best Western Premier",
  "BW Premier Collection",
  "BW Signature Collection",
  "Executive Residency",
  "GLo",
  "Vīb",
  "Aiden",
  "SureStay",
  "SureStay Plus",
  "SureStay Collection",
  "SureStay Studio",
  "WorldHotels Luxury",
  "WorldHotels Elite",
  "WorldHotels Crafted",
  "WorldHotels Distinctive",
  "WorldHotels Backdrop",
];
export const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
export type Page = {
  title: string;
  intro: string;
  sections: { title: string; text: string; href?: string; label?: string }[];
  form?: string;
  official?: string;
};
const s = (title: string, text: string, href?: string, label?: string) => ({
  title,
  text,
  href,
  label,
});
export const pages: Record<string, Page> = {
  "/rewards": {
    title: "Every stay takes you further.",
    intro:
      "Meet Best Western Rewards. Make room for the next trip with benefits that travel with you.",
    sections: [
      s(
        "Join the journey",
        "Explore membership and enroll through the official Best Western Rewards site.",
        "https://www.bestwestern.com/en_US/best-western-rewards.html",
        "Visit Best Western Rewards",
      ),
      s(
        "Earn on your terms",
        "Choose points or an eligible travel partner through official Rewards services.",
        "/rewards/earn",
        "Explore earning",
      ),
      s(
        "Make points into plans",
        "Explore free nights, gift cards and more.",
        "/rewards/redeem",
        "Ways to redeem",
      ),
      s(
        "A little more at every level",
        "Explore membership tiers and qualifying nights.",
        "/rewards/tiers",
        "See your benefits",
      ),
    ],
  },
  "/rewards/tiers": {
    title: "A welcome at every level.",
    intro:
      "Your membership grows with your travels. These tier thresholds were observed in the 2026 source inventory.",
    sections: [
      s(
        "Blue · start here",
        "Membership benefits and activity are managed through the official Best Western Rewards program.",
      ),
      s("Gold · 5 nights", "Earn a 10% points bonus on qualifying stays."),
      s("Platinum · 7 nights", "Earn a 15% points bonus on qualifying stays."),
      s("Diamond · 15 nights", "Earn a 30% points bonus on qualifying stays."),
      s(
        "Diamond Select · 25 nights",
        "Earn a 50% points bonus on qualifying stays.",
      ),
    ],
  },
  "/rewards/earn": {
    title: "More ways to earn.",
    intro:
      "Make your next stay count, or explore earning with travel partners.",
    sections: [
      s(
        "Hotel stays",
        "Explore the two Visakhapatnam hotels in this experience.",
        "/hotels",
        "Find a stay",
      ),
      s(
        "Travel partners",
        "Review points and airline earning options with Best Western Rewards.",
        "https://www.bestwestern.com/en_US/best-western-rewards.html",
        "Explore official Rewards",
      ),
      s(
        "Credit cards",
        "Explore the current official card offer and eligibility.",
        "/rewards/credit-card",
        "Explore cards",
      ),
      s(
        "Missing points?",
        "Keep your hotel name, confirmation number and stay dates ready.",
        "/support/missing-points",
        "Request a review",
      ),
    ],
  },
  "/rewards/redeem": {
    title: "Your points. Your possibilities.",
    intro: "Find a little inspiration for your next reward.",
    sections: [
      s(
        "Free nights",
        "Use your demo points when choosing a room.",
        "/hotels",
        "Find a hotel",
      ),
      s(
        "Rewards catalog",
        "Explore current reward options through the official Best Western Rewards site.",
        "https://www.bestwestern.com/en_US/best-western-rewards.html",
        "Browse official rewards",
      ),
      s(
        "Pay with points",
        "Compare points and money options for your next stay.",
        "/rewards/pay-with-points",
        "How it works",
      ),
      s(
        "Gift a free night",
        "Discover how to share a stay.",
        "/rewards/gift-a-night",
        "Explore",
      ),
      s(
        "Travel partners & giving",
        "Explore official airline and charitable redemption options.",
        "/rewards/partners",
        "View partners",
      ),
    ],
  },
  "/rewards/pay-with-points": {
    title: "Put points toward a stay.",
    intro:
      "Check eligible points rates and redemption options through Best Western Rewards.",
    sections: [
      s(
        "Choose your stay",
        "Set your dates and pick a Visakhapatnam hotel.",
        "/hotels",
        "Search hotels",
      ),
      s(
        "Review your balance",
        "Your points balance and eligible redemption rates are available through your official Best Western Rewards account.",
        "https://www.bestwestern.com/en_US/best-western-rewards.html",
        "Visit Best Western Rewards",
      ),
    ],
  },
  "/rewards/gift-a-night": {
    title: "Give someone a getaway.",
    intro: "Explore the official free-night gifting service.",
    sections: [
      s(
        "A stay worth sharing",
        "Gifting eligibility and redemption conditions are managed by Best Western. This demo does not issue travel awards.",
        "https://www.bestwestern.com/en_US/best-western-rewards.html",
        "Visit official Rewards",
      ),
    ],
  },
  "/rewards/partners": {
    title: "Travel, together.",
    intro:
      "Discover ways to connect your loyalty with your travel preferences.",
    sections: [
      s(
        "Airline rewards",
        "Review airline and partner earning choices through official Best Western Rewards services.",
        "https://www.bestwestern.com/en_US/best-western-rewards.html",
        "Explore official Rewards",
      ),
      s(
        "Partner redemption",
        "Current partners, conversion rates and charity options are available from official Rewards.",
        "https://www.bestwestern.com/en_US/best-western-rewards.html",
        "Visit official Rewards",
      ),
    ],
  },
  "/rewards/credit-card": {
    title: "Rewards beyond your stay.",
    intro:
      "Explore Best Western Rewards credit card options on the official site.",
    sections: [
      s(
        "Card offers & eligibility",
        "Applications, rates, fees and eligibility are supplied by the issuer. No applications are collected in this local demo.",
        "https://www.bestwestern.com/en_US/best-western-rewards/credit-card.html",
        "View official card information",
      ),
    ],
  },
  "/rewards/status-match": {
    title: "Bring your status with you.",
    intro: "Explore Status Match…No Catch® through Best Western Rewards.",
    sections: [
      s(
        "Match your membership",
        "Use the official Rewards service for current eligibility and required documentation.",
        "https://www.bestwestern.com/en_US/best-western-rewards.html",
        "View official program",
      ),
    ],
  },
  "/offers": {
    title: "Good stays. Better possibilities.",
    intro: "Find a rate that fits the way you travel.",
    sections: [
      s(
        "Plan ahead",
        "Explore advance purchase options and read cancellation conditions before booking.",
        "/offers/early",
        "Early booking",
      ),
      s(
        "A spontaneous escape",
        "Make a little time for Visakhapatnam.",
        "/offers/last-minute",
        "Last-minute stays",
      ),
      s(
        "AAA / CAA",
        "Explore eligible member rates.",
        "/offers/aaa-caa",
        "Member rates",
      ),
      s(
        "AARP / Senior",
        "Choose the relevant rate program for your search.",
        "/offers/senior",
        "Senior rates",
      ),
      s(
        "Government & military",
        "Explore eligible rates and identification requirements.",
        "/offers/government",
        "Government rates",
      ),
      s(
        "Member offers",
        "View currently available offers on Best Western.",
        "https://www.bestwestern.com/en_US/offers/",
        "View official offers",
      ),
    ],
  },
  "/groups": {
    title: "Bring everyone along.",
    intro:
      "From business meetings to celebrations, make space for a shared experience.",
    form: "group",
    sections: [
      s(
        "Fewer than 10 rooms?",
        "Search available demo rooms and keep your party together.",
        "/hotels",
        "Find rooms",
      ),
      s(
        "Rooms, events, or both",
        "Tell us the occasion using the local enquiry form. Large-group requests are saved on this device only.",
      ),
      s(
        "Have a group ID?",
        "Use the promotional rate field in your trip search.",
        "/hotels",
        "Enter your code",
      ),
    ],
  },
  "/support": {
    title: "A little help goes a long way.",
    intro: "Find answers, manage your stay, or get in touch.",
    sections: [
      s(
        "Your reservation",
        "Manage or look up a reservation through Best Western’s official booking service.",
        "https://www.bestwestern.com/en_US/book/",
        "Manage a reservation",
      ),
      s(
        "Frequently asked questions",
        "Answers about this experience, booking and membership.",
        "/support/faq",
        "Find an answer",
      ),
      s(
        "Missing points",
        "Record a local points enquiry.",
        "/support/missing-points",
        "Request help",
      ),
      s(
        "Worldwide contact numbers",
        "Find the official contact for your region.",
        "/support/contacts",
        "Contact directory",
      ),
    ],
  },
  "/support/contacts": {
    title: "We’re here to help.",
    intro: "Choose the right team for your question.",
    sections: [
      s(
        "US & Canada reservations",
        "1 (800) 780-7234",
        "tel:+18007807234",
        "Call reservations",
      ),
      s(
        "Rewards customer service",
        "1 (800) 237-8483",
        "tel:+18002378483",
        "Call Rewards",
      ),
      s(
        "Worldwide numbers",
        "Visit the official directory for your country.",
        "https://www.bestwestern.com/en_US/customer-service.html",
        "Official customer service",
      ),
    ],
  },
  "/support/missing-points": {
    title: "Let’s find those points.",
    intro:
      "Save a points enquiry locally with your stay details. This demo does not send a claim to Best Western.",
    form: "points",
    sections: [],
  },
  "/low-rate-guarantee": {
    title: "Book with confidence.",
    intro: "Explore the official Low Rate Guarantee and its current terms.",
    sections: [
      s(
        "Compare like for like",
        "Room type, dates and rate conditions matter when comparing a stay.",
      ),
      s(
        "Submit a claim",
        "Keep your booking reference and the competing rate details. Demo claims are stored locally.",
        "/low-rate-guarantee/claim",
        "Start demo claim",
      ),
      s(
        "Official terms",
        "Read the current terms before making a real claim.",
        "https://www.bestwestern.com/en_US/offers/hotel-discounts/low-rate-guarantee.html",
        "Read official guarantee",
      ),
    ],
  },
  "/low-rate-guarantee/claim": {
    title: "Your rate claim.",
    intro: "Record a local demo claim. Nothing is sent to the hotel.",
    form: "claim",
    sections: [],
  },
  "/gift-cards": {
    title: "Give the gift of getting away.",
    intro: "Keep gift cards and travel awards together in your wallet.",
    sections: [
      s(
        "Your travel wallet",
        "Purchase a gift card or travel award through the official Best Western service.",
        "https://www.bestwestern.com/en_US/offers/travel-card.html",
        "Visit official gift cards",
      ),
      s(
        "Purchase a gift card",
        "Real gift cards are issued by the official service.",
        "https://www.bestwestern.com/en_US/offers/travel-card.html",
        "Visit official gift cards",
      ),
    ],
  },
  "/travel-professionals": {
    title: "For the people who plan the trip.",
    intro: "Resources for travel professionals and business travelers.",
    sections: [
      s(
        "Travel agent rates",
        "Explore the official travel professional resources and current eligibility.",
      ),
      s(
        "BestCheque",
        "Commission services and support are provided by Best Western.",
      ),
      s(
        "Business travel",
        "Explore business travel and company rate programs.",
        "/business",
        "Business travel",
      ),
      s(
        "Groups & meetings",
        "Plan a multi-room stay or event.",
        "/groups",
        "Start planning",
      ),
    ],
  },
  "/business": {
    title: "Make business feel personal.",
    intro:
      "Explore Best Western Business Advantage and business travel resources.",
    sections: [
      s(
        "Business Advantage",
        "Discover the official small-business travel program.",
        "https://www.bestwestern.com/en_US/best-western-rewards/business-advantage.html",
        "Official Business Advantage",
      ),
      s(
        "Corporate rates",
        "Choose Corporate in the search rate selector and enter a company code.",
        "/hotels",
        "Find your stay",
      ),
      s(
        "Meeting planners",
        "Plan rooms, an event, or both.",
        "/groups",
        "Plan a meeting",
      ),
    ],
  },
  "/about": {
    title: "Hospitality, with a human touch.",
    intro: "Explore the BWH Hotels family and the people and places behind it.",
    sections: [
      s(
        "Our brands",
        "Discover the brand families in the source inventory.",
        "/brands",
        "Explore brands",
      ),
      s(
        "Leadership & history",
        "Visit the official company site for current leadership and company history.",
        "https://www.bestwestern.com/en_US/about.html",
        "Official company information",
      ),
      s(
        "Press & media",
        "Explore official announcements.",
        "/press",
        "Press room",
      ),
      s(
        "Earth, People, Community",
        "Learn about the official sustainability program.",
        "https://www.bwhhotelgroup.com",
        "Explore the program",
      ),
      s(
        "Hotel development",
        "Explore joining the hotel family.",
        "https://development.bwhhotels.com",
        "Development",
      ),
      s(
        "Careers",
        "Find current opportunities on the official careers site.",
        "https://jobs.bestwestern.com",
        "Explore careers",
      ),
    ],
  },
  "/press": {
    title: "From the press room.",
    intro: "News, company information and media resources.",
    sections: [
      s(
        "Latest announcements",
        "Read current official announcements and media contacts.",
        "https://www.bestwestern.com/en_US/about/press-media.html",
        "Visit the press room",
      ),
    ],
  },
  "/affiliate": {
    title: "Connect travelers with their next stay.",
    intro: "Explore the official affiliate program.",
    sections: [
      s(
        "Affiliate opportunities",
        "Current application and program conditions are handled by the official service.",
        "https://www.bestwestern.com/en_US/about/affiliate-program.html",
        "Explore the program",
      ),
    ],
  },
  "/app": {
    title: "Your next stay, in your pocket.",
    intro: "Discover the official Best Western To Go app.",
    sections: [
      s(
        "Take your travels with you",
        "Use the official website to find the current iOS and Android download links.",
        "https://www.bestwestern.com/en_US/hotels/discover-best-western/mobile.html",
        "Get the official app",
      ),
    ],
  },
  "/accessibility": {
    title: "Room for everyone.",
    intro:
      "This experience supports keyboard navigation, visible focus, labeled forms and reduced motion.",
    sections: [
      s(
        "Accessible hotel stays",
        "Contact the hotel directly to confirm room features and availability before making a real reservation.",
      ),
      s(
        "Official accessibility information",
        "Read Best Western’s accessibility information on its official site.",
        "https://www.bestwestern.com/en_US/customer-service.html",
        "Contact support",
      ),
    ],
  },
  "/privacy": {
    title: "Your privacy.",
    intro:
      "This independent hotel website redesign does not offer guest sign-in or store account profiles. Reservations and Rewards accounts are handled by Best Western.",
    sections: [
      s(
        "Your local information",
        "This site does not collect payment details or account passwords. Booking and Rewards information is handled on the official Best Western site.",
      ),
      s(
        "Images & external links",
        "Images may load from third-party hosts. External services have their own privacy policies.",
      ),
      s(
        "Official privacy policy",
        "The official privacy policy applies to Best Western’s services.",
        "https://www.bestwestern.com/en_US/customer-service/privacy-policy.html",
        "Read official policy",
      ),
    ],
  },
  "/terms": {
    title: "Demo terms of use.",
    intro:
      "An independent local redesign prototype. No bookings, payments, awards or customer support requests are submitted to Best Western.",
    sections: [
      s(
        "Illustrative prices",
        "All prices, room availability, points and reservations are demo data. They are not live quotes.",
      ),
      s(
        "Official terms",
        "Use the official site for real reservations and applicable terms.",
        "https://www.bestwestern.com/en_US/customer-service/terms-of-use.html",
        "Official terms",
      ),
    ],
  },
};
for (const [id, title, rate] of [
  ["early", "Plan a little further ahead.", "Advance purchase"],
  ["last-minute", "A getaway can start today.", "Best Rate"],
  ["aaa-caa", "A benefit of belonging.", "AAA / CAA"],
  ["senior", "More time for a great stay.", "AARP / Senior"],
  ["government", "A stay that works for you.", "Government / Military"],
])
  pages["/offers/" + id] = {
    title,
    intro: `Explore ${rate} options. Eligibility and rate conditions apply to real reservations.`,
    sections: [
      s(
        "Find your Visakhapatnam stay",
        "Select your dates and rate program. Prices shown in this prototype are illustrative.",
        "/hotels",
        "Explore hotels",
      ),
      s(
        "Know before you go",
        "Read room and cancellation conditions before confirming. Offer availability is not live in this demo.",
      ),
    ],
  };
for (const brand of brands)
  pages["/brands/" + slug(brand)] = {
    title: brand,
    intro: "Part of the BWH Hotels brand family.",
    sections: [
      s(
        "Find your kind of stay",
        "Our current destination collection features two Best Western Plus hotels in Visakhapatnam.",
        "/hotels",
        "Explore Visakhapatnam",
      ),
      s(
        "Explore the official brand",
        "Visit Best Western for the current global brand collection.",
        "https://www.bestwestern.com/en_US/hotels/discover-best-western.html",
        "Official brand collection",
      ),
    ],
  };
export const accountLinks = [
  ["", "Overview"],
  ["reservations", "My reservations"],
  ["favorites", "Saved hotels"],
  ["wallet", "Travel wallet"],
  ["activity", "Rewards activity"],
  ["profile", "Profile & preferences"],
  ["messages", "Message center"],
  ["offers", "My offers"],
];
export const rateOptions = [
  "Best Rate",
  "Rewards Points",
  "AAA / CAA",
  "Corporate",
  "AARP / Senior",
  "Government / Military",
  "Promotional",
];
export function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export function addDays(date: string, n: number) {
  const d = new Date(date + "T12:00:00");
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export const money = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
export const nights = (a: string, b: string) =>
  Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
