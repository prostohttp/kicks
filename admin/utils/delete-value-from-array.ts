interface ArrayWithId {
  _id?: string;
}
export default (id: string, array: Array<ArrayWithId>): void => {
  // TODO: удалить, нельзя изменять входящий массив!
  const index = array.findIndex((value) => value._id === id);
  if (index !== -1) {
    array.splice(index, 1);
  }
};
