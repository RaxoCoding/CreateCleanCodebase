# CreateCleanCodebase

[![npm version](https://img.shields.io/npm/v/create-clean-codebase)](https://www.npmjs.com/package/create-clean-codebase)
[![npm downloads](https://img.shields.io/npm/dt/create-clean-codebase.svg?style=flat-square)](http://npm-stat.com/charts.html?package=create-clean-codebase)
[![License](https://img.shields.io/github/license/RaxoCoding/CreateCleanCodebase)](LICENSE)

Create a clean and efficient starting point for any type of project! 🚀

**CreateCleanCodebase** simplifies the process of setting up new development projects by allowing you to select from a variety of well-structured templates. Whether you're starting a Next.js app, a Python script, or a Rust project, kickstart your development with a solid foundation.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Supported Templates](#supported-templates)
- [Template Customization](#template-customization)
- [Creating Custom Templates](#creating-custom-templates)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can use CreateCleanCodebase without installing it globally:

```bash
npx create-clean-codebase@latest
```

Alternatively, install it globally via npm:

```bash
npm install -g create-clean-codebase
```

## Usage

Run the following command to start creating your project:

```bash
npx create-clean-codebase
```

Follow the interactive prompts to select your desired template and customize it according to your needs.

### Example

```bash
$ npx create-clean-codebase

Welcome to CreateCleanCodebase!

Select a template:
- NextJS
  - Basic
  - Supabase
- Python
  - Flask
  - Django
- Rust
  - CLI Tool
  - WebAssembly

What is the name of your project? my-nextjs-app

Creating your project...

Success! Your project 'my-nextjs-app' has been created.
```

## Supported Templates

The following templates are currently available:

### NextJS

- **Basic**: A basic Next.js project with TypeScript support.
- **Supabase**: Next.js with Supabase integration. *(Work in Progress)*

*(More templates coming soon!)*

## Template Customization

Some templates support additional customization through user input. For example, when selecting the **Basic** NextJS template, you might be prompted to provide the project name:

```bash
What is the name of your project? my-project
```

Templates can include an `init.js` script that runs after the template files are copied. This script can modify files based on your input, allowing for dynamic customization of the generated codebase.

## Creating Custom Templates

You can define custom templates for your own use or to contribute to the project. Templates are defined in the `templateMappings.js` file and their corresponding files are stored in the `codebase` directory.

Here's an example of how templates are mapped:

```javascript
// templateMappings.js

const templateMappings = {
  templates: {
    NextJS: {
      Basic: {
        template: true,
        args: [
          {
            type: "input",
            name: "project-name",
            default: "my-project",
            message: "What is the name of your project?"
          },
        ],
        path: "templates/nextjs/typescript/basic/",
      },
      Supabase: {
        template: true,
        path: "templates/nextjs/typescript/supabase/",
      },
    },
  },
};

export default templateMappings;
```

### Adding a New Template

1. **Create the Template Files**: Add your template files to the appropriate directory within `templates/<your_template_path>/codebase`.

2. **Update `templateMappings.js`**: Add your new template to the mappings, specifying any arguments and the path to the template files.

3. **(Optional) Add `init.js`**: If your template requires post-processing, include an `init.js` script in the template directory. This script receives the `rootPath` of the created codebase and any user arguments as an object.

## Contributing

Contributions are welcome! If you have ideas for new templates or improvements, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -am 'feature: Add your feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Happy Coding!*