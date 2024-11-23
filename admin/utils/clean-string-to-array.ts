export default (str?: string): string[] => {
    return str
        ? str
              .trim()
              .split(",")
              .map((el) => el.trim())
        : [];
};
