import express from "express";
import bodyParser from "body-parser";
import { clearTable, connectDB, createTable, fillInitialTable } from "./config/dbHelper";
import notesRoutes from "./routes/notesRoutes";
import { NOTES_TABLE_NAME } from "./config/dbConfig";
import { noteAsset } from "./assets/notesAsset";

//initial work with db
connectDB();
clearTable(NOTES_TABLE_NAME);
createTable(NOTES_TABLE_NAME);
fillInitialTable(NOTES_TABLE_NAME, noteAsset);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use("/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
