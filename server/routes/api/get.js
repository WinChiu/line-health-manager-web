const express = require("express");
const router = express.Router();
const sqlFunction = require("../../SqlFunction");

router.get("/getdata/:who", async (req, res) => {
    let data = await sqlFunction.get_data(req.params.who);
    res.send(data);
});

router.get("/getalldata", async (req, res) => {
    let data = await sqlFunction.get_all_data();
    res.send(data);
});

router.get("/getdiseasedata", async (req, res) => {
    let data = await sqlFunction.get_all_data();
    res.send(data);
});

module.exports = router;
