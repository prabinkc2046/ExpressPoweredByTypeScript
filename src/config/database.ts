import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongo = process.env.MONGO_URI || '';
    console.log(mongo);
    await mongoose.connect(mongo);
    console.log('DB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
