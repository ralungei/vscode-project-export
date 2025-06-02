// src/config/folderBlacklist.ts

/**
 * Carpetas que deben mostrarse de forma resumida en la estructura del proyecto
 * Similar al comportamiento de carpetas con >50 archivos
 */
export const STRUCTURE_BLACKLIST_DIRECTORIES = [
  // Control de versiones
  ".git",
  ".svn",
  ".hg",
  ".bzr",

  // Dependencias
  "node_modules",
  "vendor",
  "__pycache__",
  ".venv",
  "venv",
  "env",
  ".virtualenv",

  // Build y distribución
  "build",
  "dist",
  "out",
  "target",
  "bin",
  "obj",
  "release",
  "debug",
  "_build",
  "_dist",
  "_output",
  "output",

  // Frameworks específicos
  ".next",
  ".nuxt",
  ".svelte-kit",
  ".angular",
  ".vue",
  ".meteor",
  ".ember",
  "_site",
  ".docusaurus",
  ".vuepress",
  ".11ty",
  ".expo",
  ".expo-shared",

  // Cache y temporales
  ".cache",
  ".tmp",
  "tmp",
  "temp",
  ".sass-cache",
  ".parcel-cache",
  ".turbo",
  ".rpt2_cache",
  ".tsbuildinfo",
  ".eslintcache",
  ".stylelintcache",
  ".babel-cache",
  ".webpack",
  ".rollup",

  // Testing y coverage
  "coverage",
  ".nyc_output",
  ".pytest_cache",
  ".mypy_cache",
  "htmlcov",
  "test-results",

  // IDEs y editores
  ".vscode",
  ".idea",
  ".vs",
  ".eclipse",
  ".settings",
  ".sublime",
  ".atom",
  ".brackets",

  // Package managers
  ".yarn",
  ".pnpm-store",
  ".npm",

  // Logs
  "logs",
  "log",
  ".logs",
  "_logs",

  // Otros directorios comunes que pueden ser muy grandes
  "assets",
  "static",
  "resources",
  "uploads",
  "downloads",
  "media",
  "images",
  "videos",
  "fonts",

  // Carpetas de backup
  "backup",
  "backups",
  ".backup",

  // Documentación que puede ser extensa
  "docs",
  "documentation",
  "doc",
];

/**
 * Verifica si una carpeta está en la blacklist y debe mostrarse de forma resumida
 */
export function isBlacklistedDirectory(dirName: string): boolean {
  return STRUCTURE_BLACKLIST_DIRECTORIES.includes(dirName);
}
