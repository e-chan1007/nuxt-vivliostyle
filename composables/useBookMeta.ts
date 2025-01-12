export const useBookMeta = async () => {
  const bookId = useRoute().params.book;
  if (!bookId || Array.isArray(bookId)) return ref(null);

  return (await useAsyncData(`books.${bookId}.meta`, () =>
    queryContent(bookId)
      .where({ _extension: { $eq: "yml" } })
      .findOne(),
  )).data;
}
