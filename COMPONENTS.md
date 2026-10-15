# Component setup

This Vite application already uses React and TypeScript. Tailwind CSS v4 and the shadcn project configuration are now installed.

- Reusable UI components: `src/components/ui/`, imported with `@/components/ui/...`.
- Main existing stylesheet: `src/styles.css`.
- Tailwind entry and shadcn color tokens: `src/tailwind.css`.
- Component motion styles: `src/components/ui/gradient-card-showcase.css`.
- Shared card expansion: `src/components/ui/linear-card.tsx` and `linear-card.css`.
- Glowing member identity: `src/components/ui/award-badge.tsx` and `award-badge.css`.
- Hover navigation: `src/components/ui/navbar-menu.tsx` and `navbar-menu.css`.
- Class merging helper: `src/lib/utils.ts`.

`src/components/ui/` is the source-root equivalent of `/components/ui`. Keeping reusable components here allows pasted shadcn/21st components to use their expected imports. `components.json`, TypeScript paths and the Vite alias all point to this folder, so a second top-level components directory is unnecessary.

## Supplied interactive components

`LinearCard` adds an explicit Quick view action to hotel, room, booking, account, Rewards, brand and editorial content cards. It animates the live card into a native dialog and back. Its stable React portal preserves form values and event handlers; form ownership is retained when a section is expanded. Escape, a visible close button, focus return and reduced motion are supported. Navigation links, decorative hero imagery and compact navigation items keep their existing purpose.

`GlowingProfileCard` adapts the supplied AwardBadge light layers and pointer tilt to the saved member name and an initials avatar. It is a centered, landscape card above the account dashboard, with a horizontal avatar/name arrangement on small screens too. No avatar photo or upload service is implied. Glow pauses on demand, offscreen, in hidden tabs and under reduced-motion preferences.

`NavbarMenu` adapts the supplied navbar-menu component to React Router links instead of Next.js. The five navigation groups reveal relevant page links on desktop pointer entry or keyboard focus. Arrow Down enters a panel; Escape returns to its trigger. Mobile uses tap-to-expand groups in the existing menu. Dropdowns retain the blue-and-white palette, square borders and solid shadows. Existing `framer-motion` supplies the animation; no additional runtime dependency is needed.

## Adding components later

From this directory, run `npx shadcn@latest add <component-name>`. The project is already configured; running `init` again is unnecessary. Review generated styles to keep the existing blue-and-white theme and square controls.

Tailwind utilities use the `tw:` prefix (for example `tw:relative`, `tw:hover:opacity-100`). Preflight is omitted because the existing application already owns resets, typography, forms and button styling. If integrating a pasted unprefixed Tailwind component, prefix its utility classes and translate any custom utilities into scoped styles. The gradient-card showcase does this while retaining actual hotel content and existing links instead of the reference's placeholder cards.

To reproduce dependencies in another checkout: `npm ci`, then `npm run dev`. Check the production build with `npm run build`.

Setup follows the official [Tailwind Vite guide](https://tailwindcss.com/docs/installation/using-vite), [Preflight integration guidance](https://tailwindcss.com/docs/preflight#disabling-preflight), and [shadcn Vite guide](https://ui.shadcn.com/docs/installation/vite).

# Current Tejvivaan architecture

The active site uses the silver-blue liquid-glass system in `DESIGN.md` and `src/tejvivaan.css`. Public page modules live under `src/tejvivaan/pages/`, with shared layout/actions and verified property content in `Layout.tsx`, `components.tsx` and `data.ts`. The supplied six-scene WebGL flower remains at `src/components/ui/lycoris-specimen.tsx`. One booking URL in the property data serves all official-booking links. The earlier account/profile features and LinearCard interaction remain inside the locally labeled demo shell.

The previous global Best Western component catalogue below describes earlier work that is no longer the active public experience.
