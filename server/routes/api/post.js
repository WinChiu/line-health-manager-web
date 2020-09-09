const express = require("express");
const mysql = require("mysql");
var connection = mysql.createConnection({
    host: "ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "z2v4wxa4d92rulpo",
    password: "g3uqk5s2wyvtoq3r",
    port: 3306,
    database: "vsine0ibs4j6lk5u",
});

const router = express.Router();

//Get Post
router.get("/:who", async (req, res) => {
    let data = await get_data(req.params.who);
    res.send(data);
});

function get_data(name) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${name}`, function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = router;