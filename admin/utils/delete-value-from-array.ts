interface ArrayWithId {
  id: number;
}
export default (id: number, array: Array<ArrayWithId>): void => {
  const index = array.findIndex((value) => value.id === id);
  array.splice(index, 1);
};
