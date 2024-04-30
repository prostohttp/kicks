export default (
  page: number,
  pagesInPagination: number,
  elementLength: number,
  limit: number,
) => {
  return (
    !page ||
    !Number.isInteger(Number(page)) ||
    page > pagesInPagination ||
    page <= 0 ||
    elementLength < limit
  );
};
