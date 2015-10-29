var express = require('express');
var saveAndLoad = require('../modules/saveAndLoad');
var methodConfHandle = require('../modules/methodConfHandle');
var submit2Python = require('../modules/submit2Python');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendfile('./views/index.html');
});

router.get('/normalComputingPage', function(req, res, next) {
    res.sendfile('./views/normalComputing.html');
});

router.get('/biaoZhunHuaPage', function(req, res, next) {
    res.sendfile('./views/biaoZhunHua.html');
});

router.get('/AHPConfPage1', function(req, res, next) {
    res.sendfile('./views/AHPConfPage1.html');
});

router.post('/saveToServer', function(req, res, next) {
    var saveInfo = req.body;
    var fileName = saveInfo.fileName;
    var matrixString = JSON.stringify(saveInfo.matrix);
    res.send(saveAndLoad.saveMatrix(fileName, matrixString));
});

router.post('/loadFileFromServer', function(req, res, next) {
    var loadInfo = req.body;
    var fileName = loadInfo.fileName;
    res.send(saveAndLoad.loadMatrix(fileName));
});

router.post('/getSaveFileList', function(req, res, next) {
    res.send(saveAndLoad.getSavedFileList());
});

router.post('/toGetBiaoZhunFaConf', function(req, res, next) {
    res.send(methodConfHandle.getPurifyMethodConf());
});

router.post('/toGetWeightFormulaConf', function(req, res, next) {
    res.send(methodConfHandle.getAHPMethodConf());
});

router.post('/submitComputExpressAndData', function(req, res, next){
    var submitBody = req.body;

    var submitBodyString = JSON.stringify(submitBody);
   

    function sendResBack(res, resultMsg)
    {
        console.info("here message back from python:", resultMsg);
        res.send(resultMsg);
    }

    submit2Python.sendMsg2Py(submitBodyString, sendResBack, res);
});

module.exports = router;
