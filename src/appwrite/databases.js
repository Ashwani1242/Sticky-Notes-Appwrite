import { databases, collections } from "./config";
import { ID, Query } from "appwrite";

const db = {};

collections.forEach((collection) => {
    db[collection.name] = {
        create: async (userId, payload, id = ID.unique()) => {
            return await databases.createDocument(
                collection.dbId,
                collection.id,
                id,
                { ...payload, userId }
            );
        },
        update: async (id, payload) => {
            return await databases.updateDocument(
                collection.dbId,
                collection.id,
                id,
                payload
            );
        },
        delete: async (id) => {
            return await databases.deleteDocument(
                collection.dbId,
                collection.id,
                id
            );
        },
        get: async (id) => {
            return await databases.getDocument(
                collection.dbId,
                collection.id,
                id
            );
        },
        list: async (userId) => {
            return await databases.listDocuments(
                collection.dbId,
                collection.id,
                [Query.equal('userId', userId)] 
            );
        },
    };
});

export { db };

