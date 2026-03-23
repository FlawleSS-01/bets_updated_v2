export interface CommonTextsI {
  header: Record<string, string>;
  footer: {
    paymentMethodsTitle: string;
    navigation: string;
    links: Record<string, string>;
    ageNotice: string;
    ageLimit: string;
  };
  banner: {
    title: string;
    subtitle: string;
    buttonText: string;
    ariaLabel: string;
    alt: string;
  };
  buttons: {
    download: string;
    login: string;
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  imageDescription: Record<
    string,
    Record<string, { alt: string; title: string }>
  >;
}
