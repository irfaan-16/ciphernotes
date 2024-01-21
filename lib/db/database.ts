import mongoose,{ConnectOptions} from "mongoose";
let isConnected = false;
let cachedDb: mongoose.Connection;


export const connect = async () => {
  if (cachedDb) {
    return cachedDb;
  }

    const db = await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName:"ciphernotes",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  cachedDb = db.connection;
  return cachedDb;
};
export default connect;
