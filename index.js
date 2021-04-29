import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import {mongoConnect, client} from "./utils/mongo-connect";

const PORT = process.env.PORT || 5500;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors())
app.use(express.static(path.join(process.env.PWD, "public")));
// GET carts (/carts)
app.get("/carts", (req, res, next) => {
    fs.readFile(path.join(__dirname, "data", "carts.json"), "utf8", (err, data) => {
        if (err) {
            console.log("Error Occurred!");
            console.log(`Details: ${err.message}`);
            process.exit(10);
        };
        res.set({
            "content-type": "application/json"
        });
        res.send(data);
    })
})
app.post("/test", async (req, res, next) => {    
    const emailToFind = req.body.newEmail;
    console.log(emailToFind)    
    const count = await client.db("tech").collection("users").find({email: emailToFind}).count();        
    res.status(210).json({isExist: count >= 1});
})
app.listen(PORT, async () => {
    await mongoConnect();
    console.log(`Server listening at port ${PORT}...`);
})