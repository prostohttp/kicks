import fs from "node:fs";

export default (path: string) => {
    return fs.existsSync(path);
};
