import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Use a global variable to store the MongoClient instance to avoid multiple connections in development
const globalWithMongo = global as typeof global & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production, create a new client for every invocation
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
