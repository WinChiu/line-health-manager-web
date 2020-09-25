const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require("./routes/api/post");
const gets = require("./routes/api/get");
app.use('/api/posts', posts);
app.use('/api/gets', gets);

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.post("/api/user/login", bodyParser.urlencoded({
    extended: false
}), bodyParser.json(), (req, res) => {
    console.log(req.body);
    res.json({
        code: 20000,
        data: {
            "name": "admin",
            "say": "hi"
        },
        token: "111111"
    });
})

app.get("/api/user/info", (req, res) => {
    console.log("Info query", req.query);
    console.log("Info params", req.params);
    res.json({
        "code": 20000,
        "data": {
            "roles": ["admin"],
            "introduction": "I am a super administrator",
            "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
            "name": "Super Admin"
        }
    });
})

//Handle production, this part is for the situation when we deploy our code on heroku
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));

    // Hande SPA
    app.use(/.*/, (req, res) => {
        res.sendFile('../public');
    }); // Refer to any route at all
}

app.listen(PORT, () => console.log(`server running on port ${PORT}`));