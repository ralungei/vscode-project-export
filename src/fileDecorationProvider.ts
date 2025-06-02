import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { ProjectExporter } from "./projectExporter";

export class FileDecorationProvider implements vscode.FileDecorationProvider {
  private _onDidChangeFileDecorations = new vscode.EventEmitter<
    vscode.Uri | vscode.Uri[] | undefined
  >();
  readonly onDidChangeFileDecorations = this._onDidChangeFileDecorations.event;
  private exporter: ProjectExporter | null = null;

  setExporter(exporter: ProjectExporter): void {
    this.exporter = exporter;
  }

  provideFileDecoration(uri: vscode.Uri): vscode.FileDecoration | undefined {
    if (!this.exporter) {
      return undefined;
    }

    const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspacePath) {
      return undefined;
    }

    try {
      const stat = fs.statSync(uri.fsPath);
      if (stat.isDirectory()) {
        return undefined;
      }
    } catch {
      return undefined;
    }

    const relativePath = path.relative(workspacePath, uri.fsPath);

    if (this.exporter.shouldIncludeFile(relativePath)) {
      return {
        badge: "⚡",
        // color: new vscode.ThemeColor("projectExport.includedFile"),
        tooltip: "This file will be exported to clipboard",
      };
    }

    return undefined;
  }

  refresh(): void {
    this._onDidChangeFileDecorations.fire(undefined);
  }
}
