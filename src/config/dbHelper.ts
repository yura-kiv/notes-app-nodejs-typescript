import { Sequelize } from "sequelize";
import { DB_CONFIG } from "./dbConfig";
import NoteSQ from "../models/NoteSQ";
import { Note } from "../models/Note";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: DB_CONFIG.host,
  port: DB_CONFIG.port,
  database: DB_CONFIG.database,
  username: DB_CONFIG.user,
  password: DB_CONFIG.password,
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export async function insertInitialData(initialData: Note[]) {
  try {
    await NoteSQ.sync({ force: true });
    await NoteSQ.bulkCreate(initialData);
    console.log("Initial data seeded successfully.");
  } catch (error) {
    console.error("Error seeding initial data:", error);
  }
}

export { sequelize, testDbConnection };
