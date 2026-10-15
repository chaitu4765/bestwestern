# Asset provenance

## Latest additions

- The active homepage uses the **ImageStreamHero** source pasted by the user, adapted into `src/components/ui/image-stream-hero.tsx`. Its geometric depth/rail algorithm is preserved, with square blue borders and existing hotel photos. Utility class names were translated to project CSS instead of introducing a second styling system. Pause, offscreen/hidden suspension and a frozen reduced-motion composition were added. The earlier 21st dynamic hero remains a reference; it is no longer rendered.
- Best Western Ashoka exterior: https://www.wedmegood.com/wedding-venues/Best-Western-Ashoka-746808 . Official property source: https://www.bestwestern.com/en-us/book/hotel/hyderabad/best-western-ashoka/76963
- Best Western Tirupati exterior: https://in.trip.com/hotels/tirupati-hotel-detail-3563594/best-western-tirupati/ . Official property source: https://www.bestwestern.com/en_US/book/hotels-in-tirupati/best-western-tirupati/propertyCode.76579.html
- Official directory checked: https://www.bestwestern.com/en_US/sitemap.html . Additional properties are explicitly categorized as **Further afield**, in Hyderabad and Tirupati, following the user's approval. Neither is represented as a nearby Visakhapatnam property.

Remote reference photographs are used for this private local prototype, not bundled or claimed as licensed production assets. Replace with approved assets before public release.

| Asset | Origin | Use |
|---|---|---|
| Rushikonda coastline | https://www.clubmahindra.com/blog/travel-news/visakhapatnams-rushikonda-beach-regains-prestigious-blue-flag-certification | Homepage and destination |
| Tejvivaan exterior | https://www.goibibo.com/hotels/best-western-plus-tejvivaan-hotel-in-visakhapatnam-4167781876282797210/ | Hotel card/detail |
| Ramachandra exterior | https://www.bestwestern.se/hotell/best-western-plus-ramachandra-76564 | Hotel card/detail |
| Tejvivaan king room | https://www.bestwesternplustejvivaan.com/ | Room list/gallery |
| Tejvivaan twin room | https://www.bestwestern.no/hotell/best-western-plus-tejvivaan-76993 | Room list/gallery |
| Tejvivaan room interior | https://www.bestwesternplustejvivaan.com/blog.php | Room gallery |
| Ramachandra guest room | https://www.bestwestern.com/en_US/book/hotels-in-vishakhapatnam/best-western-plus-ramachandra/propertyCode.76564.html | Room list/gallery |
| Ramachandra room interior | https://www.tripadvisor.at/Hotel_Review-g297588-d2515442-Reviews-Best_Western_Ramachandra-Visakhapatnam_Visakhapatnam_District_Andhra_Pradesh.html | Room gallery |
| Ramachandra suite | https://www.wotif.com/Visakhapatnam-Hotels-Best-Western-Ramachandra.h4869519.Hotel-Information | Room gallery |

Image URLs are in src/data.ts, src/App.tsx and src/RoomGallery.tsx. No raster images were generated. Icons are from lucide-react. The header brand treatment is prototype text, not a supplied official logo asset. Room photographs are property references, not guaranteed assignments to the demo room categories; this is stated in the gallery.

## 21st reference
Booking Calendar, component 25156 by cnippet-dev: https://21st.dev/@cnippet-dev/components/v-calendar-15

Retrieved with the installed 21st CLI. The check-in/check-out, minimum next-day checkout and nights-summary pattern was adapted into native date controls in src/Booking.tsx. No hosted AI generation was used. Source response retained in 21st-booking-reference.json.

Smooth Scroll Hero, component 2061 by ishamsu: https://21st.dev/@ishamsu/components/smooth-scroll-hero

Source retrieved and retained in `21st-hero-reference.json`. `src/DynamicHero.tsx` adapts its Framer Motion scroll-progress-to-image-transform approach into the existing split hero, with three photo scenes, manual controls, pause, hidden/offscreen suspension and reduced-motion support.

