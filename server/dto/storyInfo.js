//定义用户故事模板
var mongoose = require("../util/dbFactory");

var storySchema = new mongoose.Schema({
    storyName: String,     //故事名称
    storyContent: String,  //故事内容
    storySeq:Number,        //故事序号
    avgPoint: Number,  //预估平均点数
    needInfo:{
        type:mongoose.Schema.Types.ObjectId,//分组id
        ref:"needInfo"
    }
});

module.exports = mongoose.model('storyInfo', storySchema,"story_info");