#!/usr/bin/env node

// @libs
import inquirer from "inquirer";

function getNestedObject(obj, keys) {
  return keys.reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : undefined;
  }, obj);
}

function mapBlockToInquiries(when, block, path) {
  let inquiries = [];

  if (block.template) {
    if (block.args?.length > 0) {
      for (const argument of block.args) {
        const inquiry = {
          ...argument,
          name: path.join(".") + ".args." + argument.name,
          when: argument.when ? argument.when && when : when,
        };

        inquiries.push(inquiry);
      }
    }
  } else {
    let choices = [];
    let subInquiries = [];
    for (const [choiceName, choiceBlock] of Object.entries(block)) {
      let choice = { name: choiceName, value: choiceName };

      choices.push(choice);

      const choiceWhen = (answers) => {
        return getNestedObject(answers, path) == choiceName;
      };

      subInquiries = [
        ...subInquiries,
        ...mapBlockToInquiries(when && choiceWhen, choiceBlock, [
          ...path,
          choiceName,
        ]),
      ];
    }

    const inquiry = {
      type: "list",
      name: path.join("."),
      when: when,
      choices: choices,
      message: "Choice?",
    };

    inquiries = [...inquiries, inquiry, ...subInquiries];
  }

  return inquiries;
}

function extractChoicePath(answers) {
  const path = [];
  let current = answers;

  while (
    current &&
    typeof current === "object" &&
    current.args == undefined
  ) {
    const keys = Object.keys(current);
    if (keys.length === 0) break;

    // Assuming there is only one key at each level
    const key = keys[0];
    path.push(key);

    current = current[key];
  }

  // If the last value is a primitive (e.g., string), add it to the path
  if (current && typeof current !== "object") {
    path.push(current);
  }

  return path;
}

export default async function getTargetTemplateWithArgs(mappings) {
  const inquiries = mapBlockToInquiries(true, mappings.templates, [
    "templates",
  ]);

  return new Promise((resolve, reject) => {
    inquirer
      .prompt(inquiries)
      .then((answers) => {
        const choicePath = extractChoicePath(answers);
        const targetTemplate = getNestedObject(mappings, choicePath);
        const choiceArgs = getNestedObject(answers, choicePath)?.args || {};

        if (!targetTemplate) {
          reject(new Error("Template not found for the provided choices."));
        } else {
          resolve({ ...targetTemplate, args: choiceArgs });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
