export default (value: string, min?: number, max?: number): boolean => {
    if (min && max) {
        return (
            typeof value === "string" &&
            value.length >= min &&
            value.length <= max
        );
    } else if (min && !max) {
        return value.length >= min;
    } else if (max && !min) {
        return typeof value === "string" && value.length <= max;
    } else {
        return typeof value === "string";
    }
};
