var express = require('express');
var app = express();
app.use(express.json());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();
app.use(bodyParser.json())
app.use(express.json());       

const dotenv = require('dotenv');

app.use(express.static(__dirname + "/public"));

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(process.env.DOMAINNAME || ('http://localhost:' + port));
});



const db = require("./db");
const dbName = "test";
const collectionName = "collectionname";

db.initialize(dbName, collectionName, function (dbCollection) {

    app.post('/nameAvailable', async (req, res) => {
        console.log(req.body.name);
        await dbCollection.findOne({ name: req.body.name }, (err, result) => {
            if (err) throw err;

            let available = result === null ? true : false;
            console.log(available)
            res.json({
                "searched": req.body.name,
                available: available
            });
            return true;
        });
        
    });



    app.get("/menu/:restaurantName", function (req, res) {

    });


}, function (err) { // failureCallback
    throw (err);
});


app.get('/newMenu', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

