//定义用户评估点数模板
var mongoose = require("../util/dbFactory");

var estimateSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,     //用户id
    needId: mongoose.Schema.Types.ObjectId,     //需求id
    userEstiMate: [{
        storyId: mongoose.Schema.Types.ObjectId,  //故事id
        estimatePoint: Number,//预估工作量
        remark: String, //备注，问题等
        estimateDate:Date //反馈时间
    }]
});

module.exports = mongoose.model('esimateInfo', estimateSchema,"estimate_info");