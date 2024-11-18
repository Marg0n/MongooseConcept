// getting-started.js
const mongoose = require("mongoose");
import app from "./app"

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
