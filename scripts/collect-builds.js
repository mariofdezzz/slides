import { existsSync, mkdirSync, readdirSync, renameSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packagesDir = join(__dirname, "../slides");
const distDir = join(__dirname, "../dist");

if (!existsSync(distDir)) {
  mkdirSync(distDir);
}

for (const pkg of readdirSync(packagesDir)) {
  const pkgDist = join(packagesDir, pkg, "dist");

  if (existsSync(pkgDist)) {
    const target = join(distDir, pkg);
    renameSync(pkgDist, target);
  }
}
