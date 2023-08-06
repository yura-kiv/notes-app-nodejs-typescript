"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notesService = __importStar(require("../services/notesService"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const notes = notesService.getAllNotes();
    res.json(notes);
});
router.get("/stats", (req, res) => {
    // Calculate aggregated data statistics here based on notes
    // This is just a placeholder since we don't have real data
    const stats = { totalNotes: 7, archivedNotes: 3 };
    res.json(stats);
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const note = notesService.getNoteById(id);
    if (!note) {
        res.status(404).json({ error: "Note not found" });
    }
    else {
        res.json(note);
    }
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = req.body;
    try {
        yield notesService.createNote(newNote);
        res.status(201).json({ message: "Note created successfully" });
    }
    catch (error) {
        let msg = error.message;
        res.status(400).json({ error: msg });
    }
}));
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedNote = req.body;
    updatedNote.id = id;
    try {
        yield notesService.updateNote(updatedNote);
        res.json({ message: "Note updated successfully" });
    }
    catch (error) {
        let msg = error.message;
        res.status(400).json({ error: msg });
    }
}));
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    notesService.deleteNote(id);
    res.json({ message: "Note deleted successfully" });
});
exports.default = router;
