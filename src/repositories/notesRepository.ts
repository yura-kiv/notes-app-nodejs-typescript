import { Note, RequestNote } from "../models/Note";
import client from "../config/dbHelper";
import { NOTES_TABLE_NAME as table } from "../config/dbConfig";

export const getAllNotes = async (): Promise<Note[]> => {
  const query = `SELECT * FROM ${table} notes`;
  const result = await client.query(query);
  return result.rows;
};

export const getNoteById = async (id: string): Promise<Note | undefined> => {
  const query = `SELECT * FROM ${table} WHERE id = $1`;
  const result = await client.query(query, [id]);
  return result.rows[0];
};

export const createNote = async (newNote: RequestNote): Promise<void> => {
  const insertQuery = `INSERT INTO ${table} (name, category, content, archived) VALUES ($1, $2, $3, $4)`;
  const values = [newNote.name, newNote.category, newNote.content, newNote.archived || true];
  await client.query(insertQuery, values);
};

export const toggleNote = async (id: string): Promise<Note | undefined> => {
  const updateQuery = `UPDATE ${table} SET archived = NOT archived WHERE id = $1 RETURNING *`;
  const result = await client.query(updateQuery, [id]);
  return result.rows[0];
};

export const updateNote = async (updatedNote: Note): Promise<void> => {
  const updateQuery = `UPDATE ${table} SET name = $2, category = $3, content = $4, archived = $5 WHERE id = $1`;
  const values = [
    updatedNote.id,
    updatedNote.name,
    updatedNote.category,
    updatedNote.content,
    updatedNote.archived,
  ];
  await client.query(updateQuery, values);
};

export const deleteNote = async (id: string): Promise<void> => {
  const deleteQuery = `DELETE FROM ${table} WHERE id = $1`;
  await client.query(deleteQuery, [id]);
};
