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

interface ImageMeta {
  alt: string;
  title: string;
}

export interface ParsedBlock {
  title: string;
  paragraphTexts: string[];
  description: string;
  items: { title: string; description: string }[];
  imageKey: string | null;
  imageSet: Record<string, string> | undefined;
  meta: ImageMeta;
  hasButton: boolean;
}

export function parseBlock(
  block: Block,
  getImageSet?: (key: string) => Record<string, string> | undefined,
  getImageMeta?: (key: string) => ImageMeta,
): ParsedBlock {
  const elements = block?.elements || [];

  const titleEl = elements.find((el) => el.type === "h2");
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

  const imageKey = imageEl?.src || null;
  const imageSet = imageKey ? getImageSet?.(imageKey) : undefined;
  const meta = imageKey && getImageMeta
    ? getImageMeta(imageKey)
    : { alt: "", title: "" };

  return {
    title,
    paragraphTexts,
    description,
    items,
    imageKey,
    imageSet,
    meta,
    hasButton,
  };
}
