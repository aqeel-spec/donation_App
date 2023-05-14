import {Client , Account , Databases , Storage , Locale} from "appwrite";

const client = new Client();

client
  .setEndpoint("http://64.227.134.177/v1")
  .setProject("645740114537e8492e4b");

export const account = new Account(client);

export const database = new Databases(client);

export const storage = new Storage(client);

export const location = new Locale(client);