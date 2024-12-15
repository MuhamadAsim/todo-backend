// import mongoose from "mongoose";

// const connectDB=async()=>{

//     try{
//        const connection= await mongoose.connect("mongodb://localhost:27017/todo");
//     }
//     catch(error){
//        console.log(`Error: ${error}`);
//     }
// }

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // MongoDB Atlas connection string
    const connection = await mongoose.connect(
      "mongodb+srv://asimuser:asimuser123525@cluster0.zvn8q.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default connectDB;

