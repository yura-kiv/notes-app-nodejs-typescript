import { NoteInput, NoteOuput } from "../models/Note";
import NoteSQ from "../models/NoteSQ";

export const getAllNotes = async (): Promise<NoteOuput[]> => {
  const notes = await NoteSQ.findAll();
  return notes;
};

export const getNoteById = async (id: string): Promise<NoteOuput | undefined> => {
  const note = await NoteSQ.findByPk(id);
  if (note) {
    return note;
  }
  return undefined;
};

export const createNote = async (newNote: NoteInput): Promise<void> => {
  await NoteSQ.create(newNote);
};

export const toggleNote = async (id: string): Promise<NoteOuput | undefined> => {
  const note = await NoteSQ.findByPk(id);
  if (note) {
    note.archived = !note.archived;
    await note.save();
    return note;
  }
  return undefined;
};

export const updateNote = async (updatedNote: NoteInput): Promise<void> => {
  const note = await NoteSQ.findByPk(updatedNote.id);
  if (note) {
    await note.update(updatedNote);
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  const note = await NoteSQ.findByPk(id);
  if (note) {
    await note.destroy();
  }
};
