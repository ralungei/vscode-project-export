import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as vscode from "vscode";

export interface ExportConfig {
  includeExtensions: string[];
  excludeExtensions: string[];
  excludeFiles: string[];
  excludeDirectories: string[];
}

export const DEFAULT_CONFIG: ExportConfig = {
  includeExtensions: ["js", "jsx", "ts", "tsx", "html", "md", "py", "pyi"],
  excludeExtensions: ["css", "scss", "json", "yaml", "yml", "lock", "env"],
  excludeFiles: ["package-lock.json", "poetry.lock"],
  excludeDirectories: [
    "node_modules",
    ".git",
    "__pycache__",
    ".venv",
    ".poetry",
    "venv",
    "build",
    "dist",
    ".next",
    ".cache",
    "coverage",
    ".pytest_cache",
    ".mypy_cache",
    ".yarn",
  ],
};

export class ProjectExporter {
  private readonly workspacePath: string;
  private readonly config: ExportConfig;
  private readonly tempFilePath: string;

  constructor(workspacePath: string, config: ExportConfig = DEFAULT_CONFIG) {
    this.workspacePath = workspacePath;
    this.config = config;
    // Crear el archivo temporal en el directorio temporal del sistema
    this.tempFilePath = path.join(os.tmpdir(), ".project_export.tmp");
  }

  async exportProject(): Promise<void> {
    try {
      const output = await this.generateExport();

      // Guardar en archivo temporal
      await fs.promises.writeFile(this.tempFilePath, output, "utf8");

      // Copiar al portapapeles
      await vscode.env.clipboard.writeText(output);

      vscode.window.showInformationMessage(
        `Project exported to clipboard! Temp file: ${this.tempFilePath}`
      );
    } catch (error) {
      throw new Error(`Export failed: ${error}`);
    }
  }

  private async generateExport(): Promise<string> {
    let output = "Project Code Export\n";
    output += `Date: ${new Date().toString()}\n\n`;
    output += await this.traverseDirectory(this.workspacePath);
    return output;
  }

  private async traverseDirectory(dirPath: string): Promise<string> {
    let content = "";
    const items = await fs.promises.readdir(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = await fs.promises.stat(fullPath);

      if (stat.isDirectory()) {
        if (
          !this.config.excludeDirectories.some((dir) => fullPath.includes(dir))
        ) {
          content += await this.traverseDirectory(fullPath);
        }
      } else if (stat.isFile()) {
        if (this.shouldIncludeFile(item)) {
          content += await this.formatFileContent(fullPath);
        }
      }
    }

    return content;
  }

  private shouldIncludeFile(filename: string): boolean {
    const extension = path.extname(filename).slice(1).toLowerCase();

    if (this.config.excludeFiles.includes(filename)) {
      return false;
    }

    if (this.config.excludeExtensions.includes(extension)) {
      return false;
    }

    return this.config.includeExtensions.includes(extension);
  }

  private async formatFileContent(filePath: string): Promise<string> {
    const relativePath = path.relative(this.workspacePath, filePath);
    let content = "\n=========================================\n";
    content += `File: ${relativePath}\n`;
    content += "=========================================\n\n";

    const fileContent = await fs.promises.readFile(filePath, "utf8");
    content += fileContent + "\n\n";

    return content;
  }
}
