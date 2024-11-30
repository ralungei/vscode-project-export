import * as vscode from "vscode";
import { ProjectExporter } from "./projectExporter";

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "project-export" is now active!');

  const exportCommand = vscode.commands.registerCommand(
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

  // Crear el botón en la barra de estado con alta prioridad
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100000 // Prioridad muy alta para asegurar que aparece al principio
  );

  // Personalizar el aspecto del botón para hacerlo más visible
  statusBarItem.text = "$(file-code) Copy Project Code ✨"; // Icono más llamativo

  // Usar un color más prominente
  statusBarItem.backgroundColor = new vscode.ThemeColor(
    "statusBarItem.warningBackground"
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
    command: "project-export.exportProject",
    tooltip: "Export filtered project files to clipboard with backup",
  };

  // Mostrar el botón
  statusBarItem.show();

  context.subscriptions.push(exportCommand, statusBarItem);
}

export function deactivate() {}
