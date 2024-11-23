export default (str: string) => {
    if (str === null || str === "") {
        return false;
    } else {
        str = str.toString();
    }
    return str.replace(/(<([^>]+)>)/gi, "");
};
