## What commands and steps I have used to initialize the project:

- npn init -y
- npm install express --save
- npm install mongoose --save
- npm install typescript --save-dev
- npm i cors
- npm i dotenv
- tsc -init
  - In the "tsconfig.json" find & edit "rootDir": "./src"
  - find & edit "outDir": "./dist"
- Create a folder named 'src' > 'app' > 'config' > 'config.ts', then paste:

  ```ts
  import dotenv from "dotenv";
  import path from "path";

  dotenv.config({ path: path.join((process.pwd(), ".env")) });
  //or
  //dotenv.config({path: path.join(__dirname,'.env')});
  ```

- Create a folder named 'src' > 'app.ts' , paste:

  ```js
  const express = require("express");
  const app = express();
  const port = 3000;

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  ```

- npm i --save-dev @types/node

- Add

  ```json
      "scripts": {
      "build": "tsc",
  }
  ```

  By doing this terminal can convert the ts to js

  ```terminal
  npm run build
  ```

- Create 'src' > 'server.ts' , paste:

  ```js
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  ```

- Create .env file :

  ```
    PORT = 5000

    DATABASE_URL = mongodb+srv://<db_username>:<db_password>@cluster0.smth.mongodb.net/<DBname>?retryWrites=true&w=majority&appName=Cluster0
  ```

- Create .gitignore file and add:

  ```
  .env
  node_modules
  ```
