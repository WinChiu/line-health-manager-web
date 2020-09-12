const mysql = require("mysql");
var connection = mysql.createConnection({
    host: "ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "z2v4wxa4d92rulpo",
    password: "g3uqk5s2wyvtoq3r",
    port: 3306,
    database: "vsine0ibs4j6lk5u",
});

const sqlFunction = {
    get_data(name) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ${name}`, function (err, rows, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },
    show_tableName() {
        return new Promise((resolve, reject) => {
            connection.query(`SHOW tables`, function (err, tables, fields) {
                if (err) {
                    reject(err);
                } else {
                    var nameList = [];
                    tables.forEach((el) => {
                        nameList.push(el.Tables_in_vsine0ibs4j6lk5u);
                    });
                    resolve(tables);
                }
            });
        });
    },
    async set_warn(namelist) {
        namelist = ["ben", "iris", "win"];
        warnList = [];
        namelist.forEach((el) => {
            connection.query(`SELECT WalkStep FROM ${el}`, function (err, data, fields) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].WalkStep < 1200) {
                        connection.query(
                            `UPDATE ${el} set Warn =? WHERE WalkStep = ?`,
                            [1, data[i].WalkStep],
                            function (err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(result);
                                }
                            }
                        );
                    }
                }
            });
        });
    },
};

module.exports = sqlFunction;
