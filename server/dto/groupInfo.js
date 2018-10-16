//定义数据模板
var mongoose = require("../util/dbFactory");
var groupSchema = new mongoose.Schema({
    groupName:String,//机构名称
    creatDate:Date
});

module.exports = mongoose.model('groupInfo', groupSchema,"group_info");