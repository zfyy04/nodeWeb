//数据库连接js
var mongoose = require('mongoose');
var settings = require("./settings");
mongoose.connect(settings.dbUrl);
 
//一旦建立连接，则会触发
mongoose.connection.on('connected', function () {
    console.log('Mongoose has connected');
});
//一旦该连接发生错误，则会触发
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
//一旦该连接被关闭，则会触发
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

module.exports = mongoose;