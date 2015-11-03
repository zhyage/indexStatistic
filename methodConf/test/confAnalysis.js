var fs = require("fs");
var _ = require("underscore");


var conf = JSON.parse(fs.readFileSync('biaoZhunFaformula2.json', 'utf8'));
var formularConf = conf.allFormular;

//console.info("formularConf : ", formularConf);
console.info("number of formularConf : ", formularConf.length);
generateHintForm("abc", formularConf);

function generateHintForm(inputMethod, formularConf) {
    _.each(formularConf, function(method) {
        //console.info("method.name : ", method.name);
        //console.info("has default value : ", checkIfAllHasDefaultValue(method));
        if (inputMethod === method.name) {
            var htmlRes = '';
            htmlRes = htmlRes.concat(generateCommonHtml(method));
            _.each(method.parameterList, function(parameter) {
                htmlRes = htmlRes.concat(generateParameteHtml(parameter))

            })
            console.info("htmlRes : ", htmlRes);
            var htmlName = method.name + '.html';
            var res = fs.writeFile(htmlName, htmlRes, function(err) {
                if (err) {
                    console.error("error to save file :", htmlName);
                    return false;
                } else {
                    console.info("success to save file : ", htmlName);
                    return true;
                }
            });
        }
    })
}

function checkIfAllHasDefaultValue(method){
    var parameterList = method.parameterList;
    var noDefaultArray = _.filter(parameterList, function(parameter){
        return parameter.defaultValue == undefined;
    })
    if(noDefaultArray.length != 0){
        return false;
    }else{
        return true;
    }
}

function generateCommonHtml(method){
    var appendStr = '<p><label>' + method.name + '</p>';
    var tmpStr = '<label>target name : <input type="text" id = targetName_' + method.name + 'value = ' + method.defaultPrefixName + '" />';
    appendStr = appendStr.concat(tmpStr);
    return appendStr;
}

function generateParameteHtml(parameter){
    var paraName = parameter.name;
    var appendStr = '<p><label>' + paraName + ' :</p>';
    if(parameter.type === 'selectInput'){
        appendStr = appendStr.concat(generateSelectionInputHtml(paraName, parameter.optionList));
    }else if(parameter.type === 'normalInput'){
        appendStr = appendStr.concat(generateNormalInputHtml(paraName));
    }
    return appendStr;

}

function generateSelectionInputHtml(name, selectionArray, defualtValue) {
    var appendStr = "";

    var i = 0;
    for (i = 0; i < selectionArray.length; i++) {

        if (0 == i) {
            var tmpStr = '<label class="btn btn-primary"> <input type="radio" name="options" ' + 'value=' + selectionArray[i] + ' id =' + selectionArray[i] + ' autocomplete="off" checked="checked"> ' + selectionArray[i] + ' </label>';
        } else {
            var tmpStr = '<label class="btn btn-primary"> <input type="radio" name="options" ' + 'value=' + selectionArray[i] + ' id =' + selectionArray[i] + ' autocomplete="off"> ' + selectionArray[i] + ' </label>';
        }
        appendStr = appendStr.concat(tmpStr);
    }
    return appendStr;
}

function generateNormalInputHtml(name) {
    var appendStr = "";
    appendStr = '<input type="text" id = ' + name + '" />';
    return appendStr;
}