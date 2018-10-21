//定义用户故事模板
var mongoose = require("../util/dbFactory");

var estimate = new mongoose.Schema({
    umid:String,//评估用户id
    username:String,//评估用户姓名
    fileName:String,//评估文档
    storys:[{
        storyInfo:{
            type:mongoose.Schema.Types.ObjectId,//故事内容关联id
            ref:"story"
        },
        point:Number,//评估点数
        remark:String//备注
    }]
});

module.exports = mongoose.model('estimate', estimate);