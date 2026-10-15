# Best Western — brutalist UI redesign specification

> **Historical and superseded.** The user corrected the source website to Best Western Plus Hotel Tejvivaan and changed the visual direction to liquid glass. See [03-tejvivaan-site-inventory.md](03-tejvivaan-site-inventory.md), [PRODUCT.md](PRODUCT.md), and the current [DESIGN.md](DESIGN.md).

> Superseded. The user corrected the source website to the Tejvivaan property site and replaced the visual direction with liquid glass. This file documents the earlier, incorrect global-site brief. The active inventory is [03-tejvivaan-site-inventory.md](03-tejvivaan-site-inventory.md); the active design is documented in [DESIGN.md](DESIGN.md) and `src/tejvivaan.css`.

Prepared: 14 October 2026. Companion: [site inventory](01-best-western-site-inventory.md).

This document proposes the new interface. It preserves the verified US-English site scope, content families and account functions. Proposed interactions are distinguished from observed behavior. It is a design/build specification, not an implemented website or a claim that every source page has been captured.

## 1. Direction: a bold travel booking desk

Use Best Western's existing blue, yellow and white as large, deliberate surfaces. Treat the interface like a practical travel desk: destination, dates, room choices, policies and points should be immediately legible. Express brutalism through oversized type, square geometry, strong grid lines and hard offset shadows. Real hotel photography supplies warmth and specificity.

The signature interaction is an editable trip strip that follows the traveler from search through room selection. Its cells resemble a printed itinerary: destination, arrival, departure, occupancy, rate. Opening a cell expands a clearly bounded editor; confirming updates the itinerary and preserves the other choices. This is a proposed interaction, not a description of the incumbent implementation.

Success means users can find a hotel, compare honest total costs, understand conditions, book, and manage their stay without losing context. The design must also retain the long tail: individual hotel content, destination articles, discounts, professional programs, company pages, legal pages, and external services.

### Visual commitment

- Square panels and buttons; 2–3px blue structural borders; prominent actions may have a 4–6px hard offset shadow.
- Large blue headings and bright yellow action areas, balanced by white reading space.
- Flat color and real photographs; no glass effects, decorative gradients, excessive pill controls or floating dashboard-card wallpaper.
- One strong hero composition per marketing page; restrained layout on forms and checkout.
- Use black only where semantically necessary; blue carries the outlines so the site retains its identity.
- Keep official logos intact. Do not redraw them as brutalist text or recolor their internal artwork.

## 2. Observed brand tokens and proposed system

Values below were read from the live homepage's computed styles. They are observed UI colors, not a substitute for official brand guidelines. [Source](https://www.bestwestern.com/en_US.html)

| Token | Value | Status | Proposed role |
|---|---|---|---|
| brand-blue | #003C7E | Observed | Header, borders, headings, primary text on yellow |
| brand-yellow | #FFCC00 | Observed | Primary action, selected emphasis, campaign band |
| paper | #FFFFFF | Observed | Main surface and reversed text on blue |
| text-gray | #48494A | Observed | Long-form supporting text |
| link-blue | #275D8B | Observed | Inline editorial links with underline |
| heading-blue-variant | #003C7F | Observed | Consolidate with brand-blue unless brand guidance requires distinction |
| soft-surface | #F2F4F6 | Proposed | Disabled backgrounds and quiet section separation |
| critical | #A51C30 | Proposed | Errors, always paired with icon/text |
| success | #17643B | Proposed | Confirmed actions, always paired with text |

Typography: retain Noto Sans for body and control text, as observed. Use Noto Sans Black/ExtraBold for display headings to stay close to the existing family. Use a system monospace only for reference numbers, points totals and compact metadata. If a new display font is introduced later, treat it as an explicit brand decision.

| Element | Desktop | Mobile | Rule |
|---|---|---|---|
| Homepage display | 64–88px, heavy | 36–44px | Short lines; no clipped text |
| Page title | 40–56px | 30–36px | One H1 per page |
| Section title | 28–36px | 24–28px | Sentence case |
| Body | 16–18px, 1.5–1.65 line height | 16px minimum | Keep legal and policy text readable |
| Form controls | 16px | 16px | Persistent labels; input heights at least 48px |
| Metadata | 13–14px | 13–14px | Never use tiny type for price exclusions |

