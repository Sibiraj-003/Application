//step one: Load the packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


//Step two : Create the express app
const app = express();
//Tell the app : "If any request has JSON data", understand it"
app.use(express.json());
//Tell the app: :Allow other URL's to interact and share"
app.use(cors());

//Step three: Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/testdb")
//if connections works
.then(() => console.log("Mongoose connected"))
//if connection fails
.catch(err => console.log("Connection Error", err));
//Step Four: Define Models
const Person = mongoose.model("Person", {name: String, age: Number},
{versionkey: false});

//Step Five: Define Crud Routes GET/POST/PUT/DELETE
//Read - (GET request )
//when user goes to Server URL with GET menthod -> Fetch all people from MingoDB,
//Sort name and Send back as JSON to browser
app.get("/", async (_req, res) => {
    try{
        const people = await Person.find().sort({name: 1});
        res.json(person); //Send the list json to browser
    } catch(e){
        res.status(500).json({error: e.message});
    }
});

//Step six: Start the Server
//Tell Express to start listening on port 4000
app.listen(4000, () => console.log("Express API Server is running in 4000 port"));