import { Note } from "../models/Note";

const categories: string[] = ["Task", "Random Thought", "Idea"];

interface Statistic {
  [key: string]: { [key: string]: string | number };
}

export function getNotesStatistic(notes: Note[]) {
  const statistic: Statistic = {};
  categories.forEach((category) => {
    let active = 0;
    let archived = 0;
    notes.forEach((note) => {
      if (note.category === category) {
        note.archived === false ? active++ : archived++;
      }
    });
    statistic[category] = { active, archived };
  });
  return statistic;
}
