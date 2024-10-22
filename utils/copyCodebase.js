// @libs
import fs from "fs";
import path from "path";

export default async function copyCodebase(source, destination) {
  const currentDir = process.cwd();
  const projectDir = path.resolve(currentDir, destination);

  fs.mkdirSync(projectDir, { recursive: true });

	const moduleDir = import.meta.url.replace("file://", "").replace("utils/copyCodebase.js", "");
  const templateDir = path.resolve(moduleDir, source);
  fs.cpSync(templateDir, projectDir, { recursive: true });
}
