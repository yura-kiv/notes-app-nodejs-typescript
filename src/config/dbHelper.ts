import { Client } from "pg";
import { DB_CONFIG } from "./dbConfig";
import { Note } from "../models/Note";

const client = new Client(DB_CONFIG);

console.log(DB_CONFIG);

export async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

export async function createTable(tableName: string) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id VARCHAR(36) DEFAULT CAST (gen_random_uuid() AS VARCHAR(36)) PRIMARY KEY,
      name VARCHAR(255),
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      category VARCHAR(255),
      content TEXT,
      archived BOOLEAN
    );
  `;
  await client.query(createTableQuery);
  console.log(`Sucsess. Table ${tableName} created...`);
}

export async function clearTable(tableName: string) {
  const clearTableQuery = `DROP TABLE IF EXISTS ${tableName}`;
  await client.query(clearTableQuery);
  console.log(`Sucsess. Table ${tableName} cleared`);
}

export async function fillInitialTable(tableName: string, noteList: Note[]) {
  const insertQuery = `INSERT INTO ${tableName} (id, name, date, category, content, archived) VALUES ($1, $2, $3, $4, $5, $6)`;

  for (const note of noteList) {
    const values = [note.id, note.name, note.date, note.category, note.content, note.archived];
    await client.query(insertQuery, values);
  }

  console.log(`Sucsess. Table ${tableName} have initial data...`);
}

export default client;
