import type { MultiPartData } from "~/types/server/server.types";

interface FromMultipartFormData {
    [key: string]: string | string[];
}

export default (data: MultiPartData[] | undefined): FromMultipartFormData => {
    if (!data) {
        throw createError({
            statusMessage: "Data not found",
        });
    }
    const updatedFields: FromMultipartFormData = {};
    for (const chunk of data) {
        if (!chunk.filename) {
            for (const chunk of data) {
                if (!chunk.filename) {
                    updatedFields[chunk.name as string] = chunk.data.toString();
                }
            }

            [chunk.name as string] = chunk.data.toString();
        }
    }
    return updatedFields;
};
