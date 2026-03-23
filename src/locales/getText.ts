export const getText = async (lang: string, page: string) => {
  const langCode = lang.split("-")[0];
  if (page === "common") return await import(`./${page}/${langCode}.json`);
  return await import(`./pages/${page}/${langCode}.json`);
};
