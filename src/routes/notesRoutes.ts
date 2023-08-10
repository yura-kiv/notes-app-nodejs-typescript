import { Router, Request, Response } from "express";
import * as notesService from "../services/notesService";
import { formError } from "../helpers/formError";
import { ValidationError } from "yup";
import { getNotesStatistic } from "../helpers/getNotesStatistic";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const notes = await notesService.getAllNotes();
  res.json(notes);
});

router.get("/statistic", async (req: Request, res: Response) => {
  const notes = await notesService.getAllNotes();
  const stats = getNotesStatistic(notes);
  res.json(stats);
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const note = await notesService.getNoteById(id);
  if (!note) {
    res.status(404).json({ error: "Note not found" });
  } else {
    res.json(note);
  }
});

router.post("/toggle/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const note = await notesService.toggleNote(id);
  if (!note) {
    res.status(404).json({ error: "Note not found" });
  } else {
    res.json(note);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const newNote = req.body;
  try {
    await notesService.createNote(newNote);
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: formError(error) });
    } else res.status(400).json({ error });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedNote = req.body;
  updatedNote.id = id;
  try {
    await notesService.updateNote(updatedNote);
    res.json({ message: "Note updated successfully" });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: formError(error) });
    } else res.status(400).json({ error });
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  notesService.deleteNote(id);
  res.json({ message: "Note deleted successfully" });
});

export default router;
