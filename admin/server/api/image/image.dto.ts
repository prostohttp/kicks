import { MultiPartData } from "~/types/server/server.types";

export interface ImageDto {
    multiple?: string;
    folderName: string;
    image: string | string[];
}
