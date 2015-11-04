var express = require('express');
var router = express.Router();
var indexMod = require('../models/index');
var secret = require('../secret');


/* GET home page. */
router.get('/t', function(req, res, next) {

  var ip=req.headers['x-real-ip'] || req.headers['x-forwarded-for']||req.ip;
  var createDate = new Date();
  var ua = req.headers["user-agent"];
  var referer = req.headers["referer"];
  res.setHeader("Content-Type", "application/javascript");
  var obj = {
    ip:ip,createDate:createDate,ua:ua,referer:referer
  };
  if(ip.indexOf("101.199")>-1){
     res.render("index");
     return false;
  }
  indexMod.findIp(ip,function(err,result){

    var isShow = false;
    if(global.openValue <=0||result||referer==null||referer==""){

    }else{
      obj.snum = global.openValue;
      global.openValue--;
      isShow = true;
    }
    indexMod.insert(obj,function(err,result){
      if(err){
        console.log("error:"+ip);
      }
    })
    if(err){
      return next(err);
    }
    if(isShow){
      var ran = Math.random();
      if(ran<0.7){
        res.render("result");
      }else{
        res.render("sresult");
      }
    }else{
      res.render("index");
    }
  })
});

router.get('/set', function(req, res, next) {
  var key = req.query.key;
  if(key == secret.key) {
    global.openValue = 20;
    res.send('openvalue:'+global.openValue);
  }else{
    res.send('key is not avalible');
  }

});
router.get('/get', function(req, res, next) {
  res.send('ohhhhh:'+global.openValue);
});
router.get('/test',function(req,res,next){
  res.setHeader("Content-Type", "application/javascript");
  res.render("test");
});

module.exports = router;
