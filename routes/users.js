var express = require('express');
var router = express.Router();
var userInfoDao = require("../server/dao/userInfoDao");
var UserInfo = require("../server/dto/userInfo");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//页面跳转
router.get("/showAddUser",function(req,res){
  res.render('addUser',{"title":"test"});
});

//根据id查找用户
router.get("/findUserById",function(req,res){
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
router.post("/addUser",function(req,res){
  //如果是get请求，取值为req.query.username
  userInfoDao.addUser({"umid":req.body.umid,"username":req.body.username,"groupId":req.body.groupId});
  res.send(200,{code:'0',mes:'成功'});
  //失败：res.send(500,{code:'-1',mes:'失败'});
});

module.exports = router;
