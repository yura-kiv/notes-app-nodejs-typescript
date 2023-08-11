import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/dbHelper";
import { Note, NoteInput } from "./Note";
import uuid4 from "uuid4";

class NoteSQ extends Model<Note, NoteInput> implements Note {
  public id!: string;
  public name!: string;
  public date!: Date;
  public category!: "Task" | "Random Thought" | "Idea";
  public content!: string;
  public archived!: boolean;
}

NoteSQ.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuid4(),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: () => Date(),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "notes",
  }
);

export default NoteSQ;
