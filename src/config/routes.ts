export interface RouteConfig {
  label: string;
  icon?: string;
  navHidden?: boolean;
}

export const routes: Record<string, RouteConfig> = {
  home: { label: "Home", navHidden: true },
  casino: { label: "Casino", icon: "icon-casino", navHidden: false },
  betting: { label: "Bet", icon: "icon-bet", navHidden: false },
  app: { label: "App", icon: "icon-app", navHidden: false },
  login: { label: "Login", navHidden: true },
};
