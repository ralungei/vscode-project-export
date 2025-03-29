import * as path from "path";
import * as vscode from "vscode";
import { ProjectExporter } from "./projectExporter";

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "project-export" is now active!');

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
    command: "ai-project-export-pro.exportProject",
    tooltip: "Export filtered project files to clipboard with backup",
  };

  // Mostrar el botón
  statusBarItem.show();

  context.subscriptions.push(
    exportProjectCommand,
    exportFolderCommand,
    statusBarItem
  );
}

export function deactivate() {}