Use a 4px spacing base with 8/12/16/24/32/48/64/96 steps. Reading columns should stay near 65–75 characters. Desktop content width: approximately 1280–1360px, with 24–48px outer margins. Borders define sections; whitespace separates related ideas inside them.

Verify color contrast in implementation. Yellow uses blue text. Blue uses white text. Focus uses a two-tone outline so it remains visible on both brand surfaces.

## 3. Information architecture and routing

Retain existing public URLs where practical. If paths change, provide explicit redirect mappings for every source record. A new prettier route is not sufficient reason to orphan search traffic or saved links.

| Primary area | Children | Main task |
|---|---|---|
| Find a stay | Search, destination directory, hotel detail, rooms, checkout | Book suitable accommodation |
| Offers | Partner rates, campaigns, regional deals, guarantee, gift cards | Identify an eligible benefit |
| Rewards | Benefits, tiers, earn, redeem, partners, status match | Understand and use membership |
| Our brands | Portfolio and individual brands | Choose the right type of stay |
| Help | Reservation lookup, FAQs, support, privacy/accessibility | Resolve a problem |
| My account | Overview, trips, wallet, profile, activity, messages, favorites where supported | Manage membership and travel |
| Footer | Groups, professionals, business/planner programs, about, press, careers, developers, legal, social | Preserve secondary journeys |

Desktop navigation should fit on one line and expose a structured menu for secondary links. Mobile uses a full-height menu sheet with the same entries and a persistent close control. Account navigation is separate from general marketing navigation, with direct links to trips and profile.

Keep a site-wide language entry even though this phase recreates only US-English. It should link to supported language sites or clearly state their availability; do not present fake translated screens.

## 4. Homepage — search leads, campaigns support

Mode: Persuade plus immediate booking task.

At desktop width, use a deep-blue header followed by a split hero. The left contains one large travel-oriented heading and the booking form; the right is one real destination/property image with a plain caption. Place the yellow search action at the end of the itinerary grid. Avoid embedding crucial offer conditions into image text.

```text
┌─────────────────────────────────────────────────────────────────────┐
│ BRAND STRIP                                                         │
├─────────────────────────────────────────────────────────────────────┤
│ LOGO       FIND A STAY   OFFERS   REWARDS   BRANDS   HELP    ACCOUNT  │
├─────────────────────────────────┬───────────────────────────────────┤
│ LARGE TRAVEL HEADING            │                                   │
│ Short supporting line          │ REAL DESTINATION PHOTOGRAPH       │
│ Destination                    │                                   │
│ Arrival | Departure | Guests   │ Caption / location                │
│ Rate / points     [FIND HOTEL] │                                   │
├─────────────────────────────────┴───────────────────────────────────┤
│ ACTIVE CAMPAIGN     eligibility + dates + registration + terms      │
├─────────────────────────────────────────────────────────────────────┤
│ DESTINATIONS  →   REWARDS BENEFITS  →   BRANDS  →   APP              │
├─────────────────────────────────────────────────────────────────────┤
│ FULL DISCOVERY / REWARDS / COMPANY / LEGAL FOOTER                    │
└─────────────────────────────────────────────────────────────────────┘
```

The wireframe describes hierarchy, not approved replacement copy. Import the verified live content. Preserve all existing campaign and destination modules, even when the visual sequence changes. Signed-in users see membership context without losing public discovery routes.

Mobile: logo/menu/account in the header; heading, destination, dates, occupancy/rate summary, then search. Image and campaign follow the usable booking form. Do not hide occupancy and special rates behind an unlabeled icon. Keep lower-page information accessible without horizontal page scrolling.

## 5. Search results — compare before committing

Mode: Operate. Use the editable trip strip at top. Below it, place a 260px filter column, result rows and an optional map on wide screens. At intermediate widths, switch map into a separate view. On mobile, use list/map tabs and a clearly labeled filter button with applied count.

