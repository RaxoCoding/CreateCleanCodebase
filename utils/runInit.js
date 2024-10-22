// @libs
import path from "path";

export default async function runInit(initPath, codebasePath, args) {
	const currentDir = import.meta.url.replace("file://", "").replace("utils/runInit.js", "");
  const initFile = path.resolve(currentDir, initPath);
	const rootPath = path.resolve(codebasePath);

	try {
    // Dynamically import the module at initFile
    const module = await import(initFile);

    // Check if the default export is a function
    if (module && typeof module.default === 'function') {
      // Call the default exported function with the provided arguments
      await module.default(rootPath, args);
    } else {
      throw new Error('The module does not export a default function.');
    }
  } catch (error) {
    console.error(`Error running init function from ${initFile}:`, error);
    throw error; // Re-throw the error after logging it
  }
}
