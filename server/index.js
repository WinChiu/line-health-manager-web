const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
const path = require("path");

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require("./routes/api/post");
app.use('/api/posts', posts);
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


//Handle production, this part is for the situation when we deploy our code on heroku
if (process.env.NODE_ENV === 'production') {
    //app.use(express.static(__dirname + '/public'));
    app.use(express.static('../client/public/index.html'));
    // Hande SPA
    app.use(/.*/, (req, res) => {
        res.sendFile('../public');
    }); // Refer to any route at all
}

app.listen(PORT, () => console.log(`server running on port ${PORT}`));