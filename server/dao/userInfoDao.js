//用户数据操作
var mongoose = require("mongoose");
var UserInfo = require("../dto/userInfo");
var NeedInfo = require("../dto/needInfo");
var GroupInfo = require("../dto/groupInfo");
var StoryInfo = require("../dto/storyInfo");
var Estimate = require("../dto/userEstimateInfo");

/**
 * 新增用户
 * @param {用户信息} obj 
 */
function addUser(obj){
    var userInfo = new UserInfo({
        umid:obj.userid,
        username:obj.username,
        created:new Date()
    });
    userInfo.save(function(err,res){
        if (err) {
            console.log("addUser Error:" + err);
        }else {
            console.log("addUser Res:" + res);
            addStory();
        }
    });
}

/**
 * 更新用户
 * @param {更新条件} whereObj 
 * @param {更新数据} updateObj 
 */
function updateUser(whereObj,updateObj){
    UserInfo.update(whereObj,updateObj,function(err,res){
        if (err) {
            console.log("updateUser Error:" + err);
        }else {
            console.log("updateUser Res:" + res);
        }
    });
}

/**
 * 根据id更新数据
 * @param {自动生成的主键id} id 
 * @param {更新数据} updateObj 
 */
function findByIdAndUpdateUser(id,updateObj){
    UserInfo.findByIdAndUpdate(id, updateObj, function(err, res){
        if (err) {
            console.log("findByIdAndUpdate Error:" + err);
        }else {
            console.log("findByIdAndUpdate Res:" + res);
        }
    })
}

/**
 * 删除用户
 * @param {删除数据的条件} whereObj 
 */
function removeUser(whereObj){
    UserInfo.remove(whereObj, function(err, res){
        if (err) {
            console.log("removeUser Error:" + err);
        }else {
            console.log("removeUser Res:" + res);
        }
    })
}

/**
 * 查询用户
 * @param {查询条件} whereObj 
 */
function findUser(whereObj){
    UserInfo.find(wherestr, function(err, res){
        if (err) {
            console.log("findUser Error:" + err);
        }else {
            console.log("findUser Res:" + res);
        }
    })
}


/**
 * 根据id查询
 * @param {自生成id} id 
 * @param {传入的request} res 
 */
function findUserById(id,res){
    UserInfo.findById(id, function(err, res2){
        if (err) {
            console.log("findUserById Error:" + err);
        }else {
            console.log("findUserById Res:" + res2);
            res.status(200).json(res2._doc);
        }
    })
}

//测试方法
function addStory(){
    var storyInfo = new StoryInfo({
            storyName: "test",     //故事名称
            storyContent: "content11",  //故事内容
            avgPoint: 1,  //预估平均点数
            needId:mongoose.Types.ObjectId('576cd26698785e4913c5d0e2')//需求id
    });

    storyInfo.save(function(err,result){
        if(!err){
            console.log("add story success");
        }
    });
}

module.exports = {
    "addUser":addUser,
    "updateUser":updateUser,
    "findByIdAndUpdateUser":findByIdAndUpdateUser,
    "removeUser":removeUser,
    "findUser":findUser,
    "findUserById":findUserById
}