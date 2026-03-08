import mongoose from "mongoose";

const connect = async () => {
  const uri = process.env.MONGOURI
  try {
    const connection = await mongoose.connect(uri!)
    if (connection) {
      console.log("database connected successfully");
      
    }
  } catch (error) {
    console.log(error);
    
  }
}

export default connect