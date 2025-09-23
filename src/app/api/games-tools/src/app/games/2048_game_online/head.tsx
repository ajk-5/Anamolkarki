export default function Head() {
  const title = "Play 2048 Online Free - No Login or Signup";
  const description =
    "Play the classic 2048 puzzle game free online. Merge tiles to 2048 with swipes or arrow keys. Instant play on mobile and desktop — no login, no signup, no download.";
  const keywords =
    "2048 online free, play 2048, 2048 game no login, 2048 without signup, 2048 puzzle game, merge numbers game, swipe puzzle, 2048 mobile, 2048 desktop, browser game";
  const url = "/games/2048_game_online";
  const image = "/images/2048.png";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "2048 Online",
    url,
    description,
    genre: ["Puzzle", "Casual"],
    applicationCategory: "Game",
    operatingSystem: "Android, iOS, Windows, macOS",
    playMode: "SinglePlayer",
    image,
    inLanguage: "en",
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: "The Nineties Times",
      url: "/",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Robots */}
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

