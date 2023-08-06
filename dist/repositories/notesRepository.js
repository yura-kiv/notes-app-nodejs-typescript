"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = exports.getAllNotes = void 0;
let notes = [
    {
        id: "1",
        name: "Note 1",
        date: new Date(),
        category: "Category 1",
        content: "Content 1",
        archived: false,
    },
    // Add more pre-populated notes here
];
const getAllNotes = () => notes;
exports.getAllNotes = getAllNotes;
const getNoteById = (id) => notes.find((note) => note.id === id);
exports.getNoteById = getNoteById;
const createNote = (newNote) => {
    notes.push(newNote);
};
exports.createNote = createNote;
const updateNote = (updatedNote) => {
    const index = notes.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
        notes[index] = Object.assign(Object.assign({}, notes[index]), updatedNote);
    }
};
exports.updateNote = updateNote;
const deleteNote = (id) => {
    notes = notes.filter((note) => note.id !== id);
};
exports.deleteNote = deleteNote;
