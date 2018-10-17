//定义用户评估点数模板
var mongoose = require("../util/dbFactory");

var estimateSchema = new mongoose.Schema({
    userInfo: {
        type:mongoose.Schema.Types.ObjectId,//用户
        ref:"userInfo"
    },
    needId: {
        type:mongoose.Schema.Types.ObjectId,//需求
        ref:"needId"
    },
    userEstiMate: [{
        storyInfo: {
            type:mongoose.Schema.Types.ObjectId,//需求
            ref:"storyInfo"
        },
        estimatePoint: Number,//预估工作量
        remark: String, //备注，问题等
        estimateDate:Date //反馈时间
    }]
});

module.exports = mongoose.model('esimateInfo', estimateSchema,"estimate_info");