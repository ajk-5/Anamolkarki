import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "90sTimes (The Nineties Times) — Project",
  description:
    "The Nineties Times is a 90s-themed content platform that blends a retro magazine experience with quizzes, a pop-culture vault, arcade games, cocktails, weather, and crypto pages.",
};

const LIVE_SITE_URL = "https://www.90stimes.com";
const API_URL = "https://server.90stimes.com";

const featurePillars = [
  {
    title: "A 90s “time capsule” magazine",
    description:
      "A nostalgic browsing experience built around editorials, themed categories, and shareable article pages.",
  },
  {
    title: "Community-first engagement",
    description:
      "Reactions, threaded comments, reporting, and notifications designed to keep readers coming back.",
  },
  {
    title: "Interactive “Vault” + quizzes",
    description:
      "Shows/films/music/games entries with trivia and quiz runners that feel like a playable 90s archive.",
  },
];

const visitorHighlights = [
  {
    title: "Discover content fast",
    points: [
      "Browse categories like Entertainment, Technology, Sports, and Info.",
      "Search with simple and advanced (paged) filters.",
      "Find what’s hot with a Trending feed powered by views, reactions, and comments.",
      "Keep reading with “Related articles” recommendations.",
    ],
  },
  {
    title: "Play and explore the 90s",
    points: [
      "Vault entries for shows/films/music/games with trivia cards.",
      "Show pages that bring metadata, trivia timelines, and quizzes together.",
      "Multiple quiz types (trivia, who-said-it, finish-the-line) with timing, difficulty, and scoring.",
    ],
  },
  {
    title: "Extras that boost retention",
    points: [
      "Arcade mini-games built for quick, fun sessions.",
      "Weather pages with current conditions, forecast, and alerts.",
      "Crypto pages with market data and charts.",
      "A cocktail lounge with an age gate and recipe discovery.",
    ],
  },
];

export default function NinetiesTimesCaseStudyPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-14 lg:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-2xl backdrop-blur sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.16),transparent_45%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,0.12),transparent_40%),radial-gradient(circle_at_0%_90%,rgba(245,158,11,0.10),transparent_55%)]" />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Project spotlight
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl font-display">
            The Nineties Times <span className="text-sky-200">(90sTimes)</span>
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-200/85 sm:text-base">
            A retro, 90s-themed content platform that feels like opening a time
            capsule: editorials, quizzes, a pop-culture vault, arcade mini-games,
            a cocktail lounge, weather, and crypto pages—wrapped in a magazine
            experience people want to explore.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={LIVE_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Visit live site
            </a>
            <a
              href={API_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              API endpoint
            </a>
            <Link href="/projects" className="btn-ghost">
              Back to projects
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {featurePillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4 shadow-2xl"
              >
                <h2 className="text-base font-semibold text-white">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mt-10 grid gap-4 sm:gap-6 lg:grid-cols-3">
        {visitorHighlights.map((block) => (
          <div key={block.title} className="card-surface p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Highlights
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white font-display">
              {block.title}
            </h2>
            <ul className="mt-4 list-disc list-inside space-y-2 text-sm text-slate-300">
              {block.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Fresh content (marketing-first) */}
      <section className="mt-10 card-surface p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
          Fresh content
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white font-display">
          Always something new to open.
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
          Behind the scenes, 90sTimes has an admin back office and an AI-assisted
          publishing pipeline that helps keep the 90s vibe alive—without turning
          the site into modern “news” spam.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4">
            <h3 className="text-sm font-semibold text-white">AI writer</h3>
            <p className="mt-2 text-sm text-slate-300">
              Admins can request new 90s-focused articles and Q&amp;A content on
              demand.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4">
            <h3 className="text-sm font-semibold text-white">Scheduled series</h3>
            <p className="mt-2 text-sm text-slate-300">
              Recurring drops like “On This Day in the 90s” and “Blast From the
              Past” keep the archive feeling alive.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4">
            <h3 className="text-sm font-semibold text-white">AI quizzes</h3>
            <p className="mt-2 text-sm text-slate-300">
              Generate quizzes by topic and type, then publish instantly or save
              as drafts.
            </p>
          </div>
        </div>
      </section>

      {/* Technical notes (optional) */}
      <details className="mt-10 card-surface p-6 sm:p-8">
        <summary className="cursor-pointer select-none text-sm font-semibold text-sky-200 hover:text-sky-100">
          Show technical notes (optional)
        </summary>

        <div className="mt-6 space-y-8 text-sm text-slate-300">
          <section>
            <h3 className="text-base font-semibold text-white">Stack</h3>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Next.js 15 (React 19 + TypeScript) frontend (App Router)</li>
              <li>ASP.NET Core Web API (.NET 8) backend</li>
              <li>PostgreSQL database</li>
              <li>Docker + Docker Compose deployment</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white">Architecture</h3>
            <pre className="mt-3 overflow-x-auto rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4 text-xs text-slate-200">
{`Browser
  |
  |  HTTPS
  v
Next.js Frontend (WT4Q)
  - App Router pages (SSR/SEO)
  - Client components (comments, reactions, admin UI)
  - Route handlers (crypto/weather proxies, IndexNow key)
  |
  |  HTTPS (cookies, CORS)
  v
ASP.NET Core API (Northeast)
  - Controllers (REST)
  - Services (business logic, AI, scheduling)
  - Repositories (EF Core access patterns)
  - Background services (AI queue worker, scheduled series)
  |
  v
PostgreSQL`}
            </pre>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white">
              AI content system (details)
            </h3>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>
                Admin-triggered AI writer runs as background jobs (in-memory
                bounded channel + hosted worker) to avoid gateway timeouts.
              </li>
              <li>
                Resilience controls include a global rate limiter and
                cooldown/backoff behavior on 429 responses.
              </li>
              <li>
                Prompts require strict JSON output for safer parsing and
                validation.
              </li>
              <li>
                Scheduled series: “Jokes” (hourly), “On This Day in the 90s”
                (daily), “Blast From the Past” (daily).
              </li>
              <li>
                “On This Day” can pull 1990s-only events from Wikipedia’s REST
                feed and inject allowed facts.
              </li>
              <li>
                AI quiz generator uses a strict JSON schema and supports drafts
                or immediate publishing.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white">
              External APIs &amp; services
            </h3>
            <div className="mt-2 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Backend (.NET)
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Google Gemini REST (content + quizzes)</li>
                  <li>Wikipedia REST (“On this day”, topic summaries)</li>
                  <li>Google News RSS (optional ingestion pipeline)</li>
                  <li>ipinfo.io (IP → location, cached 24h)</li>
                  <li>Open-Meteo (current weather, UV, AQI)</li>
                  <li>Norwegian Met Institute (forecast + weather alerts)</li>
                  <li>IndexNow (search engine URL notification)</li>
                  <li>Wikimedia Commons API (optional image lookup)</li>
                  <li>SMTP (OTP + contact acknowledgements)</li>
                  <li>Google OAuth (sign-in/sign-up)</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Frontend (Next.js + browser)
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Binance API + WebSocket (tickers/klines, charts)</li>
                  <li>CoinGecko (market ranking + coin metadata)</li>
                  <li>TheCocktailDB (cocktail thumbnails)</li>
                  <li>OpenStreetMap embed (lightweight map view)</li>
                  <li>Google Analytics + AdSense (cookie-consent aware)</li>
                  <li>Social share endpoints (FB/X/LinkedIn/Reddit)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white">
              Data model (key entities)
            </h3>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>User accounts: User, Role, OTP</li>
              <li>
                Sessions/security: IdToken, RefreshToken, LoginHistory (rotating
                refresh tokens, hashed, revocable)
              </li>
              <li>Content: Article, ArticleImage, Category, ArticleType</li>
              <li>
                Engagement: Comment (threaded), LikeEntity (reactions),
                CommentReport, Notification
              </li>
              <li>
                Analytics: Visitors, PageVisit (supports the Trending ranking)
              </li>
              <li>Vault: Show, ShowTrivia, Quiz, QuizQuestion</li>
              <li>Bar: Cocktail, Ingridient, IngridientQuantity</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white">
              Security, privacy, and SEO
            </h3>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>JWT access tokens delivered via HttpOnly cookies.</li>
              <li>
                Refresh tokens stored in HttpOnly cookies and persisted as
                hashes, rotated on refresh, with revocation support.
              </li>
              <li>Role-based access policies (AdminOnly, SuperAdminOnly).</li>
              <li>
                Cookie consent UX: analytics and ads load based on saved
                preferences.
              </li>
              <li>
                Server-rendered pages (SEO) + sitemaps + IndexNow notifications.
              </li>
              <li>
                In-memory caching for IP geolocation, weather responses, and
                transient AI JSON outputs (smooth retries, fewer 429 storms).
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white">Deployment</h3>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Docker Compose: Postgres + .NET API + Next.js frontend.</li>
              <li>
                Environment-driven configuration (JWT keys, DB connection
                string, OAuth, SMTP, AI key/model, IndexNow, etc.).
              </li>
              <li>
                Portfolio safety: never commit secrets—use environment variables
                or a secret store.
              </li>
            </ul>
          </section>
        </div>
      </details>

      {/* Screenshots */}
      <section className="mt-10 card-surface p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
          Portfolio checklist
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white font-display">
          Screenshots to add
        </h2>
        <ul className="mt-4 list-disc list-inside space-y-2 text-sm text-slate-300">
          <li>Home page (“Dial-Up Desktop” cover)</li>
          <li>Category page (“Time Capsule” + Blast From the Past)</li>
          <li>Article detail page (reactions + comments)</li>
          <li>90s Exclusive vault (shows grid + quizzes)</li>
          <li>Quiz runner gameplay screen</li>
          <li>Admin dashboard (AI writer + publish form)</li>
          <li>Show admin (image + trivia management)</li>
        </ul>
      </section>

      {/* Improvements */}
      <section className="mt-10 card-surface p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
          Roadmap
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white font-display">
          What I’d improve next
        </h2>
        <ul className="mt-4 list-disc list-inside space-y-2 text-sm text-slate-300">
          <li>Richer admin moderation tools (bulk review, shadow-bans, audit logs)</li>
          <li>Durable background job storage (Redis/DB) for horizontal scaling</li>
          <li>Deeper analytics dashboards (performance and engagement funnels)</li>
          <li>Server-side image processing (resize/WebP) for uploads and thumbnails</li>
        </ul>
      </section>
    </main>
  );
}

