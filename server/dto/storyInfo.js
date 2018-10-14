//定义用户故事模板
var mongoose = require("../util/dbFactory");
var storySchema = new mongoose.Schema({
    needId:String,//需求id  
    needName:String,//需求名称
    needContent:String,//需求内容
    belongIteration:String,//所属迭代，例如20181101
    creatDate:Date,//创建日期
    createdBy:String,//创建者
    storys:[
        {
            storyId:String,       //故事id
            storyName:String,     //故事名称
            storyContent:String,  //故事内容
            avgWorkload:Number,  //预估平均点数
            userEstiMate:[{
                userId:String,//用户id
                userName:String,//用户名称
                userGroup:String,//用户分组
                estimateWorkload:Number,//预估工作量
                remark:String //备注，问题等
            }]
        }
    ]
});

module.exports = mongoose.model('Storys', storySchema);