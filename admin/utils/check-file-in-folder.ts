import fs from "node:fs";

export default (filePath: string): boolean => {
  console.log("File Path", filePath);

  const exists = fs.existsSync("public" + filePath);
  console.log("File Exists", exists);

  return exists;
};