Each result row has a real photo, hotel/brand identity, location and distance, review summary, essential amenities, available-rate conditions, transparent price basis and one room-selection action. A save control is available when supported. Prices must distinguish per-night amount, stay total, taxes/fees and currency. Never use an estimated converted price as the final charge without labeling it.

All existing filter categories remain: availability, distance, rate, currency, price ceiling, amenities, brands and reviews. Show selected filters as removable rectangular tags. Include clear-all and an explicit apply action on mobile. Preserve filter state in the URL where it is non-sensitive.

Proposed interactions:

- Map pin and corresponding result highlight together; keyboard users get equivalent list access.
- Applied filters show a result count and can be undone individually.
- On filter changes, retain scroll context or announce the updated result region.
- No results offers a practical action: remove a filter, extend area, or edit destination/dates.
- Currency failure retains the last valid currency with a clear message.

Do not add unverified sorting modes as existing requirements. Preserve actual backend-supported modes after capture.

## 6. Hotel detail — editorial identity plus booking facts

Mode: Persuade transitioning to Operate.

Use a large title/address block, brand mark, review summary and a gallery laid out as one strong image plus smaller supporting frames. Provide an accessible gallery dialog with image captions, position count, previous/next controls and Escape-to-close.

Add an in-page contents bar: overview, rooms, amenities, policies, location, nearby places, FAQs and reviews where available. Use a sticky booking summary at desktop right; on mobile use a compact room-selection action that does not cover content.

Preserve every property-specific subsection. Policies must remain discoverable before room selection. Nearby places keep category, name, distance, units, description and links. Do not flatten dining, transport and attractions into an image carousel that discards detail.

The original property IDs are canonical data keys. Brand or city slugs may change; the property identifier should remain stable in route mapping.

## 7. Room selection and checkout

Room selection uses clear repeated rows with photo, beds, occupancy, amenities and an expandable rate comparison. Compare rates vertically with consistent columns for eligibility, refundability, payment timing, total and selection. Keep member rates and points routes distinct.

Rate changes must warn when previous choices will reset. Multi-room booking must show which room is being selected and what remains. Sold-out or stale inventory must return the traveler to a useful selection state.

Checkout is a required but unverified source screen. Proposed structure:

1. Guest/contact details.
2. Stay and room confirmation.
3. Payment/guarantee and applicable wallet or points choices.
4. Itemized price and cancellation/deposit terms.
5. Explicit final booking action and confirmation.

This is a proposal to validate against the existing checkout, not a verified field list. Backend rules determine deposits, cancellation deadlines and eligible payment methods. Never fake a successful reservation in production. A prototype must clearly label simulated confirmation.

After success, show confirmation reference, hotel/contact, dates, guests, room/rate, amount/payment status, cancellation deadline and manage-reservation entry. Do not invent receipt/download/calendar actions as existing features; they can be optional additions after source verification.

## 8. Account overview and navigation

Mode: Operate. Use a stable left rail on desktop and a labeled account-section selector on mobile. Main headings and section boundaries can be bold; tables and forms should stay calm.

Overview has three primary pieces: membership summary, next stay and points/tier progress. Then wallet, eligible offers, and earning/redemption pathways. Avoid decorative charts when a number and a progress indicator communicate better.

Show account number masked by default with a deliberate reveal/copy control as a proposed improvement. Use synthetic values in screenshots and prototypes. Do not place personal account data in public JSON, static generation, analytics labels or source-control fixtures.

### Profile layout

```text
ACCOUNT NAV       PROFILE & PREFERENCES
                  ┌──────────────────────────────────────────┐
Overview          │ Personal information                     │
Trips             ├──────────────────────────────────────────┤
Wallet            │ Addresses      [ADD ADDRESS]             │
Profile           │ Address blocks / type / primary / edit   │
Activity          ├──────────────────────────────────────────┤
Messages          │ Login details  email / password          │
Saved items*      ├──────────────────────────────────────────┤
                  │ Contact        phone rows / type / add   │
                  ├──────────────────────────────────────────┤
                  │ Communications / earning / travel        │
                  │ Interests / eligible rate programs       │
                  └──────────────────────────────────────────┘
                  Unsaved changes         [CANCEL] [SAVE]
```

*Saved-item implementation depends on confirming the existing favorites surface.

