//定义用户故事模板
var mongoose = require("../util/dbFactory");

var needSchema = new mongoose.Schema({
    needName:String,//需求名称
    needContent:String,//需求内容
    belongIteration:String,//所属迭代，例如20181101
    creatDate:Date,//创建日期
    createdBy:String,//创建者
    groupId:mongoose.Schema.Types.ObjectId//分组id
    //storys:[mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('needInfo', needSchema,"need_info");