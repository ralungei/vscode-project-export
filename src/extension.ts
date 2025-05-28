import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { ProjectExporter } from "./projectExporter";

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "project-export" is now active!');

  const exportProjectCommand = vscode.commands.registerCommand(
    "project-export.exportProject",
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


  const exportSelectionCommand = vscode.commands.registerCommand(
    "project-export.exportSelection", 
    async (clickedUri?: vscode.Uri, selectedUrisFromExplorer?: vscode.Uri[]) => {
      const urisToExport = selectedUrisFromExplorer && selectedUrisFromExplorer.length > 0
          ? selectedUrisFromExplorer
          : clickedUri ? [clickedUri] : [];

      if (urisToExport.length === 0) {
        vscode.window.showInformationMessage("No files or folders selected.");
        return;
      }

      let baseWorkspacePathForContext: string | undefined;
      const firstUri = urisToExport[0];

      if (firstUri) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(firstUri);
        if (workspaceFolder) {
          baseWorkspacePathForContext = workspaceFolder.uri.fsPath;
        } else {
          try {
            const stats = await fs.promises.stat(firstUri.fsPath);
            baseWorkspacePathForContext = stats.isDirectory() ? firstUri.fsPath : path.dirname(firstUri.fsPath);
          } catch (e) {
             baseWorkspacePathForContext = path.dirname(firstUri.fsPath); // Fallback
          }
        }
      }

      if (!baseWorkspacePathForContext && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
        baseWorkspacePathForContext = vscode.workspace.workspaceFolders[0].uri.fsPath;
      }

      if (!baseWorkspacePathForContext) {
        vscode.window.showErrorMessage("Could not determine a base context for export.");
        return;
      }

      try {
        const exporter = new ProjectExporter(baseWorkspacePathForContext);
        const absolutePathsToExport = urisToExport.map(uri => uri.fsPath);
        const output = await exporter.generateExportForSelectedItems(absolutePathsToExport);
        await vscode.env.clipboard.writeText(output);
        vscode.window.showInformationMessage(
          `${urisToExport.length} selected item(s) exported to clipboard!`
        );
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Error exporting selection: ${errorMessage}`);
      }
    }
  );


  // Crear el botón en la barra de estado con alta prioridad
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100000 // Prioridad muy alta para asegurar que aparece al principio
  );

  // Personalizar el aspecto del botón para hacerlo más visible
  statusBarItem.text = "$(file-code) Copy Project Code ✨"; // Icono más llamativo

  // Usar un color más prominente
  statusBarItem.backgroundColor = new vscode.ThemeColor(
    "statusBarItem.infoBackground"
  );

  statusBarItem.color = new vscode.ThemeColor(
    "statusBarItem.prominentForeground"
  );

  // Tooltip mejorado con más información
  statusBarItem.tooltip = [
    "Export Project Code to Clipboard",
    "────────────────────────",
    "• Filters files by extension",
    "• Excludes common dev folders",
    "• Creates a temporary backup file",
  ].join("\n");

  // Nombre más descriptivo para accesibilidad
  statusBarItem.name = "Export Project Code";

  // Comando enriquecido
  statusBarItem.command = {
    title: "Export Project Code",
    command: "ai-project-export.exportProject",
    tooltip: "Export filtered project files to clipboard with backup",
  };

  // Mostrar el botón
  statusBarItem.show();

  context.subscriptions.push(
    exportProjectCommand,
    exportFolderCommand,
    exportSelectionCommand,
    statusBarItem
  );
}

export function deactivate() {}
