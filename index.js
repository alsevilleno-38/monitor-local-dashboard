const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 5500;
const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, "public")));
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
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})