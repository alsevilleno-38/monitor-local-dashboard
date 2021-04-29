import fs from "fs";
import path from "path";
import {MONGO_DB} from "./constants";

export const getConnString = (connType) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(process.env.PWD, "config.json"), "utf8", (err, data) => {        
            if (err) {
                console.log("Unable to connect");
                reject(null);
            }
            const configs = JSON.parse(data);
            const config = configs.map(c => {
                if (c.type == connType) {
                    return c;
                }
            })[0];
            let connectionString = "";
            const username = config["username"];
            const password = config["password"];
            const clusterName = config["clusterName"];
            const db = config["db"];
            const protocol = config["protocol"];
    
            switch (config.type) {
                case (MONGO_DB):
                    connectionString = `${protocol}://${username}:${password}@${clusterName}/${db}?`;
                    break;
                default:
                    connectionString = "";
                    break;
            }
            resolve(connectionString);
        })
    })
    
}

export default {
    getConnString
}