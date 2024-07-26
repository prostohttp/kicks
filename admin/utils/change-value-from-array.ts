interface ArrayWithIdAndKey {
  id: number;
  [key: string]: any;
}

export default <T extends ArrayWithIdAndKey, K extends keyof T>(
  id: number,
  array: Array<T>,
  key: K,
  value: any,
) => {
  for (const item of array) {
    if (item.id === id) {
      item[key] = value;
    }
  }
};
