const express = require("express");

const router = express.Router();

const rest = require("../models/newMenu");

router.get("/", async(req, res) => {
    // console.log(await rest.find())
    // res.json(await rest.find())

    res.render('../views/index', { title: 'Hey', message: "res.params.restaurantNam" })
});

router.post("/newRest", (req, res) => {
    const newRest = new rest({
        name: req.body.name, 
        description: req.body.description
    });

    newRest.save()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({"error":err})
    })
})

module.exports = router;