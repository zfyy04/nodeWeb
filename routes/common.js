var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Storys = require("../server/dto/storys");
var Estimates = require("../server/dto/estimates");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//页面跳转
router.get("/testPage",function(req,res){
  res.render('testPage',{"title":"test"});
});

//根据添加文档
router.get("/find",function(req,res){
  // UserInfo.findById(req.query.userid,(err,data)=>{
  //   res.status(200).json(data);
  // })
  userInfoDao.findUserById(req.query.userid,res);
});

//ajax处理请求
router.get("/getAllGroups",function(req,res){
  userInfoDao.findGroups(res);
});

//ajax处理请求
router.get("/getStorys",function(req,res){
  var fileName = req.query.fileName;
  Storys.find({"fileName":fileName},function(err,result){
    if(!err){
      res.send(200,{code:'0',mes:'成功',ret:result});
    }
  });
});

//ajax处理请求
router.post("/addStorys",function(req,res){
  var fileName = req.body.fileName;
  var sprint = req.body.sprint;
  var storyContent = req.body.storyContent;
  var storyName = req.body.storyName;
  var nameArr = eval(storyName);
  var contentArr = eval(storyContent);
  var storyArr = [];
  for(var i=0;i<nameArr.length;i++){
    var storyObj = new Storys({
      storyName: nameArr[i],     //故事名称 规则：需求名称_故事名称
      storyContent: contentArr[i],  //故事内容
      storySeq:i,        //故事序号
      storySprint: sprint,  //所属迭代
      belongTeam:"产险",//所属组别
      fileName:fileName,//上传文档名称
      createDate:new Date(),//创建时间
      uploadder:"zfy"//创建人
    });
    storyArr.push(storyObj);
  }
  Storys.insertMany(storyArr,function(e1,res1){
    if(!e1){
      res.send(200,{code:'0',mes:'成功'});
    }
  });
});

//点数评估
router.post("/pointStory",function(req,res){
  var sid = req.body.sid;
  var selVal = req.body.selVal;
  var fname = req.body.fname;
  var uid = req.body.umid;
  var uname = req.body.username;
  var remark = req.body.remark;
  //先删除嵌套的评估内容，再插入
  var whereObj = {"umid":uid,"username":uname,"fileName":fname};
  var deleteObj = {$pull:{"storys":{"storyInfo":mongoose.Types.ObjectId(sid)}}};
  var insertObj = {$push:{"storys":{"storyInfo":mongoose.Types.ObjectId(sid),"point":selVal,"remark":remark}}};
  var options = {upsert:true};//如果查询条件不存在，则插入一条
  Estimates.update(whereObj,deleteObj,options,
      function(err,ret){
        if(!err){
          Estimates.update(whereObj,insertObj,options,function(err1,ret1){
            if(!err1){
              res.send(200,{code:'0',mes:'成功'});
            }
          });
        }
      });
});


//点数评估
router.get("/getStoryPoint",function(req,res){
  var fname = "故事1";
  var uid = "zfy";
  Estimates.find({"umid":uid,"fileName":fname}).populate("storys.storyInfo").exec(function(err,ret){
    if(!err){
      console.log(ret);
      console.log(ret[0].storys[0].storyInfo.storyName);
    }
  });
});

module.exports = router;
