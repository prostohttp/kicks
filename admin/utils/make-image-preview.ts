export const makeImagePreview = (
    file: File,
    state: { image: string | undefined },
    imageRef: HTMLImageElement | undefined,
): void => {
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            state.image = file.name;
            const preview = imageRef;
            if (preview) {
                preview.src = e.target!.result as string;
            }
        };
        reader.readAsDataURL(file);
    }
};