The requested 21st shader search found Waves (27251, amir24p). Its source retrieval was blocked by the account's daily two-retrieval limit. `21st-shader-reference.json` records that response. `src/WaveShader.tsx` is an **original local GLSL implementation**, not downloaded 21st shader code. It provides restrained blue wave lines, caps rendering to approximately 30 fps and one device pixel per CSS pixel, pauses when hidden/offscreen, follows the hero pause/reduced-motion state, and leaves a solid blue fallback if WebGL is unavailable.

## Supplied animated footer (14 October 2026)
`src/components/ui/beam-wordmark-footer.tsx` adapts the user's pasted BeamWordmarkFooter component, attributed in its source to Kedhar / Night Shift on 21st.dev. The implementation retains its pointer-responsive light beam and letter animation. The site adaptation uses blue and white, existing navigation, client-side routes and privacy preferences. The intentional bottom crop and dark wordmark fade are removed; full letter height and animation clearance are reserved.

## Supplied skew-card animation (14 October 2026)
`src/components/ui/gradient-card-showcase.tsx` adapts the SkewCards / gradient-card-showcase code pasted directly by the user. It wraps the homepage's existing Tejvivaan and Ramachandra cards, preserving their photos, hotel information, illustrative rates, favorites and detail links. The adaptation uses blue/pale-blue panels, square edges, transform-based motion and bounded floating-square animation. No new image assets were added.

## Supplied Linear card and AwardBadge animations (14 October 2026)
`src/components/ui/linear-card.tsx` adapts the card-to-dialog animation from the user's attachment `1826ea18-934c-49c9-9c5b-659179078c0f/Pasted text.txt`. It uses the installed Framer Motion package and native dialogs while preserving live card state.

`src/components/ui/award-badge.tsx` adapts the layered SVG glow and pointer tilt from attachment `b9d3e5c6-3023-4ae3-a2ed-1e841fa945e4/Pasted text.txt`. Product award labels and gold colors are replaced with the local member's name, a generated initials avatar and blue/white light. The user requested a centered landscape layout. No personal photograph was supplied or inferred.

## Supplied hover navigation (14 October 2026)
`src/components/ui/navbar-menu.tsx` adapts the user-supplied navbar-menu reference in attachment `77787721-38e5-44c1-a9a9-306f65bfc161/Pasted text.txt`. It retains animated hover panels, replaces Next.js imports with React Router, and adds keyboard and mobile disclosure behavior. Product demo links and images are replaced with implemented site routes and the existing hotel photographs listed above. No external component source or new imagery was downloaded for these three adaptations.

## Active Tejvivaan property site

- Hotel identity, rooms, restaurant, events, gallery, offer-board, nearby attractions and journal photos are served from `https://www.bestwesternplustejvivaan.com/images/`, including its `restaurant/`, `banquets/`, `gallery/`, `offer/`, `blog/` and `menu/` subfolders. Paths and labels are centralized in `src/tejvivaan/data.ts`. Current room images: `superiorooms.jpg`, `deluxeroom.jpg` and `suiteroom.jpg`.
- The canonical official booking destination supplied by the user is `BOOKING_URL` in `src/tejvivaan/data.ts`. All property booking buttons link directly there.
- The red-chrome flower, camera/shader and six-scene scroll sequence are the user's supplied hero from `6a7f0da7-1f7a-45d1-a14f-67e5c6d32f68/Pasted text.txt`, adapted at `src/components/ui/lycoris-specimen.tsx`. Tejvivaan copy and the booking link were adapted; flower geometry and animation behavior remain intact.
- The user supplied `codex-clipboard-824abb0c-213b-4742-806f-5cb0bea0c8ef.png` as cool silver-blue liquid-glass reference. CSS implements translucent slate and pearl surfaces with hairline white edges, soft depth, and backdrop blur.
- Literata and Noto Sans are loaded from Google Fonts. The hero's original Federant display face is loaded by the supplied component. Icons use `lucide-react`. No new raster imagery was generated.
- Gallery categories describe groups of hotel photographs; individual source alt descriptions are not all independently verified. Promotional designs are published hotel posters, not confirmed-current offers.
- Hotel photographs are remotely hosted source-site assets in this private demo. Confirm reuse permissions before public deployment.
