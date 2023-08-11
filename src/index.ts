import express from "express";
import bodyParser from "body-parser";
import notesRoutes from "./routes/notesRoutes";
import { testDbConnection } from "./config/dbHelper";
import { insertInitialData } from "./config/dbHelper";
import { noteAsset } from "./assets/notesAsset";

const app = express();
const PORT = process.env.PORT || 8080;

testDbConnection();
insertInitialData(noteAsset);

app.use(bodyParser.json());
app.use("/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
