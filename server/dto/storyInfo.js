//定义用户故事模板
var mongoose = require("../util/dbFactory");

var storySchema = new mongoose.Schema({
    storyName: String,     //故事名称
    storyContent: String,  //故事内容
    avgPoint: Number,  //预估平均点数
    needId:mongoose.Schema.Types.ObjectId//需求id
});

module.exports = mongoose.model('storyinfo', storySchema);