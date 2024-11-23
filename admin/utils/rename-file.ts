export default (fileName: string): string => {
    return Date.now().toString() + "." + fileName.replaceAll(" ", "-");
};
