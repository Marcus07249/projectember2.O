import mongoose from "mongoose";

const connectDb = async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/ember-commerce";
  await mongoose.connect(uri, {
    autoIndex: true
  });
  console.log("MongoDB connected");
};

export default connectDb;
