import mongoose from "mongoose";
const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    const uri = process.env.MONGODB_URI; // MongoDB URI from environment variable

    if (!uri) {
      throw new Error("Please add your MongoDB URI to .env.local");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    //         ,
    //         {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     }
    // );
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed.");
  }
};

export default dbConnect;
