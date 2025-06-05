# ChatGPT & Claude Code Exporter ⚡

![VS Code](https://img.shields.io/badge/Built%20for-VS%20Code-blue.svg)
![Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/rasbuzz.ai-project-export-pro?label=Marketplace)
![Installs](https://img.shields.io/visual-studio-marketplace/i/rasbuzz.ai-project-export-pro?color=brightgreen)
![Rating](https://img.shields.io/visual-studio-marketplace/r/rasbuzz.ai-project-export-pro)

> **Copy & export your entire project —or just the parts you need—directly to the clipboard in a format tuned for large‑language models such as ChatGPT and Claude.**

---

## ✨ Key Features

|     | Feature                     | Why it matters                                                                                                                 |
| --- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| ⚡  | **One‑Click Full Export**   | Click the status‑bar button or press `Ctrl + Alt + E` to snapshot the whole workspace for instant pasting into ChatGPT/Claude. |
| 📁  | **Selective Folder Export** | Right‑click any folder → **Export Folder Code** – share only what’s relevant.                                                  |
| 🎯  | **Manual File Control**     | Include / exclude individual or multiple files with context‑menu actions; rules persist in `.vscode/project-export.json`.      |
| 🧠  | **Smart Structure Preview** | Auto‑generated tree at the top of the export; large (> 50 files) or black‑listed folders are summarised for readability.       |
| 🚀  | **Advanced Filtering**      | Binary/media/DB assets, build, cache, test, VCS & IDE folders auto‑skipped. Whitelist logic ensures nothing vital is lost.     |
| ⚙️  | **Customisable Limits**     | Tweak max file size (default 1 MB), excluded patterns & more in Settings or `src/config`.                                      |
| 🖥️  | **Status‑Bar Integration**  | “Copy Project Code Now ✨” button is always at hand.                                                                           |
| 🏷️  | **File Decorations**        | A ⚀ badge marks every file that will be exported—instant visual feedback.                                                      |
| 📋  | **Clipboard + Backup**      | Result copied to clipboard **and** written to a temp file (`~/.project_export.tmp`) for peace of mind.                         |

---

## 🚀 Quick Start

### 1 · Install

```text
1. Open VS Code ≥ 1.95.0
2. Press Ctrl + Shift + X and search **ChatGPT & Claude Code Exporter**
3. Click Install – done!
```

### 2 · Full Project Export

```text
• Click the ⚡ status‑bar button              ──or──
• Press Ctrl + Alt + E (re‑assignable)
```

Paste the snapshot straight into ChatGPT, Claude, Gemini … any LLM that accepts large text.

### 3 · Folder‑Only Export

```text
Right‑click a folder in Explorer → Context menu → “Export Folder Code to Clipboard”.
```

### 4 · Manual Include / Exclude

```text
Right‑click file(s) / folder(s) → “Include in Export” or “Exclude from Export”.
Selections are remembered in .vscode/project-export.json.
```

---

## ⚙️ Configuration Highlights

| Setting                          | Description                                | Default                           |
| -------------------------------- | ------------------------------------------ | --------------------------------- |
| `codeExporter.maxFileSize`       | Maximum file size (bytes) to export        | `1048576`                         |
| `codeExporter.blacklistPatterns` | Glob patterns / folders to auto‑exclude    | `node_modules`, `.git`, `dist`, … |
| `codeExporter.previewDepth`      | Folder depth rendered in structure preview | `5`                               |
| `codeExporter.includeBinary`     | Export binary/media files                  | `false`                           |

All options live under **Settings → Extensions → ChatGPT & Claude Code Exporter**. Advanced users can edit the config modules inside `src/config/`.

## 🛠️ Commands & Shortcuts

| Command ID                                                     | Action                     | Default Shortcut |
| -------------------------------------------------------------- | -------------------------- | ---------------- |
| `ai-project-export-pro.exportProject`                          | Full workspace export      | `Ctrl + Alt + E` |
| `project-export.exportFolder`                                  | Export selected folder     | –                |
| `project-export.includeFile` / `excludeFile`                   | Toggle single file         | –                |
| `project-export.includeSelectedFiles` / `excludeSelectedFiles` | Toggle multi‑selection     | –                |
| `project-export.includeFolderFiles` / `excludeFolderFiles`     | Toggle entire folder files | –                |

Customise shortcuts in **File → Preferences → Keyboard Shortcuts**.

---

## 📦 Why Another Code‑Copy Extension?

- **Granular control** – force‑include / exclude and visual badges
- **Structure preview** – know exactly what you’re sending before pasting
- **Token‑friendly** – summaries & limits keep LLM costs in check
- **Model‑agnostic** – works identically with ChatGPT, Claude, Gemini, Copilot …

---

## 💬 Feedback & Support

Found a bug or have a feature idea? [Open an issue](https://github.com/ralungei/vscode-project-export) or join the discussion.

---

## 📜 License

[MIT](LICENSE) – use, fork, improve!

---

> _© 2025 Ras Alungei – Happy exporting & happy prompting!_
