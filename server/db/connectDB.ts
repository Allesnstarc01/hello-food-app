// mongoPassword=jhYRrHwy2jWPaSdV;
//mongoUsername =starcallen2000711
import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("DB Conected");
  } catch (error) {
    console.log(error);
  }
};
export default ConnectDB;