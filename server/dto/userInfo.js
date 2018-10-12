//定义数据模板
var mongoose = require("../util/dbFactory");
var userSchema = new mongoose.Schema({
    userid:String,
    username:String,
    created:Date
});

module.exports = mongoose.model('Users', userSchema);