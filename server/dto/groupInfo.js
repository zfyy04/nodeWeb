//定义数据模板
var mongoose = require("../util/dbFactory");
var groupSchema = new mongoose.Schema({
    groupName:String,//分组名称
    groupCode:String,//分组编码
    creatDate:Date
});

module.exports = mongoose.model('groupInfo', groupSchema,"group_info");