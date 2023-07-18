import { Client, Databases, Functions, Storage, Account } from "appwrite";
import { Database } from "react-feather";

const client = new Client();

export const VITE_ENDPOINT = import.meta.env.VITE_ENDPOINT;
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const DEV_DB_ID = import.meta.env.VITE_DB_ID;
export const COLLECTION_ID_THREADS = import.meta.env.VITE_COLLECTION_ID_THREADS;
export const BUCKET_ID_IMAGES = import.meta.env.VITE_BUCKET_ID_IMAGES;
export const COLLECTION_ID_PROFILES = import.meta.env.VITE_COLLECTION_ID_PROFILES

client.setEndpoint(VITE_ENDPOINT).setProject(PROJECT_ID);

export const database = new Databases(client);
export const functions = new Functions(client);
export const storage = new Storage(client);
export const account = new Account(client);
export default client;
 