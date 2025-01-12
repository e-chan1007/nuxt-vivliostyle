import type { ParsedContent } from "@nuxt/content";

export const useBookPage = async () => {
  const bookId = useRoute().params.book;
  const pageId = useRoute().params.page;
  if (!bookId || Array.isArray(bookId)) return ref(null);
  if (!pageId || Array.isArray(pageId)) return ref(null);

  return (await useAsyncData(
    `books.${bookId}.pages.${pageId}`,
    () => queryContent(bookId, pageId).where({ _extension: "md" }).findOne(),
  )).data;
}

export const useBookPages = async () => {
  const bookId = useRoute().params.book;
  if (!bookId || Array.isArray(bookId)) return ref([] as ParsedContent[]);

  return (await useAsyncData(
    `books.${bookId}.pages`,
    () => queryContent(bookId).where({ _extension: "md" }).find(),
    {
      default: () => []
    }
  )).data;
}
