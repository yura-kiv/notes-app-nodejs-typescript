import { Note, RequestNote } from "../models/Note";
import { noteAsset } from "./assets/notesAsset";

let notes: Note[] = noteAsset;
const delay = 100;

export const getAllNotes = async (): Promise<Note[]> => {
  await getDelay(delay);
  return notes;
};

export const getNoteById = async (id: string): Promise<Note | undefined> => {
  await getDelay(delay);
  return notes.find((note) => note.id === id);
};

// When creating a note, the id will be generated here
// There is also a possibility that the "archived" property may
// not be available and we will set it as true by default
export const createNote = async (newNote: RequestNote): Promise<void> => {
  await getDelay(delay);
  const id = Math.random().toString(36).substr(2, 10);
  const date = new Date();
  // const archived = newNote?.archived ? newNote.archived : true;
  const note: Note = { ...newNote, id, date };
  notes.push(note);
};

export const toggleNote = async (id: string): Promise<Note | undefined> => {
  await getDelay(delay);
  const note = notes.find((note) => note.id === id);
  if (note) {
    note.archived = !note.archived;
    return note;
  }
};

export const updateNote = async (updatedNote: Note): Promise<void> => {
  // Emulate async operation with a 500ms delay
  await getDelay(delay);
  const index = notes.findIndex((note) => note.id === updatedNote.id);
  if (index !== -1) {
    notes[index] = { ...notes[index], ...updatedNote, date: new Date() };
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  await getDelay(delay);
  notes = notes.filter((note) => note.id !== id);
};

function getDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
