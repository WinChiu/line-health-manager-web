const express = require("express");
//const mariadb = require("mariadb");
const app = express();
const PORT = process.env.PORT || 7000;
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "z2v4wxa4d92rulpo",
    password: "g3uqk5s2wyvtoq3r",
    port: 3306,
    database: "vsine0ibs4j6lk5u",
});

async function get_data(name) {
    connection.connect();
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${name}`, function (err, rows, fields) {
            if (err) {
                reject("no data");
            } else {
                resolve(rows);
            }
        });
    });
}

app.set("view engine", "ejs");
app.use("/", express.static(__dirname));

app.get("/", (req, res) => {
    res.send("hello world");
});

app.get("/users/:who", async (req, res) => {
    let data = await get_data(req.params.who);
    connection.end();
    console.log(data);
    res.render("default", {
        title: "首頁",
        user: req.params.who,
        datas: data,
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Fail to run server on port ${PORT} \n`);
        console.log(err);
    } else {
        console.log(`Server running on port ${PORT}`);
    }
});
