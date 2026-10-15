# Best Western Plus Tejvivaan · Glass design system

## Direction
A single-property hotel discovery and booking companion, rebuilt from the source site at bestwesternplustejvivaan.com. Ruby-toned liquid glass defines every interactive surface: translucent rose and pearl panels, double white edge highlights, soft cranberry-tinted depth, background blur and warm charcoal text. The interface must remain readable over its blush-to-pearl ambient background.

The user-supplied Lycoris hero keeps its exact six-scene composition, Federant lettering, WebGL red-chrome flower, camera motion, shaders and scroll timeline. Only the text and primary destination express Tejvivaan. Controls for pause, skip and booking remain visible. The glass site begins below and around this unchanged hero.

## Palette and materials

- Canvas: warm pearl and rose gradients (`#f0dfe4`, `#d9b9c3`, `#f6eaed`).
- Glass: translucent pearl/rose panels (`rgba(247,228,234,.54)`), backdrop blur 28px and modest saturation.
- Edges: fine white hairline (`rgba(255,255,255,.76)`) with inset white upper highlight.
- Ink: warm charcoal (`#38272d`); secondary ink (`#715660`).
- Ruby (`#8e2345`) is used for primary actions and selected states; pale rose glass carries the ambient tint.
- Depth is broad and soft, offset beneath floating surfaces. Do not use brutalist block shadows.
- The deep ruby glass footer is an inverse glass surface.

## Typography and layout
Noto Sans for navigation, body copy, forms and data; Literata for hotel editorial headings. Keep 65–70 character reading measures, stable line-height and visible full text. Main content caps at 1280px. Page hero, photo-led rooms, alternating restaurant profiles, event capacity comparison, image gallery and compact local guest profile adapt into a single-column mobile layout below 600px.

## Components
`src/tejvivaan/Layout.tsx` supplies the glass navigation and footer. `src/tejvivaan/components.tsx` supplies shared actions, hero headings, reveals and local saved-hotel behavior. `src/tejvivaan/data.ts` is the source-attributed property catalogue. `src/tejvivaan/pages/` holds separate lazy-loaded page groups. `src/tejvivaan/DemoFeatures.tsx` and existing Account components hold the local guest profile. `LinearCard` provides the sourced live-card preview interaction with a native dialog. All public cards, menus, galleries, forms, filters, profile panels and dialogs inherit the glass material. Native links continue to official booking, maps, phone, email and source terms.

## Motion and accessibility
Existing flower animation is preserved. Room photography uses a restrained hover zoom, gallery lightbox provides arrow keys, gallery filters and event setup selection update visibly, section reveals animate once in view, nav menus open by pointer and keyboard, and skip control pauses or skips the flower. Respect reduced motion for site motion, preserve keyboard focus, avoid clipping text, use 44px interactive targets and provide descriptive image labels. Glass and gradient surfaces must maintain accessible contrast.

## Implementation references
- Source screenshots and verified content: `03-tejvivaan-site-inventory.md`.
- Product behavior: `PRODUCT.md`.
- Property theme and responsive styles: `src/tejvivaan.css`.
- Page architecture: `src/TejvivaanApp.tsx` and `src/tejvivaan/pages/`.
- Existing flower source: `src/components/ui/lycoris-specimen.tsx`.
- Asset sources: `ASSETS.md`.
