var fs = require('fs');


function saveMatrix(fileName, matrixString) {
    var path = "public/dataSave/" + fileName;
    var res = fs.writeFile(path, matrixString, function(err) {
        if (err) {
            console.error("error to save file :", path);
            return false;
        } else {
            console.info("success to save file : ", path);
            return true;
        }
    });
    if(res){
        return "save success";
    }else{
        return "save failed";
    }
}


function loadMatrix(fileName){
    var path = "public/dataSave/" + fileName;
    var matrixString = fs.readFileSync(path, 'utf8');
    console.info("load matrixString : ", matrixString);
    return matrixString;

}

function getSavedFileList() {
    var fileList = [];
    fileList = fs.readdirSync("public/dataSave/");
    var fileListStr = JSON.stringify(fileList);
    console.info("fileListStr = ", fileListStr);
    return fileListStr;
}

module.exports.saveMatrix = saveMatrix;
module.exports.loadMatrix = loadMatrix;
module.exports.getSavedFileList = getSavedFileList;
