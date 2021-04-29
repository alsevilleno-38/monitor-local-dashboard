import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import {mongoConnect, client} from "./utils/mongo-connect";
import { simulateLatency } from "./utils/helper"

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
    // console.log(emailToFind)    
    const count = await client.db("tech").collection("users").find({email: emailToFind}).count();        
    res.status(210).json({isExist: count >= 1});
})
app.post("/login", async (req, res, next) => {
    const loginData = req.body;
    const users = client.db("tech").collection("users");
    try {
        const user = await users.findOne({email: loginData.email, password: loginData.password});
        const isExist = user != null;
        simulateLatency(() => {
            // console.log("login");
            res.status(210).json({isExist});
        }, 0)

    }
    catch (e) {
        console.log(e.message);
        simulateLatency(() => {
            res.status(402).json("There is an error");
        }, 0)
    }

})
app.post("/submit", async (req, res, next) => {
    const formData = req.body;
    // console.log(req.body);
    const users = client.db("tech").collection("users");
    try {
        const result = await users.insertOne({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            createdDate: new Date(),
            lastLogin: null,
            lastLogout: null
        })
        simulateLatency(() => {
            res.status(210).json(result);
        })
    }
    catch (e) {
        console.log(e.message);
        simulateLatency(() => {
            res.status(402).json("There is an error");
        })
    }
    
})
app.listen(PORT, async () => {
    await mongoConnect();
    console.log(`Server listening at port ${PORT}...`);
})