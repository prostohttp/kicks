export default (array?: string[]): string => {
    return array?.length ? array.map((str) => str.trim()).join(",") : "";
};
