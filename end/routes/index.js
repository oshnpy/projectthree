var express = require('express');
var router = express.Router();
var mongo = require("mongodb-curd");
var dbBase = "apps";
var dbColl = "list";
var dbHeader = "headerlist";

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
//查找数据
router.get('/find', function(req, res, next) {
    var params = req.query;
    var page = params.page;
    var pageSize = params.pageSize;
    mongo.find(dbBase, dbColl, {}, function(result) {
        var len = result.length;
        var total = Math.ceil(len / pageSize);
        getData(total);
    })

    function getData(total) {
        var skip = (page - 1) * pageSize;
        mongo.find(dbBase, dbColl, {}, function(result) {

            if (result.length > 0) {
                res.send({ code: 0, data: result, total: total });
            } else {
                res.send({ code: 1, msg: "查找失败" });
            }
        }, {
            skip: skip,
            limit: pageSize
        })
    }

});
//查找
router.get('/findHeader', function(req, res, next) {
    var params = req.query;
    var page = params.page;
    var pageSize = params.pageSize;
    mongo.find(dbBase, dbColl, {}, function(result) {
        var len = result.length;
        var total = Math.ceil(len / pageSize);
        getData(total);
    })

    function getData(total) {
        var skip = (page - 1) * pageSize;
        mongo.find(dbBase, dbColl, {}, function(result) {
            if (result.length > 0) {
                res.send({ code: 0, data: result, total: total });
            } else {
                res.send({ code: 1, msg: "查找失败" });
            }
        }, {
            skip: skip,
            limit: pageSize
        })
    }

});

module.exports = router;