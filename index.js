const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;

app.use("/", express.static(__dirname));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/main.html");
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Fail to run server on port ${PORT} \n`);
        console.log(err);
    } else {
        console.log(`Server running on port ${PORT}`);
    }
});
