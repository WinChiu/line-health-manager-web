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
    create_user_diseaseTable(userID) {
        return new Promise((resolve, reject) => {
            userID = userID + "_diseaseTable";
            connection.query(`CREATE TABLE ${userID} (
                username VARCHAR(100),
                userId VARCHAR(100),
                usergender VARCHAR(100),
                birthdate VARCHAR(100),
                userphone VARCHAR(100),
                docid VARCHAR(100),
                emergencyphone VARCHAR(100),
                emergencyman VARCHAR(100),
                adress VARCHAR(100),

                metabolism VARCHAR(100),
                nerve VARCHAR(100),
                circle VARCHAR(100),
                tumor VARCHAR(100),
                respiratory VARCHAR(100),
                urinary VARCHAR(100),
                bone VARCHAR(100),
                skin VARCHAR(100),
                blood VARCHAR(100))`, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },
    add_diseaseTable_data(username, userId, usergender, birthdate, userphone, docid, emergencyphone, emergencyman, adress, metabolism, nerve, circle, tumor, respiratory, urinary, bone, skin, blood) {
        return new Promise((resolve, reject) => {
            userId = userId + "_diseaseTable";
            let a = [username, userId, usergender, birthdate, userphone, docid, emergencyphone, emergencyman, adress, metabolism, nerve, circle, tumor, respiratory, urinary, bone, skin, blood]
            a.forEach(el => {
                el = this.to_string(el);
            })
            connection.query(`INSERT INTO ${userId} (username, userId, usergender, birthdate, userphone, docid, emergencyphone, emergencyman, adress, metabolism, nerve, circle, tumor, respiratory, urinary, bone, skin, blood)
            VALUES ('${username}', '${userId}', '${usergender}', '${birthdate}', '${userphone}', '${docid}', '${emergencyphone}', '${emergencyman}', '${adress}', '${metabolism}', '${nerve}', '${circle}', '${tumor}', '${respiratory}', '${urinary}', '${bone}', '${skin}', '${blood}')`, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Insert Success")
                    resolve(true);
                }
            });
        });
    },
    to_string(obj) {
        if (Array.isArray(obj)) {
            obj = obj.toString();
        }
        return obj;
    },
    createUser(userId) {
        return new Promise((resolve, reject) => {
            connection.query(`CREATE TABLE ${userId} (Name VARCHAR(50), Date Date, SBP INT(5), DBP INT(5), BloodSugar INT(5), WalkStep INT(5), SleepTime INT(2), DocID INT(4), Warn INT(4), LineID VARCHAR(20))`, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },
    addData(userID, Name, Date, SBP, DBP, BloodSugar, WalkStep, SleepTime, DocID, Warn, LineID) {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO ${userID} (Name, Date, SBP, DBP, BloodSugar, WalkStep, SleepTime, DocID, Warn, LineID) VALUES ('${Name}', '${Date}', ${SBP}, ${DBP}, ${BloodSugar}, ${WalkStep}, ${SleepTime}, ${DocID}, ${Warn}, ${LineID})`, function (err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },

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
    get_all_data() {
        return new Promise(async (resolve, reject) => {
            let tableName = await this.show_tableName();
            let allData = [];
            let i = 0;
            for (i = 0; i < tableName.length; i++) {
                let data = await this.get_data(tableName[i].Tables_in_vsine0ibs4j6lk5u)
                allData.push(data);
            }
            resolve(allData);
        });
    },
    show_tableName() {
        return new Promise((resolve, reject) => {
            connection.query(`SHOW TABLES WHERE tables_in_vsine0ibs4j6lk5u NOT LIKE '%diseaseTable'`,
                function (err, tables, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        var nameList = [];
                        var toBeDelete = [];
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