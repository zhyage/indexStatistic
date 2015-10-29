var fs = require('fs');

function getPurifyMethodConf(){
    var conf = JSON.parse(fs.readFileSync('methodConf/biaoZhunFaformula.json', 'utf8'));
    var returnMsgStr = JSON.stringify(conf.allFormula);
    console.info("returnMsgStr :", returnMsgStr);
    return returnMsgStr;

}

function getAHPMethodConf(){
    var conf = JSON.parse(fs.readFileSync('methodConf/weightFormula.json', 'utf8'));
    var returnMsgStr = JSON.stringify(conf.allFormula);
    console.info("returnMsgStr :", returnMsgStr);
    return returnMsgStr;
}

module.exports.getPurifyMethodConf = getPurifyMethodConf;
module.exports.getAHPMethodConf = getAHPMethodConf;