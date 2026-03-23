export interface RouteConfig {
  label: string;
  path: string;
  navHidden?: boolean;
}

export const routes: Record<string, RouteConfig> = {
  home: { label: "Home", path: "/" },
  casino: { label: "Casino", path: "/casino" },
  login: { label: "Login", path: "/login" },
  app: { label: "App", path: "/app" },
  betting: { label: "Bet", path: "/betting" },
};
