const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());


app.use(express.static(__dirname + "/public"));

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(process.env.DOMAINNAME || ('http://localhost:' + port));
});

const pug = require('pug');
app.set('view engine', 'pug')

const mongoose = require("mongoose")
require('dotenv').config()
mongoose.connect(
    process.env.DBURL,
    {
        // useMongoClient: true
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const newMenuRoutes = require("./routes/newMenu");
app.use("/", newMenuRoutes);

const existingMenuRoutes = require("./routes/existingMenu");
app.use("/menu/", existingMenuRoutes);


// const db = require("./db");
// const dbName = "test";
// const collectionName = "collectionname";

// var restaurantExsists;

// db.initialize(dbName, collectionName, function (dbCollection) {


//     restaurantExsists = async function (restaurantName) {
//         return await dbCollection.findOne({ name: restaurantName }, (err, result) => {
//             if (err) throw err;

//             return result === null; // Empty = unique name
//         });
//     }

// }, function (err) { // failureCallback
//     throw (err);
// });


// app.post('/nameAvailable', async (req, res) => {

//     let restaurantName = req.body.name;
//     res.json({
//         "searched": restaurantName,
//         available: restaurantExsists(restaurantName)
//     });

// });


// app.get("/:restaurantName", function (req, res) {
//     console.log(req.params.restaurantName);
//     (!restaurantExsists(req.params.restaurantName)) ? res.send("bad") : null;
//     res.render('index', { title: 'Hey', message: "res.params.restaurantNam" })
// });


