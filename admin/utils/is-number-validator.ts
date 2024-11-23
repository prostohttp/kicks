export default (
    value: number | undefined,
    min?: number,
    max?: number,
): boolean => {
    if (min && max) {
        return typeof value === "number" && value >= min && value <= max;
    } else if (min && !max) {
        return typeof value === "number" && value >= min;
    } else if (!min && max) {
        return typeof value === "number" && value <= max;
    } else if (!value) {
        return false;
    } else {
        return typeof value === "number";
    }
};
