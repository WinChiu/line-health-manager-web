const express = require("express");
const router = express.Router();
const sqlFunction = require("../../SqlFunction");


//Get Post
router.get("/:who", async (req, res) => {
    let data = await sqlFunction.get_data(req.params.who);
    res.send(data);
});

router.get("/", async (req, res) => {
    let data = await sqlFunction.show_tableName();
    res.send(data);
});

router.post("/setwarn", async (req, res) => {
    let warnList = await sqlFunction.set_warn(req.body.names);
    res.status(201).send(warnList);
});

router.post("/createTable/:who", async (req, res) => {
    await sqlFunction.createUser(req.params.who);
    res.status(201);
});

module.exports = router;