import { MongoClient } from '../../deps.ts';

class MongoDatabase {
  public client: MongoClient;
  private static instance: MongoDatabase;
  private MONGO_URL: string;
  private DB_NAME: string;
  constructor() {
    console.log('Connecting to mongo');
    this.MONGO_URL = Deno.env.get('MONGO_URL') || 'mongodb://localhost:27017';
    this.DB_NAME = Deno.env.get('DB_NAME') || 'todo';
    this.client = {} as MongoClient;
  }

  connect() {
    const mongoClient = new MongoClient();
    mongoClient.connectWithUri(this.MONGO_URL);
    this.client = mongoClient;
  }

  get getDatabase() {
    return this.client.database(this.DB_NAME);
  }

  static getInstance(): MongoDatabase {
    if (!MongoDatabase.instance) {
      MongoDatabase.instance = new MongoDatabase();
    }
    MongoDatabase.instance.connect();
    return MongoDatabase.instance;
  }
}

export default MongoDatabase;
