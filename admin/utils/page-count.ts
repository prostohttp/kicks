export default (allItems: number, itemsPerPage: number): number => {
    return Math.ceil(allItems / itemsPerPage);
};
