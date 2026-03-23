interface PageConfig {
  path: string;
  breadcrumb: string;
  pageType: string;
  imagePath: string;
  catalogName?: string;
  catalogItems?: { name: string; path: string }[];
  mobileApp?: boolean;
  howTo?: boolean;
}

const PAGE_CONFIG: Record<string, PageConfig> = {
  home: {
    path: "/",
    breadcrumb: "Home",
    pageType: "WebPage",
    imagePath: "/images/home.png",
  },
  casino: {
    path: "/casino",
    breadcrumb: "Casino",
    pageType: "CollectionPage",
    imagePath: "/images/casino.png",
    catalogName: "Casino Categories",
    catalogItems: [
      { name: "Live Casino", path: "/casino#live" },
      { name: "Slots", path: "/casino#slots" },
      { name: "Jackpots", path: "/casino#jackpots" },
      { name: "Table Games", path: "/casino#table-games" },
    ],
  },
  betting: {
    path: "/betting",
    breadcrumb: "Betting",
    pageType: "CollectionPage",
    imagePath: "/images/betting.png",
    catalogName: "Betting Categories",
    catalogItems: [
      { name: "Football", path: "/betting#football" },
      { name: "Cricket", path: "/betting#cricket" },
      { name: "Basketball", path: "/betting#basketball" },
      { name: "Tennis", path: "/betting#tennis" },
    ],
  },
  app: {
    path: "/app",
    breadcrumb: "App",
    pageType: "WebPage",
    imagePath: "/images/app.png",
    mobileApp: true,
  },
  login: {
    path: "/login",
    breadcrumb: "Login",
    pageType: "WebPage",
    imagePath: "/images/login.png",
    howTo: true,
  },
};

interface SeoSchemaOptions {
  page: string;
  baseUrl: string;
  brandName: string;
  lang: string;
  title: string;
  description: string;
  apkPath?: string;
  currencyCode?: string;
  countryCode?: string;
  city?: string;
  postalCode?: string;
  countryName?: string;
  faqItems?: { question: string; answer: string }[];
}

export function buildSeoSchema(opts: SeoSchemaOptions) {
  const cfg = PAGE_CONFIG[opts.page];
  if (!cfg) return undefined;

  const {
    baseUrl,
    brandName,
    lang,
    title: pageName,
    description: pageDescription,
    apkPath = "/app.apk",
    currencyCode = "BDT",
    countryCode = "BD",
    city = "Dhaka",
    postalCode = "1000",
    countryName = "Bangladesh",
  } = opts;

  const pageUrl = `${baseUrl}${cfg.path}`;
  const pageAnchorBase = opts.page === "home" ? baseUrl : pageUrl;
  const siteDisplayName = `${brandName} ${countryName}`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: brandName,
      url: `${baseUrl}/`,
      logo: `${baseUrl}/img/logo.webp`,
      sameAs: [],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Online Service",
        addressLocality: city,
        postalCode,
        addressCountry: countryCode,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: `${baseUrl}/`,
      name: siteDisplayName,
      publisher: { "@id": `${baseUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${baseUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": cfg.pageType,
      "@id": `${pageAnchorBase}/#webpage`,
      url: pageUrl,
      name: pageName,
      inLanguage: lang,
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: { "@id": `${baseUrl}/#organization` },
      description: pageDescription,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${baseUrl}${cfg.imagePath}`,
      },
    },
  ];

  if (cfg.catalogItems) {
    graph.push({
      "@type": "OfferCatalog",
      "@id": `${pageAnchorBase}/#catalog`,
      name: cfg.catalogName,
      itemListElement: cfg.catalogItems.map((item) => ({
        "@type": "OfferCatalog",
        name: item.name,
        url: `${baseUrl}${item.path}`,
      })),
    });
  }

  if (cfg.mobileApp) {
    graph.push({
      "@type": "MobileApplication",
      "@id": `${pageAnchorBase}/#mobile-app`,
      name: pageName,
      operatingSystem: "Android",
      applicationCategory: "GameApplication",
      downloadUrl: `${baseUrl}${apkPath}`,
      installUrl: pageUrl,
      offers: {
        "@type": "Offer",
        price: "0.00",
        priceCurrency: currencyCode,
      },
    });
  }

  if (cfg.howTo) {
    graph.push({
      "@type": "HowTo",
      "@id": `${pageAnchorBase}/#howto`,
      name: `How to log into ${brandName}`,
      description: pageDescription,
      step: [
        {
          "@type": "HowToStep",
          name: "Open the login page",
          text: `Go to ${pageUrl}.`,
        },
        {
          "@type": "HowToStep",
          name: "Enter your details",
          text: "Use your registered credentials.",
        },
        {
          "@type": "HowToStep",
          name: "Sign in",
          text: "Submit the form to access your account.",
        },
      ],
    });
  }

  if (opts.faqItems?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageAnchorBase}/#faqpage`,
      mainEntity: opts.faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${pageAnchorBase}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/`,
      },
      ...(opts.page !== "home"
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: cfg.breadcrumb,
              item: pageUrl,
            },
          ]
        : []),
    ],
  });

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
