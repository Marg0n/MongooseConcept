## Steps by steps commands to initialize the project:

- ```bash
  npn init -y
  ```
- ```bash
  npm install express --save
  ```
- ```bash
  npm install mongoose --save
  ```
- ```bash
  npm install typescript --save-dev
  ```
- ```bash
  npm i cors
  ```
- ```bash
  npm i dotenv
  ```
- ```bash
  tsc -init
  ```

  - In the `tsconfig.json` find & edit

    ```json
    "rootDir": "./src"
    ```

  - find & edit

    ```json
    "outDir": "./dist"
    ```

- Create a folder named `src` > `app` > `config` > `index.ts`, then paste:

  ```ts
  import dotenv from 'dotenv';
  import path from 'path';

  dotenv.config({ path: path.join((process.cwd(), '.env')) });
  //or
  //dotenv.config({path: path.join(__dirname,'.env')});

  export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
  };
  ```

  then further configure like this:

  ```ts
  import mongoose from 'mongoose';
  import app from './app';
  import config from './app/config';

  async function main() {
    try {
      await mongoose.connect(config.database_url as string);

      app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  ```

- Create a folder named `src` > `app.ts` , paste:

  ```js
  import express, { Application, Request, Response } from "express";
  import cors from "cors";
  const app: Application = express();

  // parsers
  app.use(express.json());
  app.use(cors());

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  export default app;
  ```

- ```bash
  npm i --save-dev @types/node
  ```
- ```bash
  npm i --save-dev @types/cors
  ```
- ```bash
  npm i --save-dev @types/express
  ```
- use these changes to `app.ts`

  ```javascript
  import express, { Request, Response } from "express";
  const app = express();
  const port = 3000;

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  export default app;
  ```

- Add `scripts` to json file:

  ```json
      "scripts": {
      "build": "tsc",
  }
  ```

  By doing this terminal can convert the ts to js

  ```terminal
  npm run build
  ```

- Create `src` > `server.ts` , paste:

  ```js
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  ```

- Create `.env` file :

  ```
    PORT = 5000

    DATABASE_URL = mongodb+srv://<db_username>:<db_password>@cluster0.<smth>.mongodb.net/<DBname>?retryWrites=true&w=majority&appName=Cluster0
  ```

- Create `.gitignore` file and add:

  ```
  .env
  node_modules
  dist
  ```

- add the following to `tsconfig.json` :

  ```json
  "include": ["src"], // which files to compile
  "exclude": ["node_modules"], // which files to skip
  ```

- ```bash
  npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
  ```
- ```bash
  npx eslint --init
  ```
- Remodel the `eslint.config.mjs`:

  ```mjs
  import globals from 'globals';
  import pluginJs from '@eslint/js';
  import tseslint from 'typescript-eslint';
  import tsParser from '@typescript-eslint/parser';

  /** @type {import('eslint').Linter.Config[]} */
  export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    {
      languageOptions: {
        globals: globals.node, // Specifies the global variables, making them read-only as required by the flat config system.
        parser: tsParser, // Sets the parser for TypeScript files to ensure ESLint can parse TypeScript syntax correctly.
      },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
      ignores: ['.node_modules/*', 'dist/*'],
      rules: {
        eqeqeq: 'error', // Enforce strict equality
        'no-unused-vars': 'error',
        'no-unused-expressions': 'off', // Disable the original rule
        '@typescript-eslint/no-unused-expressions': 'error', // Use TypeScript-specific rule
        'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
        'no-console': 'warn',
        'no-undef': 'error',
      },
    },
  ];
  ```

- ```bash
  npm remove eslint
  ```
- ```bash
  npm i -D eslint@9.14.0
  ```
- add these scripts to `package.json`

  ```json
  "scripts": {
      "lint": "eslint src/**/*.ts",
      "lint:fix": "eslint src/**/*.ts --fix"
    },
  ```

- To find unused variables
  ```bash
  npm run lint
  ```
- To fix error variables
  ```bash
  npm run lint:fix
  ```
- Add prettier as dev dependencies
  ```bash
  npm i -D --exact prettier
  ```
- create `.prettierrc` and `.prettierignore` file in the root of your project
- Include basic configurations for prettier in the .prettierrc file.

  ```json
  {
    "semi": true,
    "singleQuote": true
  }
  ```

- Also, we need to tell prettier which files to not format So inside `.prettierignore` include the following

  ```
  dist
  coverage
  ```

- Finally we can add scripts for prettier as well in the `package.json` file.

  ```json
  "scripts": {
    "format": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "format:fix": "npx prettier --write src/**/*.ts"
  }
  ```

  Note: For all kinds of format: (skip)

  ```json
  "scripts": {
    "format": "prettier . --write",
    "format:fix": "npx prettier --write src/**/*.ts"
  }
  ```

- You’ll likely run into an issue when a Prettier and ESLint rule overlap. You can try to auto-format your code, but it will show you some conflicts with ESLint.

  The best solution here is to use the `eslint-config-prettier` plugin to disable all ESLint rules that are irrelevant to code formatting, as Prettier is already good at it:

  ```bash
  npm install --save-dev eslint-config-prettier
  ```

- With that installed, let’s go to the `eslint.config.mjs` file, and add prettier at the end of your extends list to disable any other previous rules from other plugins:

  ```mjs
  // eslint.config.mjs
  const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

  module.exports = [
    // Any other config imports go at the top
    eslintPluginPrettierRecommended,
  ];
  ```

- Add TS nodemon like dev dependencies

  ```bash
  npm i ts-node-dev
  ```

- Add the following to `package.json`

  ```json
  "scripts": {
    "start:prod": "node ./dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  }
  ```

- try the following to build in node:

  ```bash
  npm run start:prod
  ```

  or can try to be faster in development environment by (_works same as nodemon_):

  ```bash
  npm run start:dev
  ```

- Add the following to `.env`:

  ```
  NODE_ENV = development #production
  ```
