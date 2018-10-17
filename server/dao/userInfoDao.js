//用户数据操作
var mongoose = require("mongoose");
var UserInfo = require("../dto/userInfo");
var NeedInfo = require("../dto/needInfo");
var GroupInfo = require("../dto/groupInfo");
var StoryInfo = require("../dto/storyInfo");
var Estimate = require("../dto/estimateInfo");
var DocInfo = require("../dto/docInfo");
/**
 * 新增用户
 * @param {用户信息} obj 
 */
function addUser(obj){
    var userInfo = new UserInfo({
        umid:obj.umid,
        username:obj.username,
        groupInfo:mongoose.Types.ObjectId(obj.groupId),
        created:new Date()
    });
    userInfo.save(function(err,res){
        if (err) {
            console.log("addUser Error:" + err);
        }else {
            console.log("addUser Res : userId="+ userInfo._id +" =>"+ res);
            //addStory();
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
    UserInfo.findById(id).populate("groupInfo").exec(function(err,result){
        if(!err){
            console.log(result);
            findTest();
            res.status(200).json(result._doc);
        }
    });
    // UserInfo.findById(id, function(err, res2){
    //     if (err) {
    //         console.log("findUserById Error:" + err);
    //     }else {
    //         console.log("findUserById Res:" + res2);
    //         res.status(200).json(res2._doc);
    //     }
    // })
}
function findTest(){
    StoryInfo.find().populate({path:"needInfo",select:"needName -_id",match:{needName:"need1"}}).exec(function(err,result){
        if(!err){
            console.log(result);
        }
    });
}
//测试方法
function addTest(){
    //先添加文档
    var docInfo = new DocInfo({
            docName:"testdoc",//文档名称
            belongSprint:"20181010",//所属迭代，例如20181101
            creatDate:new Date(),//创建日期
            createdBy:"zfy",//创建者
            groupInfo:mongoose.Types.ObjectId("5bc5d2cc1f8aa5b1af848c4e")
    });

    docInfo.save(function(err1,res1){
        if(!err1){
            console.log("add docInfo success");
            //添加文档成功后再添加需求，批量插入
            var needArr = [];
            var needInfo = new NeedInfo({
                needName:"need1",//需求名称
                needContent:"needContent1",//需求内容
                docInfo:mongoose.Types.ObjectId(docInfo._id)
            });
            var needInfo2 = new NeedInfo({
                needName:"need2",//需求名称
                needContent:"needContent2",//需求内容
                docInfo:mongoose.Types.ObjectId(docInfo._id)
            });
            needArr.push(needInfo);
            needArr.push(needInfo2);
            NeedInfo.insertMany(needArr,function(err3,res3){
                if(!err3){
                    console.log("add needInfo success");
                    //需求插入完成后，再批量插入story
                    var storyArr = [];
                    var story1 = new StoryInfo({
                        storyName: "need1_story1",     //故事名称
                        storyContent: "need1的story1",  //故事内容
                        storySeq:1,        //故事序号
                        avgPoint: 0,  //预估平均点数
                        needInfo:mongoose.Types.ObjectId(needArr[0]._id)
                    });
                    var story2 = new StoryInfo({
                        storyName: "need1_story2",     //故事名称
                        storyContent: "need1的story2",  //故事内容
                        storySeq:2,        //故事序号
                        avgPoint: 0,  //预估平均点数
                        needInfo:mongoose.Types.ObjectId(needArr[0]._id)
                    });
                    var story3 = new StoryInfo({
                        storyName: "need2_story1",     //故事名称
                        storyContent: "need2的story1",  //故事内容
                        storySeq:3,        //故事序号
                        avgPoint: 0,  //预估平均点数
                        needInfo:mongoose.Types.ObjectId(needArr[1]._id)
                    });
                    var story4 = new StoryInfo({
                        storyName: "need2_story2",     //故事名称
                        storyContent: "need2的story2",  //故事内容
                        storySeq:4,        //故事序号
                        avgPoint: 0,  //预估平均点数
                        needInfo:mongoose.Types.ObjectId(needArr[1]._id)
                    });
                    storyArr.push(story1,story2,story3,story4);
                    StoryInfo.insertMany(storyArr,function(err4,res4){
                        if(!err4){
                            console.log("add storyInfo success");
                        }
                    });

                }
            });
        }
    });
}

// ZonePrice.find({})
//          .populate({ 
//             path:'zone',
//             match:{priceRate:{$gt:0}},
//             options:{ limit:pageSize,
//             skip:(pageNum-1)*pageSize }
// })

// Person
// .find({ occupation: /host/ }) 
// .where('name.last').equals('Ghost')   // Person.name.last是Ghost
// .where('age').gt(17).lt(66)  // 17 < Person.age <66
// .where('likes').in(['vaporizing', 'talking'])//likes是vaporizing或者talking
// .limit(10)  //限制10条记录
// .sort('-occupation')  //根据occupation的倒序排
// .select('name occupation') //选择name和occupation字段
// .exec(callback);

// Job.find({
//     $or: [
//       {'description': {'$regex': key, $options: '$i'}},
//       {'city': {'$regex': key, $options: '$i'}},
//       {'name': {'$regex': key, $options: '$i'}}]
//   })
//   .populate('JobType', 'name')
//   .exec(function (err, jobs) {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, jobs);
//     }
//   })

/**
 * 查询所有组别
 * @param {response} resp 
 */
function findGroups(resp){
    GroupInfo.find({},function(err,result){
        if(!err){
            resp.status(200).json(result);
        }else{
            resp.status(500).json(err);
        }
    });
}

module.exports = {
    "addUser":addUser,
    "updateUser":updateUser,
    "findByIdAndUpdateUser":findByIdAndUpdateUser,
    "removeUser":removeUser,
    "findUser":findUser,
    "findUserById":findUserById,
    "findGroups":findGroups
}