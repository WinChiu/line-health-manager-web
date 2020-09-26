const express = require("express");
const router = express.Router();
const sqlFunction = require("../../SqlFunction");
const bodyParser = require("body-parser");

// to be delete
router.get("/:who", async (req, res) => {
    let data = await sqlFunction.get_data(req.params.who);
    res.send(data);
});

router.get("/", async (req, res) => {
    let data = await sqlFunction.show_tableName();
    res.send(data);
});
//================

router.post("/sendtable", async (req, res) => {
    let tableData = req.query;
    await sqlFunction.create_user_diseaseTable(tableData.userId);
    await sqlFunction.add_diseaseTable_data(tableData.username, tableData.userId, tableData.usergender, tableData.birthdate, tableData.userphone, tableData.docid, tableData.emergencyphone, tableData.emergencyman, tableData.adress, tableData.metabolism, tableData.nerve, tableData.circle, tableData.tumor, tableData.respiratory, tableData.urinary, tableData.bone, tableData.skin, tableData.blood)
    res.send(tableData);
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