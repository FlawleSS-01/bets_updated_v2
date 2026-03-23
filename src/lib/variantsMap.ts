export const PAGE_RULES: Record<string, Record<string, string | string[]>> = {
  home: {
    welcome: "auto",
    features: "auto",
    category: "auto",
    popular_games: "auto",
  },
  casino: {
    welcome: "auto",
    features: "auto",
    bonuses: "auto",
    live_casino: "auto",
  },
  betting: {
    features: "auto",
    powered: "auto",
  },
  app: {
    welcome: "auto",
    features: "auto",
    other: "auto",
  },
  login: {
    security: "auto",
    features: "auto",
    forgot: "forgotTipsGrid",
  },
};

export const AUTO_VARIANTS: Record<string, string[]> = {
  welcome: ["mediaSplit", "default"],
  features: ["featuresCards"],
  category: ["categoryTiles", "default"],
  popular_games: ["offerCards3", "default"],
  bonuses: ["promoCardsGrid", "mediaSplit", "default"],
  live_casino: ["mediaSplit", "default"],
  powered: ["logoMarquee", "default"],
  security: ["mediaSplit", "default"],
  other: ["mediaSplit", "default"],
  forgot: ["forgotTipsGrid", "default"],
  start: ["startSpotlight", "mediaSplit", "default"],
  glossary: ["glossaryAccordion", "featuresCardsWithImage", "default"],
  games_universe: ["bentoHighlights", "categoryTiles", "default"],
  download: ["stepsTimeline", "mediaSplit", "default"],
  casino_games: ["gameCategoryGrid", "categoryTiles", "default"],
  sports: ["featuresCards", "categoryTiles", "default"],
};
