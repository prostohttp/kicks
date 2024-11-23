export default (elements: string[], selectedItem: string) => {
    const index = elements.indexOf(selectedItem);
    if (index === -1 || index === 0) {
        return selectedItem;
    }
    return elements.slice(0, index).concat(selectedItem).join("/");
};