### Profile interaction requirements

| Area | Proposed redesign | Preserve / verify |
|---|---|---|
| Personal name | Readable identity block; support route if editing is unavailable | Do not invent direct name editing |
| Address | Compact address blocks with primary indicator; focused add/edit panel | Country-dependent fields; original primary/type behavior |
| Email | Dedicated form with its own save state and confirmation | Existing independent save semantics |
| Password | Dedicated password section, visibility switch and requirements | Existing credential rules; never prefill passwords |
| Phones | Repeatable rows, explicit type and validation | All five observed phone types |
| Communications | Provider-compatible dialog, meaningful loading/error/retry | Iframe internals unresolved; do not replace consent model blindly |
| Earnings | Radio group; reveal required partner identifier only for partner choice | Live conditional rules need verification |
| Travel/interests | Radio purpose selection plus checkbox groups | Preserve all observed interest options |
| Rate programs | Checkbox group with explanation/conditional IDs | Preserve eligibility and actual code validation |
| Save | Persistent unsaved-change bar for the main form | Keep email/password actions separate |

Saving must disable duplicate submission, retain edits on recoverable failure, identify invalid fields and announce success. Navigation away from unsaved edits should offer discard or return. Do not autosave communication consent or credentials merely because the new interface supports it.

### Wallet

Keep current/expired/used tabs and type/amount/expiry sorting. Render wallet entries as crisp rectangular vouchers with clear value, currency, expiry and eligibility. Use a neutral empty state and one add action.

The add dialog retains the two verified variants: gift-card identifier + PIN, or award identifier + sequence + PIN. Mask sensitive values. Show field-level errors and distinguish invalid data from service failure. Confirm success from the server. Preserve return focus on close. The redesign must not imply that gift cards replace a required booking guarantee.

### Reservations

Keep upcoming/past/cancelled tabs. Proposed populated rows show property, dates, occupancy, status and authorized actions. Highlight cancellation deadlines beside the action, not in a distant tooltip. A destructive booking action needs a clear review of consequences. The actual row data and available actions must be confirmed with a suitable source reservation.

### Activity and messages

The inspected account rendered no useful activity records and no populated messages. Proposed activity uses date, description, points change and status columns, with source-supported filtering and a missing-points help link. Proposed messages use a subject/date list and readable detail. Both need loading, empty, error and session-expired states. These are proposals pending populated-data inspection.

## 9. Rewards, offers and redemption pages

Rewards landing: use a strong blue/yellow membership introduction followed by a real comparison table. Keep all five tiers, qualifications, bonuses, exceptions and effective dates. On mobile, allow choosing two tiers to compare while retaining access to the complete table and footnotes.

Offers hub: use editorial offer rows with category, headline, real benefit, audience, expiry/eligibility and action. Proposed filters can separate member, partner, regional and booking offers, but must not hide any existing offer page. Campaign pages share a template that includes registration state, dates, terms and existing search entry.

Registration states: logged out, eligible but unregistered, submitting, registered, already registered, expired, not eligible, conflicting offer and service failure. Only label a state as existing after source verification; support all required backend outcomes in implementation.

Redemption: organize the six existing categories in a clear directory, then retain country eligibility, sorting, denominations, quantity, details, pagination and cart. Display point cost beside every option. Proposed insufficient-balance guidance shows the gap without allowing a false redemption success. Changing a country or denomination must recalculate eligible inventory and cost rather than reusing stale values.

Gift cards: use a small task selector for buy digital, buy physical, check balance and manage/reload. Currency choice belongs before the external handoff. Keep purchase methods, FAQs and terms visible. External checkout remains an explicitly identified destination.

Status match: a concise explanation, requirements list, region-specific contact path and full terms. Do not invent an upload form when the existing process uses email.

Business and planner programs: preserve program benefits, eligibility, enrollment destinations, contacts and FAQs in a professional editorial layout using the same brand colors.

## 10. Remaining page families

