const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/siliku")
.then(() => console.log("mongoDB connected"))
.catch(err => console.log("mongoDB error", err));

const Person = mongoose.model("person", new mongoose.Schema({ name: String, age: Number, roll_no: String, year: Number, email_id: String, Department: String}, { versionKey: false }));

app.get("/", async (_req, res) => {
    try {
        const people = await Person.find().sort({ name: 1 });
        res.json(people);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(4000, () => console.log("express API server is running in 4000 port"));