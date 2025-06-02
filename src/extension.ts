import * as path from "path";
import * as vscode from "vscode";
import { FileDecorationProvider } from "./fileDecorationProvider";
import { getAllFilesInDirectory } from "./fileUtils";
import { ProjectExporter } from "./projectExporter";

let globalExporter: ProjectExporter | null = null;
let decorationProvider: FileDecorationProvider | null = null;

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "project-export" is now active!');

  const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  if (workspacePath) {
    globalExporter = new ProjectExporter(workspacePath);
  }

  const exportProjectCommand = vscode.commands.registerCommand(
    "ai-project-export-pro.exportProject",
    async () => {
      const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

      if (!workspacePath) {
        vscode.window.showErrorMessage("No workspace folder found");
        return;
      }

      try {
        const exporter = new ProjectExporter(workspacePath);
        await exporter.exportProject();
      } catch (error) {
        vscode.window.showErrorMessage(`Error exporting project: ${error}`);
      }
    }
  );

  const exportFolderCommand = vscode.commands.registerCommand(
    "project-export.exportFolder",
    async (uri: vscode.Uri) => {
      if (!uri || !uri.fsPath) {
        vscode.window.showErrorMessage("No folder selected");
        return;
      }

      try {
        const exporter = new ProjectExporter(uri.fsPath);
        await exporter.exportProject();
        vscode.window.showInformationMessage(
          `Folder exported: ${path.basename(uri.fsPath)}`
        );
      } catch (error) {
        vscode.window.showErrorMessage(`Error exporting folder: ${error}`);
      }
    }
  );

  const includeFileCommand = vscode.commands.registerCommand(
    "project-export.includeFile",
    async (uri: vscode.Uri) => {
      if (!uri || !uri.fsPath || !globalExporter) {
        vscode.window.showErrorMessage(
          "No file selected or exporter not initialized"
        );
        return;
      }

      try {
        const workspacePath =
          vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspacePath) {
          vscode.window.showErrorMessage("No workspace folder found");
          return;
        }

        const relativePath = path.relative(workspacePath, uri.fsPath);
        await globalExporter
          .getExceptionsManager()
          .addForceInclude(relativePath);

        if (decorationProvider) {
          decorationProvider.refresh();
        }

        vscode.window.showInformationMessage(
          `File included: ${path.basename(uri.fsPath)}`
        );
      } catch (error) {
        vscode.window.showErrorMessage(`Error including file: ${error}`);
      }
    }
  );

  const excludeFileCommand = vscode.commands.registerCommand(
    "project-export.excludeFile",
    async (uri: vscode.Uri) => {
      if (!uri || !uri.fsPath || !globalExporter) {
        vscode.window.showErrorMessage(
          "No file selected or exporter not initialized"
        );
        return;
      }

      try {
        const workspacePath =
          vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspacePath) {
          vscode.window.showErrorMessage("No workspace folder found");
          return;
        }

        const relativePath = path.relative(workspacePath, uri.fsPath);
        await globalExporter
          .getExceptionsManager()
          .addForceExclude(relativePath);

        if (decorationProvider) {
          decorationProvider.refresh();
        }

        vscode.window.showInformationMessage(
          `File excluded: ${path.basename(uri.fsPath)}`
        );
      } catch (error) {
        vscode.window.showErrorMessage(`Error excluding file: ${error}`);
      }
    }
  );

  const includeSelectedFilesCommand = vscode.commands.registerCommand(
    "project-export.includeSelectedFiles",
    async (uri: vscode.Uri, allSelected: vscode.Uri[]) => {
      const uris = allSelected && allSelected.length > 0 ? allSelected : [uri];

      if (!uris.length || !globalExporter) {
        vscode.window.showErrorMessage(
          "No files selected or exporter not initialized"
        );
        return;
      }

      try {
        const workspacePath =
          vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspacePath) {
          vscode.window.showErrorMessage("No workspace folder found");
          return;
        }

        const relativePaths = uris
          .filter((u) => u && u.fsPath)
          .map((u) => path.relative(workspacePath, u.fsPath));

        await globalExporter
          .getExceptionsManager()
          .addMultipleForceInclude(relativePaths);

        if (decorationProvider) {
          decorationProvider.refresh();
        }

        vscode.window.showInformationMessage(
          `${relativePaths.length} files included in export`
        );
      } catch (error) {
        vscode.window.showErrorMessage(`Error including files: ${error}`);
      }
    }
  );

  const excludeSelectedFilesCommand = vscode.commands.registerCommand(
    "project-export.excludeSelectedFiles",
    async (uri: vscode.Uri, allSelected: vscode.Uri[]) => {
      const uris = allSelected && allSelected.length > 0 ? allSelected : [uri];

      if (!uris.length || !globalExporter) {
        vscode.window.showErrorMessage(
          "No files selected or exporter not initialized"
        );
        return;
      }

      try {
        const workspacePath =
          vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspacePath) {
          vscode.window.showErrorMessage("No workspace folder found");
          return;
        }

        const relativePaths = uris
          .filter((u) => u && u.fsPath)
          .map((u) => path.relative(workspacePath, u.fsPath));

        await globalExporter
          .getExceptionsManager()
          .addMultipleForceExclude(relativePaths);

        if (decorationProvider) {
          decorationProvider.refresh();
        }

        vscode.window.showInformationMessage(
          `${relativePaths.length} files excluded from export`
        );
      } catch (error) {
        vscode.window.showErrorMessage(`Error excluding files: ${error}`);
      }
    }
  );

  const includeFolderFilesCommand = vscode.commands.registerCommand(
    "project-export.includeFolderFiles",
    async (uri: vscode.Uri) => {
      if (!uri || !uri.fsPath || !globalExporter) {
        vscode.window.showErrorMessage(
          "No folder selected or exporter not initialized"
        );
        return;
      }

      try {
        const workspacePath =
          vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspacePath) {
          vscode.window.showErrorMessage("No workspace folder found");
          return;
        }

        const allFiles = await getAllFilesInDirectory(
          uri.fsPath,
          workspacePath
        );
        await globalExporter
          .getExceptionsManager()
          .addMultipleForceInclude(allFiles);

        if (decorationProvider) {
          decorationProvider.refresh();
        }

        vscode.window.showInformationMessage(
          `${allFiles.length} files in folder included in export`
        );
      } catch (error) {
        vscode.window.showErrorMessage(
          `Error including folder files: ${error}`
        );
      }
    }
  );

  const excludeFolderFilesCommand = vscode.commands.registerCommand(
    "project-export.excludeFolderFiles",
    async (uri: vscode.Uri) => {
      if (!uri || !uri.fsPath || !globalExporter) {
        vscode.window.showErrorMessage(
          "No folder selected or exporter not initialized"
        );
        return;
      }

      try {
        const workspacePath =
          vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspacePath) {
          vscode.window.showErrorMessage("No workspace folder found");
          return;
        }

        const allFiles = await getAllFilesInDirectory(
          uri.fsPath,
          workspacePath
        );
        await globalExporter
          .getExceptionsManager()
          .addMultipleForceExclude(allFiles);

        if (decorationProvider) {
          decorationProvider.refresh();
        }

        vscode.window.showInformationMessage(
          `${allFiles.length} files in folder excluded from export`
        );
      } catch (error) {
        vscode.window.showErrorMessage(
          `Error excluding folder files: ${error}`
        );
      }
    }
  );

  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100000
  );

  statusBarItem.text = "$(file-code) Copy Project Code Now ✨";

  statusBarItem.backgroundColor = new vscode.ThemeColor(
    "statusBarItem.infoBackground"
  );

  statusBarItem.color = new vscode.ThemeColor(
    "statusBarItem.prominentForeground"
  );

  statusBarItem.tooltip = [
    "Export Project Code to Clipboard",
    "────────────────────────",
    "• Filters files by extension",
    "• Excludes common dev folders",
    "• Creates a temporary backup file",
  ].join("\n");

  statusBarItem.name = "Export Project Code";

  statusBarItem.command = {
    title: "Export Project Code",
    command: "ai-project-export-pro.exportProject",
    tooltip: "Export filtered project files to clipboard with backup",
  };

  statusBarItem.show();

  decorationProvider = new FileDecorationProvider();
  if (globalExporter) {
    decorationProvider.setExporter(globalExporter);
  }
  const decorationDisposable =
    vscode.window.registerFileDecorationProvider(decorationProvider);

  context.subscriptions.push(
    exportProjectCommand,
    exportFolderCommand,
    includeFileCommand,
    excludeFileCommand,
    includeSelectedFilesCommand,
    excludeSelectedFilesCommand,
    includeFolderFilesCommand,
    excludeFolderFilesCommand,
    statusBarItem,
    decorationDisposable
  );
}

export function deactivate() {
  globalExporter = null;
  decorationProvider = null;
}