| Page family | Layout | Interaction / content protection |
|---|---|---|
| Destination directory | Large heading, region/country index, structured destination links, themes | Searchable directory as enhancement; every source link remains reachable |
| Destination detail | Local photo, introduction, local hotel results, travel sections | Keep all editorial body and geographic relationships |
| Theme pages | Strong topic heading, authentic imagery, relevant hotels and guide | Preserve specific topic content, restrictions and related links |
| Brand portfolio | Logo-led directory with family/category groups | Optional filter; never omit a brand because it lacks imagery |
| Brand detail | Brand identity, image, positioning, features, hotel discovery | Official logos and brand distinctions remain intact |
| Group booking | Three clear choices: rooms, rooms+space, space only | Keep group-ID lookup and small/large-group split |
| Travel professionals | Task-first index and reading sections | All professional programs, IATA guidance, contacts and registration links |
| Customer support | Task selector, contact channels and searchable FAQ | Reservation, Rewards, guest-service and corporate paths remain |
| FAQs | Clear questions and expanding answers with deep links | Answers searchable even when collapsed; no content lost in accordion conversion |
| Corporate/about | Editorial reading layout and evidence-led company information | Preserve hierarchy and real company content |
| Leadership | Directory and individual biography template | Preserve each person's actual biography and portrait |
| Press | Chronological archive with year/category navigation | Keep all article URLs, dates, media assets and body content |
| Affiliate | Program explanation, requirements, FAQ and partner handoff | Keep actual commission terms; avoid unverified revenue claims |
| Legal | Wide margins, readable column, section contents, effective date | Full approved legal text retained; no marketing simplification |
| Accessibility | Statement, assistance and feedback channels | Forms work with keyboard and assistive technology |
| Error/expired page | Plain explanation plus useful recovery routes | Preserve old URL handling; never silently show an unrelated campaign |
| External services | Clear descriptive link and destination | Preserve provider-owned flows and context |

## 11. Reusable interactive components

| Component | Required states and behaviors |
|---|---|
| Header/menu/account drawer | Closed/open, signed out/in, active location, keyboard navigation, focus return |
| Itinerary editor | Valid/incomplete, destination suggestions, dates, guests, rate code, applying, error |
| Date picker | Keyboard traversal, valid range, disabled dates, month change, selected range, manual entry |
| Occupancy editor | Add/remove rooms, adult/child counts, conditional ages, limits and help |
| Result row/map | Loading, available, unavailable, selected, saved, hover/focus correspondence |
| Filters | Applied state, count, clear one/all, mobile apply/cancel, no results |
| Photo gallery | Loading/error, next/previous, captions, keyboard, close and focus return |
| Rate comparison | Expanded/collapsed, selected, unavailable, changed price, eligibility restrictions |
| Tabs | Correct selected state, arrows/Home/End where appropriate, active panel association |
| Dialog | Label, focus trap, Escape when safe, cancel, error, loading, success |
| Form section | Pristine/dirty, submitting, invalid, server failure, success, session expired |
| Wallet voucher | Current/expired/used, value/currency, linked reservation where supported |
| Offer | Active/upcoming/expired, registered/eligible/unavailable, terms link |
| Accordion | Expanded/collapsed, deep-linkable heading, keyboard operable |
| Feedback | Inline validation and live-region updates; no toast-only critical errors |
| Pagination | Current/disabled/loading, stable item order, preserved filters |

## 12. Motion and interaction tone

Motion should clarify changes rather than delay tasks. Use 120–180ms button/selection transitions, 180–240ms panels, and minimal travel distance. A hard-shadow button can depress by 2px on press; the shadow shrinks with it. Tab selection uses a moving blue rule or instant yellow fill. Avoid rubbery bouncing, rotating headlines, auto-advancing offer carousels and large scroll-linked parallax.

Support reduced motion: remove translation and animated scrolling, retain immediate feedback. Never animate price values through intermediate numbers or suggest an unverified countdown deadline.

## 13. Responsive and accessibility requirements

Target layouts at 390px, 768px, 1024px and 1440px; also verify 320px and 200% zoom. A 390px mockup is not proof of universal responsiveness.

