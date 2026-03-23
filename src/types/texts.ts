export interface FooterLinkI {
  label: string;
  href: string;
}

export interface FooterColumnI {
  title: string;
  links: FooterLinkI[];
}

export interface CommonTextsI {
  pages: Record<string, string>;
  actions: Record<string, string>;
  footer: {
    columns: FooterColumnI[];
    copyright: string;
  };
  specialBtn?: string;
}
