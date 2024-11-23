import { Constants } from "~/constants";

export default (options: { [key: string]: any }[]): boolean => {
    return options.every((option) => {
        return (
            formFieldValidator(
                option.value,
                isStringValidator,
                Constants.STRING_MIN_LENGTH,
            ) &&
            formFieldValidator(
                option.sort,
                isNumberValidator,
                Constants.NUMBER_MIN_VALUE,
            )
        );
    });
};
