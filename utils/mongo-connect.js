import mongoDb from "mongodb";
import { getConnString } from "./get-config";
import {MONGO_DB} from "./constants";

export let client;
export const mongoConnect = () => {
    if (!client) {
        return new Promise(async (resolve, reject) => {
            let mongoClient = mongoDb.MongoClient;        
            const connString = await getConnString(MONGO_DB);
            try {
                client = await mongoClient.connect(connString, { useUnifiedTopology: true, useNewUrlParser: true })
                resolve(true);
            }
            catch (err) {
                console.log(err.message);
                reject(false);
            }
        })
    }
    else {
        return true;
    }

}    

export default {
    mongoConnect, client
};
