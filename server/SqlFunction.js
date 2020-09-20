const mysql = require("mysql");
var connection = mysql.createConnection({
    host: "ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "z2v4wxa4d92rulpo",
    password: "g3uqk5s2wyvtoq3r",
    port: 3306,
    database: "vsine0ibs4j6lk5u",
});

function warnPatientInfo() {
    this.Name = null,
        this.SBP = [],
        this.DBP = [],
        this.BloodSugar = [],
        this.WalkStep = [],
        this.SleepTime = []
}

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
    detect_walkStep(el, warnList) {
        return new Promise((resolve, reject) => {
            var warnPatient = new warnPatientInfo();
            connection.query(`SELECT WalkStep FROM ${el}`, function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    let sthWrong = false;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].WalkStep < 1200) {
                            warnPatient.Name = el.charAt(0).toUpperCase() +
                            el.slice(1);;
                            warnPatient.WalkStep.push(data[i].WalkStep);
                            sthWrong = true;
                        }
                    }
                    if (sthWrong === true) {
                        warnList.push(warnPatient);
                    }
                    resolve(true);
                }
            });
        })

    },
    async set_warn(namelist) {
        namelist = ["ben", "iris", "win"];
        warnList = [];
        for (let i = 0; i < namelist.length; i++) {
            let temp = await this.detect_walkStep(namelist[i], warnList);
        }
        return warnList;
    },
};

module.exports = sqlFunction;