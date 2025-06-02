import * as fs from "fs";
import * as path from "path";

export async function getAllFilesInDirectory(
  dirPath: string,
  basePath: string
): Promise<string[]> {
  const files: string[] = [];

  try {
    const items = await fs.promises.readdir(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = await fs.promises.stat(fullPath);

      if (stat.isDirectory()) {
        const subFiles = await getAllFilesInDirectory(fullPath, basePath);
        files.push(...subFiles);
      } else if (stat.isFile()) {
        const relativePath = path.relative(basePath, fullPath);
        files.push(relativePath);
      }
    }
  } catch (error) {
    console.warn(`Error reading directory ${dirPath}:`, error);
  }

  return files;
}
