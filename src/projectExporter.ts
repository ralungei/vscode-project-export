import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as vscode from "vscode";
import { DEFAULT_CONFIG, ExportConfig } from "./config/exportConfig";
import { isBlacklistedDirectory } from "./config/folderBlacklist";
import { ExceptionsManager } from "./exceptionsManager";

export class ProjectExporter {
  private readonly workspacePath: string;
  private readonly config: ExportConfig;
  private readonly tempFilePath: string;
  private readonly exceptionsManager: ExceptionsManager;

  constructor(workspacePath: string, config: ExportConfig = DEFAULT_CONFIG) {
    this.workspacePath = workspacePath;
    this.config = config;
    this.tempFilePath = path.join(os.tmpdir(), ".project_export.tmp");
    this.exceptionsManager = new ExceptionsManager(workspacePath);
  }

  async exportProject(): Promise<void> {
    try {
      const output = await this.generateExport();

      await fs.promises.writeFile(this.tempFilePath, output, "utf8");
      await vscode.env.clipboard.writeText(output);

      vscode.window.showInformationMessage(
        `Project exported to clipboard! Temp file: ${this.tempFilePath}`
      );
    } catch (error) {
      throw new Error(`Export failed: ${error}`);
    }
  }

  async generateExport(): Promise<string> {
    const folderName = path.basename(this.workspacePath);

    let output = "Project Code Export\n";
    output += `Date: ${new Date().toString()}\n`;
    output += `Exported Folder: ${folderName}\n\n`;

    output += "Project Structure:\n";
    output += `📁 ${folderName}/\n`;
    output += await this.generateFileStructure(this.workspacePath, "  ");
    output += "\n";

    output += await this.traverseDirectory(this.workspacePath);
    return output;
  }

  private async generateFileStructure(
    dirPath: string,
    indent: string
  ): Promise<string> {
    let structure = "";

    try {
      const items = await fs.promises.readdir(dirPath);

      for (const item of items) {
        const fullPath = path.join(dirPath, item);

        try {
          const stat = await fs.promises.stat(fullPath);

          if (stat.isDirectory()) {
            // Verificar si la carpeta está en la blacklist
            if (isBlacklistedDirectory(item)) {
              const subItems = await fs.promises.readdir(fullPath);
              structure += `${indent}📁 ${item}/ (${subItems.length} items)\n`;
              structure += `${indent}  📄 ...\n`;
              continue;
            }

            const subItems = await fs.promises.readdir(fullPath);

            // Si la carpeta tiene más de 50 elementos, no exploramos dentro
            if (subItems.length > 50) {
              structure += `${indent}📁 ${item}/ (${subItems.length} items)\n`;
              structure += `${indent}  📄 ...\n`;
            } else {
              structure += `${indent}📁 ${item}/\n`;
              structure += await this.generateFileStructure(
                fullPath,
                indent + "  "
              );
            }
          } else if (stat.isFile()) {
            structure += `${indent}📄 ${item}\n`;
          }
        } catch (error) {
          // Ignorar archivos/carpetas que no se puedan leer
          continue;
        }
      }
    } catch (error) {
      // Ignorar carpetas que no se puedan leer
    }

    return structure;
  }

  private async isFolderCompletelyIncluded(
    folderPath: string
  ): Promise<boolean> {
    try {
      const allFiles = await this.getAllFilesInFolder(folderPath);

      if (allFiles.length === 0) {
        return false;
      }

      for (const filePath of allFiles) {
        const relativePath = path.relative(this.workspacePath, filePath);
        if (!this.shouldIncludeFile(relativePath)) {
          return false;
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  private async getAllFilesInFolder(folderPath: string): Promise<string[]> {
    const files: string[] = [];

    try {
      const items = await fs.promises.readdir(folderPath);

      for (const item of items) {
        const fullPath = path.join(folderPath, item);
        const stat = await fs.promises.stat(fullPath);

        if (stat.isDirectory()) {
          const subFiles = await this.getAllFilesInFolder(fullPath);
          files.push(...subFiles);
        } else if (stat.isFile()) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Ignorar errores de lectura
    }

    return files;
  }

  private async traverseDirectory(dirPath: string): Promise<string> {
    let content = "";
    const items = await fs.promises.readdir(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = await fs.promises.stat(fullPath);

      if (stat.isDirectory()) {
        if (
          !this.config.excludeDirectories.some(
            (dir) => path.basename(fullPath) === dir
          )
        ) {
          content += await this.traverseDirectory(fullPath);
        }
      } else if (stat.isFile()) {
        const relativePath = path.relative(this.workspacePath, fullPath);
        if (this.shouldIncludeFile(relativePath)) {
          content += await this.formatFileContent(fullPath);
        }
      }
    }

    return content;
  }

  shouldIncludeFile(relativePath: string): boolean {
    // Primero verificar excepciones manuales
    if (this.exceptionsManager.isForceIncluded(relativePath)) {
      return true;
    }

    if (this.exceptionsManager.isForceExcluded(relativePath)) {
      return false;
    }

    const filename = path.basename(relativePath);
    const extension = path.extname(filename).slice(1).toLowerCase();

    // Verificar archivos específicos excluidos
    if (this.config.excludeFiles.includes(filename)) {
      return false;
    }

    // Verificar extensiones excluidas
    if (this.config.excludeExtensions.includes(extension)) {
      return false;
    }

    // Verificar tamaño del archivo
    try {
      const fullPath = path.join(this.workspacePath, relativePath);
      const stat = fs.statSync(fullPath);
      if (stat.size > this.config.maxFileSizeBytes) {
        return false;
      }
    } catch (error) {
      // Si no podemos leer el archivo, lo excluimos
      return false;
    }

    // Por defecto, incluir el archivo
    return true;
  }

  private async formatFileContent(filePath: string): Promise<string> {
    const relativePath = path.relative(this.workspacePath, filePath);
    let content = "\n=========================================\n";
    content += `File: ${relativePath}\n`;
    content += "=========================================\n\n";

    try {
      const fileContent = await fs.promises.readFile(filePath, "utf8");
      content += fileContent + "\n\n";
    } catch (error) {
      content += `[Error reading file: ${error}]\n\n`;
    }

    return content;
  }

  getExceptionsManager(): ExceptionsManager {
    return this.exceptionsManager;
  }
}
