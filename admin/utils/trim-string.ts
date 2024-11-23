export default (str: string, maxLength: number = 100): string => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength - 3) + "...";
    }
    return str;
};
