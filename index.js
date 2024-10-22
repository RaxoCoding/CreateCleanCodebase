#!/usr/bin/env node

// @libs
import chalk from "chalk";

// @local
import templateMappings from "./templateMappings.js";
import getTargetTemplateWithArgs from "./utils/getTargetTemplateWithArgs.js";
import copyCodebase from "./utils/copyCodebase.js";
import runInit from "./utils/runInit.js";

async function init() {
  console.log("Easily create a clean codebase!")

  const targetTemplate = await getTargetTemplateWithArgs(templateMappings);

  console.log("Generating codebase...");

  await copyCodebase(targetTemplate.path + "/codebase", "./codebase/");

  console.log("Finished generating codebase");

  console.log("Running init script...");

  await runInit(targetTemplate.path + "/init.js", "./codebase/", targetTemplate.args);

  console.log("Project setup finished!");
}

init();