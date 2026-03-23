export function getPathWithoutLanguage(
  pathname: string,
  supportedLanguages: string[],
): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && supportedLanguages.includes(segments[0])) {
    segments.shift();
  }
  return "/" + segments.join("/");
}
