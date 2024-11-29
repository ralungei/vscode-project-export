import { exec } from "child_process";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "project-export" is now active!');
  vscode.window.showInformationMessage("Project Export extension is active!");

  // Registrar el comando
  const exportCommand = vscode.commands.registerCommand(
    "project-export.exportProject",
    () => {
      const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

      if (!workspacePath) {
        vscode.window.showErrorMessage("No workspace folder found");
        return;
      }

      exec(
        "~/scripts/project2txt.sh",
        { cwd: workspacePath },
        (error, stdout, stderr) => {
          if (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
            return;
          }
          vscode.window.showInformationMessage(
            "Project exported to clipboard!"
          );
        }
      );
    }
  );

  // Crear el botón en la barra de estado (cambiado de Left a Right y añadida prioridad)
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1000 // Alta prioridad para que aparezca más a la izquierda
  );
  statusBarItem.text = "$(files) Export to Clipboard"; // Cambiado el icono y el texto
  statusBarItem.backgroundColor = new vscode.ThemeColor(
    "statusBarItem.warningBackground"
  ); // Añadido color
  statusBarItem.tooltip = "Export project to clipboard"; // Añadido tooltip
  statusBarItem.command = "project-export.exportProject";
  statusBarItem.show();

  context.subscriptions.push(exportCommand, statusBarItem);
}

export function deactivate() {}
