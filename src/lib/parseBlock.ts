interface BlockElement {
  type: string;
  text?: string;
  src?: string;
  items?: { title: string; description: string }[];
}

interface Block {
  blockType: string;
  elements: BlockElement[];
}

export interface ParsedBlock {
  title: string;
  paragraphTexts: string[];
  description: string;
  items: { title: string; description: string }[];
  imageSrc: string | undefined;
  meta: { alt: string; title: string };
  hasButton: boolean;
}

export function parseBlock(
  block: Block,
  getImageMeta?: (key: string) => { alt: string; title: string },
): ParsedBlock {
  const elements = block?.elements || [];

  const titleEl = elements.find((el) => el.type === "title");
  const paragraphs = elements.filter((el) => el.type === "paragraph");

  const listEl = elements.find(
    (el) => el.type === "list" || el.type === "list-large",
  );
  const glossaryEl = elements.find((el) => el.type === "glossaryList");

  const imageEl = elements.find((el) => el.type === "image");
  const hasButton = elements.some((el) => el.type === "button");

  const title = titleEl?.text || "";
  const paragraphTexts = paragraphs.map((p) => p.text || "");
  const description = paragraphTexts[0] || "";

  let items: { title: string; description: string }[] = [];
  if (listEl?.items) items = listEl.items;
  if (glossaryEl?.items) items = glossaryEl.items;

  const imageSrc = imageEl?.src || undefined;
  const meta =
    imageSrc && getImageMeta
      ? getImageMeta(imageSrc)
      : { alt: "", title: "" };

  return {
    title,
    paragraphTexts,
    description,
    items,
    imageSrc,
    meta,
    hasButton,
  };
}
