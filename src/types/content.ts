export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface MetaI {
  title: string;
  description: string;
  keywords: string;
}

export interface HeroI {
  badge?: string;
  badgeIcon?: string;
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  primaryButtonIcon?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  stats?: { value: string; label: string }[];
}

export interface ContentSectionI {
  type: "content";
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonHref?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface FeaturesSectionI {
  type: "features";
  tag?: string;
  tagIcon?: string;
  title: string;
  description?: string;
  items: FeatureItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionI {
  type: "faq";
  tag?: string;
  tagIcon?: string;
  title: string;
  highlightedText?: string;
  description?: string;
  items: FaqItem[];
}

export interface CtaSectionI {
  type: "cta";
  title: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export interface StepItem {
  title: string;
  description: string;
}

export interface StepsSectionI {
  type: "steps";
  tag?: string;
  tagIcon?: string;
  title: string;
  description?: string;
  items: StepItem[];
}

export type SectionI =
  | ContentSectionI
  | FeaturesSectionI
  | FaqSectionI
  | CtaSectionI
  | StepsSectionI;

export interface PageDataI {
  meta: MetaI;
  hero: HeroI;
  sections: SectionI[];
}
