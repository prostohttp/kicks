export default (options: { [key: string]: any }[]): boolean => {
  return options.every((option) => {
    return (
      formFieldValidator(option.value, isStringValidator, 3) &&
      formFieldValidator(option.sort, isNumberValidator, 1)
    );
  });
};
