import express from "express";
import bodyParser from "body-parser";
import notesRoutes from "./routes/notesRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use("/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
