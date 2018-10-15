//定义数据模板
var mongoose = require("../util/dbFactory");
var userSchema = new mongoose.Schema({
    umid:String,
    username:String,
    groupId:mongoose.Schema.Types.ObjectId,//组织id
    created:Date
});

module.exports = mongoose.model('Users', userSchema);