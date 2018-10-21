//定义用户故事模板
var mongoose = require("../util/dbFactory");

var story = new mongoose.Schema({
    storyName: String,     //故事名称 规则：需求名称_故事名称
    storyContent: String,  //故事内容
    storySeq:Number,        //故事序号
    storySprint: Number,  //所属迭代
    belongTeam:String,//所属组别
    fileName:String,//上传文档名称
    createDate:Date,//创建时间
    uploadder:String//创建人
});

module.exports = mongoose.model('story', story);