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
