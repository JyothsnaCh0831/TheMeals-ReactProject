var express = require("express");
var cors = require("cors");
const { default: axios } = require("axios");
var mongoClient = require("mongodb").MongoClient;

// MongoDB Connection
const connectStr = "mongodb://127.0.0.1:27017";

// Express object 
var app = express();

// Using Cors
app.use(cors());

// To transform data to JSON
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

// To get all users details
app.get("/register", (req, res) => {
    mongoClient.connect(connectStr).then((clientObj) => {
        var db = clientObj.db("mealsdb");
        db.collection("users").find({}).toArray().then((documents) => {
            res.send(documents);
            res.end();
        });
    });
});

// Registering a new user
app.post("/register", (req, res) => {

    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    mongoClient.connect(connectStr).then((clientObj) => {
        var db = clientObj.db("mealsdb");
        db.collection("users").insertOne(user).then(() => {
            console.log("New user registered successfully");
            res.send();
        });
    }); 
});

// To get all users details
app.get("/login", (req, res) => {
    mongoClient.connect(connectStr).then((clientObj) => {
        var db = clientObj.db("mealsdb");
        db.collection("users").find({}).toArray().then((documents) => {
            res.send(documents);
            res.end();
        });
    });
});

// To get list of categories
app.get("/", (req, res) => {
    axios({
        method: "get",
        url: "https://www.themealdb.com/api/json/v1/1/categories.php"
    }).then((response) => {
        res.send(response.data);
    })
})

// To get details of a category
app.get("/getCategory/:name", (req, res) => {
    var category = req.params.name;
    axios({
        method: "get",
        url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    }).then((response) => {
        res.send(response.data);
    });
});

// To get details of the meal
app.get("/getMealDetails/:id", (req, res) => {
    var id = req.params.id;
    axios({
        method: "get",
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    }).then((response) => {
        res.send(response.data);
    });
});

// Get a random meal
app.get("/randomMeal", (req, res) => {
    axios({
        method: "get",
        url: "https://www.themealdb.com/api/json/v1/1/random.php"
    }).then((response) => {
        res.send(response.data.meals[0].idMeal);
    });
});


app.listen(1500);
console.log("Server running at: http://127.0.0.1:1500");