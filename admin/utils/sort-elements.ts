export default (
  elements: {
    [key: string]: any;
  }[],
): {
  [key: string]: any;
}[] => {
  if (elements) {
    return elements
      .map((option) => {
        return !option.sort ? { ...option, sort: 1 } : option;
      })
      .sort((a, b) => a.sort - b.sort);
  } else {
    return elements;
  }
};
