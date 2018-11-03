/**
 * 远程调用js
 */
var express = require('express');
var http = require('http');
var router = express.Router();
var qs = require('querystring');


/**
 * 模拟get请求
 */
router.get("/testGet",function(req_,res_){
    var data = {  
        a: 123,  
        time: new Date().getTime()
    };//这是需要提交的数据
    var content = qs.stringify(data); 
    http.get('http://106.12.121.47:8081/user/test?'+content,function(req,res){
        var html='';
        req.on('data',function(data){
            html+=data;
        });
        req.on('end',function(){
            res_.send(200,html);
        });
    });
});

/**
 * 模拟POST请求
 */
router.get("/testPost",function(req_,res_){
    var data = {  
        a: 123,  
        time: new Date().getTime()
    };//这是需要提交的数据
    var content = qs.stringify(data); 

    var options={
        hostname:'localhost',
        port:8081,
        path:'/user/testPost',
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length':Buffer.byteLength(content)
        }
    }

    
    var req=http.request(options, function(res) {
        console.log('Status:',res.statusCode);
        console.log('headers:',JSON.stringify(res.headers));
        res.setEncoding('utf-8');
        var html = "";
        res.on('data',function(retData){
            html+=retData;
        });
        res.on('end',function(){
            res_.send(200,html);
        });
    });

    req.on('error',function(err){
        console.error(err);
    });
    req.write(content);
    req.end();
});


module.exports = router;
