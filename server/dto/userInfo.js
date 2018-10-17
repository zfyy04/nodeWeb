//定义数据模板
var mongoose = require("../util/dbFactory");
var userSchema = new mongoose.Schema({
    umid:String,
    username:String,
    groupInfo:{
        type:mongoose.Schema.Types.ObjectId,//组织id
        ref:"groupInfo"
    },
    created:Date
});

module.exports = mongoose.model('userInfo', userSchema,"user_info");