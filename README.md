This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

## Hosting

This site is hosted on [Vercel](https://vercel.com) with [Neon](https://neon.tech) providing the PostgreSQL database.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.


Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
northeast/
├── src/
│   ├── app/                 # Next.js App Router directory
│   │   ├── layout.tsx       # Shared layout
│   │   ├── page.tsx         # Homepage ("/")
│   │   ├── about/           # About page ("/about")
│   │   ├── api/             # API routes ("/api/*")
│   │   │   ├── hello/route.ts  # API example
│   ├── lib/                 # Business logic & services
│   │   ├── database.ts      # Database connection (e.g., Prisma, MongoDB)
│   │   ├── auth.ts          # Authentication logic
│   │   ├── userService.ts   # User-related API calls
│   ├── components/          # UI components
│   ├── styles/              # CSS files
├── public/                  # Static assets
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript config
└── package.json             # Dependencies
### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values.

- `POSTGRES_URL` – your Vercel Postgres connection string.
- `SMTP_EMAIL` – email account used to send and receive contact form notifications.
- `SMTP_PASSWORD` – password or app password for the SMTP account.
- `SMTP_HOST` – SMTP server host (e.g. `smtp.gmail.com`).
- `SMTP_PORT` – SMTP server port (e.g. `587`).
