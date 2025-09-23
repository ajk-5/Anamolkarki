Games & Tools Export

What’s included
- src/app/games: 2048, Tetris, MetroTrade routes
- src/app/tools: World Clock, QR Code Generator, Typing Practice
- src/components/metrotrade: MetroTrade UI
- src/hooks/metrotrade, src/hooks/useMetroStore.ts: MetroTrade store
- src/styles/metrotrade: styles for MetroTrade UI
- lib/metrotrade: game engine, types, constants
- src/components/QrMaker.tsx (+ .module.css): QR generator
- src/components/PrefetchLink.tsx: lightweight Link wrapper
- public/images: icons (2048.png, tetris.png, metrotrade.png)

How to use in another Next.js app
- Copy the contents of this folder into the root of your project.
- Ensure your project supports `app` directory under `src` (or move `src/app` to `app`).
- Add dependencies: `npm i qrcode zustand immer`.
- Configure TS/JS path alias so `@/` maps to your project root. Example tsconfig.json:

  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["*"]
      }
    }
  }

Notes
- PrefetchLink uses `next/navigation` and is optional; you can replace with `next/link` if preferred.
- MetroTrade uses Zustand + Immer; no server APIs required.
- QR tool uses the `qrcode` package only (client‑side). 

