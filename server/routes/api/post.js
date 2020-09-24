const express = require("express");
const router = express.Router();
const sqlFunction = require("../../SqlFunction");

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

router.post("/createTable", async (req, res) => {
    await sqlFunction.createUser(req.query.userID);
    res.status(201).send(`create table ${req.query.userID}`);
});

router.post("/addData", async (req, res) => {
    let data = req.query;
    await sqlFunction.addData(data.userID, data.Name, data.Date, data.SBP, data.DBP, data.BloodSugar, data.WalkStep, data.SleepTime, data.DocID, data.Warn, data.LineID);
    res.status(201).send(`add data to ${data.userID}`);
});


module.exports = router;