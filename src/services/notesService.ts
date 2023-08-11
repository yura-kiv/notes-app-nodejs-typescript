import { Note, NoteInput, NoteOuput, RequestNote } from "../models/Note";
import * as notesRepository from "../repositories/notesRepository";
import { noteSchema, requestNoteSchema } from "../helpers/validateNoteSchema";

export const getAllNotes = (): Promise<Note[]> => {
  return notesRepository.getAllNotes();
};

export const getNoteById = (id: string): Promise<Note | undefined> => {
  return notesRepository.getNoteById(id);
};

export const toggleNote = async (id: string): Promise<NoteOuput | undefined> => {
  return notesRepository.toggleNote(id);
};

export const createNote = async (newNote: NoteInput): Promise<void> => {
  await requestNoteSchema.validate(newNote, { abortEarly: false });
  await notesRepository.createNote(newNote);
};

export const updateNote = async (updatedNote: Note): Promise<void> => {
  await requestNoteSchema.validate(updatedNote, { abortEarly: false });
  await notesRepository.updateNote(updatedNote);
};

export const deleteNote = async (id: string): Promise<void> => {
  await notesRepository.deleteNote(id);
};
