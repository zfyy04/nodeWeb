//用户数据操作
var mongoose = require("mongoose");
var UserInfo = require("../dto/userInfo");


/**
 * 新增用户
 * @param {用户信息} obj 
 */
function addUser(obj){
    var userInfo = new UserInfo({
        userid:obj.userid,
        username:obj.username,
        created:new Date()
    });
    userInfo.save(function(err,res){
        if (err) {
            console.log("addUser Error:" + err);
        }else {
            console.log("addUser Res:" + res);
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

module.exports = {
    "addUser":addUser,
    "updateUser":updateUser,
    "findByIdAndUpdateUser":findByIdAndUpdateUser,
    "removeUser":removeUser,
    "findUser":findUser
}