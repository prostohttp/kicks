export default <T>(
    value: T,
    validatorFn: (v: T, min?: number, max?: number) => boolean,
    min?: number,
    max?: number,
): boolean => {
    return validatorFn(value, min, max);
};
