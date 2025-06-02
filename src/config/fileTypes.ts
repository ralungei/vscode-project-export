// Archivos binarios y compilados
export const BINARY_EXTENSIONS = [
  "exe",
  "dll",
  "so",
  "dylib",
  "bin",
  "obj",
  "o",
  "a",
  "lib",
  "wasm",
  "pyc",
  "pyo",
  "class",
  "jar",
  "war",
  "ear",
  "deb",
  "rpm",
  "dmg",
  "pkg",
  "msi",
  "app",
  "apk",
  "ipa",
  "aab",
];

// Imágenes y multimedia
export const MEDIA_EXTENSIONS = [
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg",
  "ico",
  "webp",
  "mp4",
  "mp3",
  "wav",
  "avi",
  "mov",
  "wmv",
  "flv",
  "mkv",
  "webm",
  "m4v",
  "3gp",
  "aac",
  "flac",
  "ogg",
  "wma",
  "m4a",
  "bmp",
  "tiff",
  "tif",
  "psd",
  "ai",
  "sketch",
  "fig",
  "xd",
  "eps",
  "raw",
  "heic",
  "heif",
];

// Archivos comprimidos
export const ARCHIVE_EXTENSIONS = [
  "zip",
  "tar",
  "gz",
  "rar",
  "7z",
  "bz2",
  "xz",
];

// Cache y temporales
export const CACHE_EXTENSIONS = [
  "lock",
  "log",
  "tmp",
  "temp",
  "cache",
  "bak",
  "swp",
  "swo",
  "swn",
  "orig",
  "rej",
  "~",
  "tmp~",
];

// Bases de datos
export const DATABASE_EXTENSIONS = ["db", "sqlite", "sqlite3", "mdb"];

// Documentos Office
export const OFFICE_EXTENSIONS = [
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "odt",
  "ods",
  "odp",
  "pdf",
  "rtf",
];

// Fuentes
export const FONT_EXTENSIONS = ["ttf", "otf", "woff", "woff2", "eot", "fon"];

// Lock files específicos
export const LOCK_FILES = [
  "package-lock.json",
  "yarn.lock",
  "poetry.lock",
  "Pipfile.lock",
  "composer.lock",
  "Gemfile.lock",
  "pnpm-lock.yaml",
];

// Archivos de entorno y configuración sensible
export const ENV_FILES = [
  ".env",
  ".env.local",
  ".env.production",
  ".env.development",
  ".env.staging",
  ".env.test",
];

// Archivos de sistema
export const SYSTEM_FILES = [
  ".DS_Store",
  "Thumbs.db",
  "desktop.ini",
  "Icon\r",
  "*.pid",
  "*.seed",
  "nohup.out",
  ".gitkeep",
  ".keep",
  "placeholder",
  "VERSION",
  "version.txt",
  "project_code_export.txt",
];

// Directorios de dependencias
export const DEPENDENCY_DIRECTORIES = [
  "node_modules",
  "vendor",
  "__pycache__",
  ".venv",
  "venv",
  "env",
  ".virtualenv",
];

// Directorios de build y distribución
export const BUILD_DIRECTORIES = [
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
  "public",
  "static",
  "assets/dist",
  "compiled",
  ".compiled",
];

// Directorios específicos de frameworks
export const FRAMEWORK_DIRECTORIES = [
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
];

// Directorios de cache y temporales
export const CACHE_DIRECTORIES = [
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
];

// Directorios de testing y coverage
export const TEST_DIRECTORIES = [
  "coverage",
  ".nyc_output",
  ".pytest_cache",
  ".mypy_cache",
  "htmlcov",
  "test-results",
];

// Directorios de control de versiones
export const VCS_DIRECTORIES = [".git", ".svn", ".hg", ".bzr"];

// Directorios de IDEs y editores
export const IDE_DIRECTORIES = [
  ".vscode",
  ".idea",
  ".vs",
  ".eclipse",
  ".settings",
  ".sublime",
  ".atom",
  ".brackets",
  "*.code-workspace",
  ".project",
];

// Directorios de package managers
export const PACKAGE_MANAGER_DIRECTORIES = [".yarn", ".pnpm-store", ".npm"];

// Directorios de logs
export const LOG_DIRECTORIES = ["logs", "log", ".logs", "_logs", "*.log"];
