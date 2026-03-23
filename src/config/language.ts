export interface LanguageI {
  code: string;
  label: string;
  flag: string;
  direction: "ltr" | "rtl";
}

export const languages: LanguageI[] = [
  {
    code: "en",
    label: "English",
    flag: "United Kingdom",
    direction: "ltr",
  },
];

export const supportedLanguages = languages.map((lng) => lng.code);
export const defaultLng = supportedLanguages[0];
