# Change Log

All notable changes to the "AI Project Export Pro" extension will be documented in this file.

## [2.0.0] - 2025-06-02

### Added

- **🎯 Manual File Control System**: Revolutionary file inclusion/exclusion system

  - Right-click context menu options for individual files: "Include in Export" / "Exclude from Export"
  - Multi-selection support: Select multiple files and include/exclude them all at once
  - Folder-level control: Include or exclude all files within a folder with one click
  - Visual file decorations: Files included in export now show a ⚡ badge in the explorer
  - Persistent exceptions: Your manual selections are saved in `.vscode/project-export.json`

- **📁 Enhanced File Structure Generation**:

  - Intelligent folder summarization for large directories (>50 files)
  - Blacklisted directories (node_modules, .git, etc.) show item count instead of full content
  - Better visual representation of project structure

- **🔧 Advanced Configuration System**:

  - Comprehensive file type filtering with categorized exclusions
  - File size limits (1MB default) to prevent large files from breaking exports
  - Modular configuration split across multiple files for better maintainability

- **⚡ Smart Export Logic**:
  - Force include/exclude system overrides default filtering rules
  - Batch operations for multiple files and folders
  - Improved error handling for unreadable files/directories

### Changed

- **Complete codebase refactoring**: Split into modular components for better maintainability
- **Enhanced filtering system**: Now uses whitelist approach (include by default) instead of extension-based filtering
- **Improved user experience**: More intuitive file selection with visual feedback
- **Better performance**: Optimized directory traversal and file processing

### Updated

- **Rebranding**: Extension name changed to "ChatGPT & Claude Code Exporter" for better AI tool alignment
- **Enhanced Documentation**: Comprehensive README with feature highlights, quick start guide, and configuration details
- **Visual Improvements**: File decoration badge changed from ⚡ to ⚀ for better distinction
- **Command Consistency**: All command IDs now use standardized `ai-project-export-pro` prefix
- **Marketplace Optimization**: Updated keywords and description for improved discoverability

### Technical Improvements

- New `ExceptionsManager` class for handling manual file inclusions/exclusions
- `FileDecorationProvider` for visual file status indicators
- Comprehensive file type definitions in separate configuration modules
- Better error handling and user feedback throughout the extension

## [1.1.0] - 2025-03-26

### Added

- Folder context menu export - right-click any folder to export just that section
- Project structure visualization at the beginning of exported content
- Support for additional file types including:
  - Template files (Jade, Pug, Vue, Svelte)
  - Programming languages (PHP, Ruby, Go, Java, C/C++, C#, Swift, Kotlin, Rust)
  - Style files (CSS, SCSS, LESS, SASS)
  - Shell scripts

### Changed

- Improved export presentation with folder structure
- Updated README to reflect new functionality
- Enhanced filtering capabilities for better export results

## [1.0.0] - Initial Release

- One-click project export functionality
- Smart filtering of unnecessary files
- Clipboard-ready export format for AI tools
- Status bar integration
