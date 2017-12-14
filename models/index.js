var mongoskin = require('mongoskin');
var db = mongoskin.db("mongodb://127.0.0.1/lufaxnew"); //数据库连接串
db.note = db.bind('note');
exports.insert = function(item,callback){
    db.note.insert(item,function(err,result){
        callback(err,result);
    })
}
exports.findIp = function(ip,callback){
    db.note.findOne({ip:ip},function(err,result){
        callback(err,result);
    })
}

exports.getTodayCount = function(date,callback){
    db.note.count({"createDate":{"$gt":date}},function(err,result){
        callback(err,result);
    });
}
