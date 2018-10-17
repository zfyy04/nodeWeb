//定义上传文档模板
var mongoose = require("../util/dbFactory");

var docSchema = new mongoose.Schema({
    docName:String,//文档名称
    belongSprint:String,//所属迭代，例如20181101
    creatDate:Date,//创建日期
    createdBy:String,//创建者
    groupInfo:{
        type:mongoose.Schema.Types.ObjectId,//分组id
        ref:"groupInfo"
    }
});

module.exports = mongoose.model('docInfo', docSchema,"doc_info");