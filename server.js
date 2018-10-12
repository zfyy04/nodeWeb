var app = require("./app.js");

var server = app.listen("8080",function (req,res) {
    console.log("server has start!");
})