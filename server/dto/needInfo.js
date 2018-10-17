//定义用户故事模板
var mongoose = require("../util/dbFactory");

var needSchema = new mongoose.Schema({
    needName:String,//需求名称
    needContent:String,//需求内容
    docInfo:{
        type:mongoose.Schema.Types.ObjectId,//文档id
        ref:"docInfo"
    }
});

module.exports = mongoose.model('needInfo', needSchema,"need_info");