- Content order stays meaningful in the DOM; visual grid changes do not scramble keyboard order.
- Search and checkout are fully operable with keyboard, including date and occupancy pickers.
- Maintain labels, helper text, required indicators and field-specific errors; placeholders are supplementary.
- Provide skip navigation, landmarks, heading order and descriptive links.
- Use text with icons and color for status. Preserve visible focus on blue/yellow/white.
- Touch targets should be approximately 44px or larger; separate adjacent actions.
- Tables may scroll inside their own labeled container; the whole page must not overflow horizontally.
- Mobile sticky bars respect safe areas, keyboard visibility and content padding.
- Gallery and map have non-visual alternatives. Maps never replace hotel lists or written addresses.
- Authentication expiry returns users to the interrupted task after login, preserving safe non-sensitive selections.

Aim for WCAG 2.2 AA during implementation and test the actual rendered components. This specification does not certify compliance.

## 14. Content fidelity and implementation architecture

Recommended structure: a route manifest, structured content collections, reusable page templates and separate authenticated/live services. The framework remains undecided. Do not adopt a framework solely because a component library provides attractive demos.

Templates: home; search; hotel; rooms; checkout; confirmation; destination index/detail; theme; brand index/detail; offer index/detail; Rewards marketing; enrollment; account overview; profile/address; wallet; trips; activity; messages; redemption/catalog/cart; support/FAQ/form; professional program; corporate/leadership; press index/article; legal; error/expired; external handoff.

Each route record should point to the template and its own content record. Every section needs a stable source ID, destination component, copy/asset provenance and verification status. Dynamic rates, availability, member points and reservations must come from the appropriate service. Prototype data must be labeled and isolated.

The installed 21st plugin may help find or adapt React components in a later build. Its output must follow this design system and preserve source behavior. Generic generated content must not replace hotel details, legal terms, account values or offer conditions. Installing a component library does not settle the project stack.

## 15. Proposed build order

1. Close content gaps: validate the route register, obtain complete property/editorial content, document remaining authenticated and booking states.
2. Establish color/type/layout tokens and shared shell; build the trip editor and accessible form primitives.
3. Implement the core booking journey with real data contracts or clearly labeled fixtures.
4. Implement Rewards and account pages, including all profile and wallet variants.
5. Build destination, brand, offer, support, professional and corporate templates; migrate every retained content record.
6. Preserve external handoffs, legal bodies and redirect mappings.
7. Verify content parity, keyboard/mobile behavior and actual integration outcomes.

## 16. Acceptance checklist

### Content and routes

- [ ] Every retained source URL has a target page, deliberate redirect, or explicit external handoff.
- [ ] Every unique source body is imported and reviewed; template completion is not counted as instance-content completion.
- [ ] All header, account and footer entries are reachable on desktop and mobile.
- [ ] Hotel photos, descriptions, amenities, policies, FAQs and nearby information are complete per property.
- [ ] Offer conditions, dates, registration states and legal footnotes are preserved.
- [ ] No old campaign, placeholder price or fabricated review is presented as current.

### Booking and membership

- [ ] Destination/dates/guests/rate survive navigation and edits.
- [ ] Filters, currency, unavailable inventory and stale rates have meaningful outcomes.
- [ ] Checkout validates eligibility, price and policy before final submission.
- [ ] Profile retains every observed section and independent email/password save actions.
- [ ] Address and phone variants, communication provider, earnings and rate-program conditions are verified.
- [ ] Wallet supports both verified item forms and accurate server outcomes.
- [ ] Empty account screens are distinct from loading and service failures.
- [ ] Populated trips, messages, activity and favorites are verified before declaring parity.

### Design and accessibility

- [ ] Observed blue/yellow identity is retained throughout.
- [ ] Brutalist geometry is consistent, while long reading and transactional tasks remain clear.
- [ ] Keyboard, focus, screen-reader announcements and reduced motion work.
- [ ] No unintended page overflow at mobile widths or zoom.
- [ ] Images are responsive and appropriately sized; below-fold images defer loading.
- [ ] Public pages have titles, canonical routes, useful headings and meaningful metadata.
- [ ] Signed-in data is private and excluded from public caches.

### Completion boundary

These two documents provide a detailed implementation brief and a substantial URL inventory. They do not yet establish exhaustive source-content parity. The inventory's unresolved rows and authenticated/checkout gaps are required follow-up evidence, not optional omissions.
