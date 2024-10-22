// Maps the different templates and their sub-templates available

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