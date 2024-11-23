export default (path: string, title: string): string => {
    let fullPath = path.split("/");
    fullPath.splice(fullPath.length - 1, 1, title);
    return fullPath.join("/");
};
