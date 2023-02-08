import { connect, connection } from "mongoose";

export const connectDB = async (DB_URI: string) => {
  console.log("Connecting to database....");
  try {
    await connect(DB_URI);
    console.log("Database connection successful");
  } catch (err) {
    console.log("Unable to connect to database");
  } finally {
    connection.on("error", (error) => {
      console.log(error);
    });
  }
};
