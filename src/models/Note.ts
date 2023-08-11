export interface Note {
  id: string;
  name: string;
  date: Date;
  category: "Task" | "Random Thought" | "Idea";
  content: string;
  archived: boolean;
}

export interface RequestNote {
  id?: string;
  name: string;
  category: "Task" | "Random Thought" | "Idea";
  content: string;
  archived: boolean;
}

export const categories: string[] = ["Task", "Random Thought", "Idea"];

export interface NoteInput extends Required<RequestNote> {}
export interface NoteOuput extends Required<Note> {}
