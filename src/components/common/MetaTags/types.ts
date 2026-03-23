export type PathT = {
  type: string;
  path: string;
  lang?: string;
};

type MetaLangT = {
  hrefLang: string;
  urlLang: string;
};

export type CanonDataPageT = {
  canonical: string;
  alternate: MetaLangT[];
};

export interface MetatagsI {
  title: string;
  descr: string;
  keywords: string;
  metaCanons?: CanonDataPageT;
  image?: string;
  imageAlt?: string;
}
