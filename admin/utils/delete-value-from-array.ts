interface ArrayWithId {
  _id?: string;
}
export default (id: string, array: Array<ArrayWithId>): void => {
  const index = array.findIndex((value) => value._id === id);
  array.splice(index, 1);
};
