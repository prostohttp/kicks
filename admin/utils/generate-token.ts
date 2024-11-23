import { nanoid } from "nanoid";

export default (
    expirationMinutes: number,
): {
    token: string;
    timestamp: number;
} => {
    return {
        token: nanoid(),
        timestamp: Date.now() + 1000 * 60 * expirationMinutes,
    };
};
