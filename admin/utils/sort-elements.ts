export default (
    elements: {
        [key: string]: any;
    }[],
): {
    [key: string]: any;
}[] => {
    if (elements) {
        return elements.sort((a, b) => a.sort - b.sort);
    } else {
        return elements;
    }
};
