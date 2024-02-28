import mongoose,{Mongoose} from "mongoose";

const MAONGODB_URL = process.env.MONGODB_URL

interface MongooseConnection{
    conn:Mongoose | null;
    promise: Promise<Mongoose> | null
}

let cached:MongooseConnection = (global as any).mongoose

if (!cached){
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    } 
}

export const connectToDatabase = async () =>{
    if (cached.conn) return cached.conn

    if(!MAONGODB_URL) throw new Error("Missing Mongo DB URL")

    cached.promise = cached.promise || mongoose.connect(MAONGODB_URL,{
        dbName:'ImageIn' , bufferCommands: false
    })

    cached.conn = await cached.promise

    return cached.conn
}