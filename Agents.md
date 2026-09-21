# Agents Guide

This repository is a Vite + React + TypeScript wedding invitation site for Sanchi Gupta and Sarthak Kaushik. Treat it as a polished, event-specific frontend rather than a generic app scaffold.

## Project Shape

- Entry point: `src/main.tsx`
- App composition: `src/App.tsx`
- Central content source: `src/data/weddingData.ts`
- Active global styling and Tailwind theme: `src/index.css`
- Public visual assets: `public/`
- Main UI sections: `src/components/`
- Small shared hooks: `src/hooks/`

`src/main.ts`, `src/style.css`, `src/counter.ts`, and some files in `src/assets/` appear to be leftover Vite starter code. The live app imports `src/main.tsx` from `index.html`, so do not extend the starter files unless you are intentionally cleaning them up.

## Commands

Use npm scripts from `package.json`:

```bash
npm run dev
npm run build
npm run preview
```

There is no test or lint script currently. For verification, run `npm run build` after code changes. It runs `tsc && vite build`, so it catches TypeScript errors including unused locals and parameters.

## Implementation Conventions

- Prefer React function components with TypeScript.
- Keep user-facing wedding details in `src/data/weddingData.ts` when possible instead of scattering names, dates, venue, phones, and copy across components.
- Use Tailwind utility classes and the custom theme tokens from `src/index.css`: `ivory`, `ivory-light`, `maroon`, `maroon-dark`, `gold`, `brown`, `font-display`, `font-script`, `font-serif-caps`, and `font-sans`.
- Use `framer-motion` for existing animation patterns and `lucide-react` for icons.
- Preserve the current visual language: ivory backgrounds, maroon/gold accents, classical serif typography, refined borders, and restrained ornamental details.
- Components are generally self-contained sections with `aria-label` on the section.
- Below-the-fold sections are lazy-loaded in `src/App.tsx`; keep heavy new sections lazy if they are not needed for the first viewport.

## Content And Assets

- Hero imagery is loaded from `public/sunny-sky.jpg` and `public/temple.png`.
- The music toggle expects an optional `public/music.mp3`; it should fail gracefully when the file is absent.
- Open Graph metadata references `/og-image.jpg`, but that asset is not present in the current tree. Add it if social previews matter.
- Some source files contain intentional non-ASCII text and symbols. Preserve UTF-8 encoding when editing. PowerShell output may display mojibake even when the file contents are intended to be Unicode.

## Accessibility And UX Expectations

- Keep interactive elements keyboard accessible with visible focus states.
- Preserve or improve existing ARIA labels, timer semantics, carousel labels, and button labels.
- Respect reduced motion. The hero already uses `useReducedMotion`; use the same idea for substantial new motion.
- Avoid auto-playing media. The current music control starts only after user interaction.
- Check mobile layouts carefully. Many sections use tight ornamental layouts that can overflow if copy grows.

## Styling Notes

- Tailwind v4 is configured through `@tailwindcss/vite` and `@theme` in `src/index.css`; there is no separate `tailwind.config.js`.
- The active app imports only `src/index.css`.
- Avoid introducing a second styling system unless the project is being intentionally refactored.
- Keep cards and sections visually consistent with the existing flat invitation style. Avoid marketing-page hero patterns or unrelated decorative flourishes.

## Safe Change Checklist

Before handing off a change:

1. Run `npm run build`.
2. Confirm any changed wedding details are centralized in `weddingData.ts` unless there is a good reason not to.
3. Verify responsive behavior for changed sections.
4. Check that imports are used; TypeScript is configured with `noUnusedLocals` and `noUnusedParameters`.
5. If adding assets, prefer `public/` for files referenced by URL paths like `/asset-name.ext`.

## Known Cleanup Opportunities

- Remove or archive unused Vite starter files if desired: `src/main.ts`, `src/style.css`, `src/counter.ts`, `src/assets/vite.svg`, `src/assets/typescript.svg`, and possibly `src/assets/hero.png`.
- Decide whether to include `WishesWall` in `src/App.tsx`; the component exists but is not currently rendered.
- Add `public/music.mp3` if the music button should actually play audio.
- Add `public/og-image.jpg` for the social preview metadata.
