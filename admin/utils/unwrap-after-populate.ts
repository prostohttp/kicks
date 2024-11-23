import type { TitleObjectAfterPopulate } from "~/types/server/server.types";

export default (wrapped: TitleObjectAfterPopulate[] | undefined): string[] => {
    return wrapped ? wrapped.map((obj) => obj.title) : [];
};
