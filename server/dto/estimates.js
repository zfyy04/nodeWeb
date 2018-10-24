//定义用户故事模板
var mongoose = require("../util/dbFactory");

var estimate = new mongoose.Schema({
    userInfo: {
        type:mongoose.Schema.Types.ObjectId,//用户
        ref:"userInfo"
    },
    fileName:String,//评估文档
    storys:[{
        storyInfo:{
            type:mongoose.Schema.Types.ObjectId,//故事内容关联id
            ref:"story"
        },
        point:Number,//评估点数
        remark:String,//备注
        estimateDate:Date //评估时间
    }]
});

module.exports = mongoose.model('estimate', estimate);