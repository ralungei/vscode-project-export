import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export interface ProjectExceptions {
  forceInclude: string[];
  forceExclude: string[];
}

export class ExceptionsManager {
  private workspacePath: string;
  private exceptionsFilePath: string;
  private exceptions: ProjectExceptions;

  constructor(workspacePath: string) {
    this.workspacePath = workspacePath;
    this.exceptionsFilePath = path.join(
      workspacePath,
      ".vscode",
      "project-export.json"
    );
    this.exceptions = this.loadExceptions();
  }

  private loadExceptions(): ProjectExceptions {
    try {
      if (fs.existsSync(this.exceptionsFilePath)) {
        const content = fs.readFileSync(this.exceptionsFilePath, "utf8");
        return JSON.parse(content);
      }
    } catch (error) {
      console.warn("Error loading project exceptions:", error);
    }

    return {
      forceInclude: [],
      forceExclude: [],
    };
  }

  private async saveExceptions(): Promise<void> {
    try {
      const vscodeDirPath = path.join(this.workspacePath, ".vscode");

      if (!fs.existsSync(vscodeDirPath)) {
        await fs.promises.mkdir(vscodeDirPath, { recursive: true });
      }

      await fs.promises.writeFile(
        this.exceptionsFilePath,
        JSON.stringify(this.exceptions, null, 2),
        "utf8"
      );
    } catch (error) {
      vscode.window.showErrorMessage(`Error saving exceptions: ${error}`);
    }
  }

  isForceIncluded(relativePath: string): boolean {
    return this.exceptions.forceInclude.includes(relativePath);
  }

  isForceExcluded(relativePath: string): boolean {
    return this.exceptions.forceExclude.includes(relativePath);
  }

  async addForceInclude(relativePath: string): Promise<void> {
    this.exceptions.forceExclude = this.exceptions.forceExclude.filter(
      (p) => p !== relativePath
    );

    if (!this.exceptions.forceInclude.includes(relativePath)) {
      this.exceptions.forceInclude.push(relativePath);
      await this.saveExceptions();
    }
  }

  async addForceExclude(relativePath: string): Promise<void> {
    this.exceptions.forceInclude = this.exceptions.forceInclude.filter(
      (p) => p !== relativePath
    );

    if (!this.exceptions.forceExclude.includes(relativePath)) {
      this.exceptions.forceExclude.push(relativePath);
      await this.saveExceptions();
    }
  }

  async removeException(relativePath: string): Promise<void> {
    this.exceptions.forceInclude = this.exceptions.forceInclude.filter(
      (p) => p !== relativePath
    );
    this.exceptions.forceExclude = this.exceptions.forceExclude.filter(
      (p) => p !== relativePath
    );
    await this.saveExceptions();
  }

  async addMultipleForceInclude(relativePaths: string[]): Promise<void> {
    for (const relativePath of relativePaths) {
      this.exceptions.forceExclude = this.exceptions.forceExclude.filter(
        (p) => p !== relativePath
      );

      if (!this.exceptions.forceInclude.includes(relativePath)) {
        this.exceptions.forceInclude.push(relativePath);
      }
    }
    await this.saveExceptions();
  }

  async addMultipleForceExclude(relativePaths: string[]): Promise<void> {
    for (const relativePath of relativePaths) {
      this.exceptions.forceInclude = this.exceptions.forceInclude.filter(
        (p) => p !== relativePath
      );

      if (!this.exceptions.forceExclude.includes(relativePath)) {
        this.exceptions.forceExclude.push(relativePath);
      }
    }
    await this.saveExceptions();
  }

  getExceptions(): ProjectExceptions {
    return { ...this.exceptions };
  }
}
