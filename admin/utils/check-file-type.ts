export default (file: File) => {
    if (file?.name) {
        const fileType = file.name.split(".").pop();
        if (
            fileType === "jpeg" ||
            fileType === "jpg" ||
            fileType === "png" ||
            fileType === "webp"
        )
            return true;
    }
    return false;
};
