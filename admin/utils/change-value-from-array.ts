interface ArrayWithIdAndKey {
    _id?: string;
    [key: string]: any;
}

export default <T extends ArrayWithIdAndKey, K extends keyof T>(
    id: string,
    array: Array<T>,
    key: K,
    value: any,
) => {
    for (const item of array) {
        if (item._id === id) {
            item[key] = value;
        }
    }
};
