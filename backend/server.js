import dotenv from "dotenv";
dotenv.config();

console.log("CLIENT_URL:", process.env.CLIENT_URL);
import app from "./src/app.js";
import connectDB from "./src/config/db.config.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();