import mongoose from "mongoose";

const USERNAME = process.env.MONGO_USERNAME;
const PASSWORD = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.lo2oqsx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const dbClient = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: "teyvatArchive"
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
export default dbClient;
