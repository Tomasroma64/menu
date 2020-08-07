const MongoClient = require("mongodb").MongoClient;
require('dotenv').config()
const dotenv=require('dotenv');

const dbConnectionUrl = process.env.DBURL;

function initialize(dbName, dbCollectionName, successCallback, failureCallback) {
    MongoClient.connect(dbConnectionUrl, { useUnifiedTopology: true }, function (err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err);        // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);

            console.log("[MongoDB connection] SUCCESS");
            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialize
};