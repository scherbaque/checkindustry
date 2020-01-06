import mongoose from 'mongoose';

const connectDB = async () => {
  const MONGO_URI =
    process.env.MONGO_URI ||
    'mongodb+srv://annashcherbak:rrwVzULofHtZjKvu@annashcherbak-oaoxl.mongodb.net/annashcherbak?';
  const conn = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

export default connectDB;
