$(document).ready(function() {

    window.addEventListener('storage', storageEventHandler, false);

    function storageEventHandler(evt) {
        //alert("storage event called key: " + evt.key);
        if (evt.key == 'computedMatrix'){
            //location.replace("http://192.168.56.101:3000");
            location.reload();
        }
    }

    var yellowRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'yellow';
    };

    var orangeRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'orange';

    };

    var greyRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'grey';

    };

    var greenRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'green';

    };

    var redRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'red';

    };

    var pinkRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'pink';

    };

    var blueRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'blue';

    };

    var blackRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'black';

    };

    var whiteRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'white';

    };



    function generateInsertColumnForm(sheet, matrix, rowNo, colNo, before) {
        var oldMatrix = matrix.copyMatrix();
        var insertColNo = 0;
        if (true == before) {
            insertColNo = colNo - 2;
        } else {
            insertColNo = colNo - 2 + 1;
        }
        console.info("entry generateInsertColumnForm");
        if (insertColNo < 0 || insertColNo > matrix.colNum) {
            setTimeout(function() {
                $.unblockUI({
                    onUnblock: function() {
                        alert('please select position where you want insert column first');
                    }
                });
            }, 200);
            return;
        }
        var dataTypeList = [];
        dataTypeList = g_eleType.getUseableDatatypeNameList();


        var tmpStr = "";
        var i = 0;
        for(i = 0; i < dataTypeList.length; i++){
            var optName = dataTypeList[i];
            if(optName == 'number'){
                tmpStr += '<option selected> '+ optName + '</option>';
            }else{
                tmpStr += '<option> '+ optName + '</option>';
            }
            
        }
        console.info("tmpStr : ", tmpStr);

        $('#insertFrm').html('');
        var colNameStr = '<p><label>column header name:</label><br><input type="text" id = "inputColHeaderName2" value= ' + '"' + '"' +'/></p>';
        var dataTypeStr = '<p><label>data Type :</label><br><select name="dataType" id="inputDataType2">' + tmpStr;

        $('#insertFrm').append(colNameStr);
        $('#insertFrm').append(dataTypeStr);

        var that = this;
        var yesButton = $("<button>");
        yesButton.addClass("btn btn-block btn-inverse active");
        yesButton.attr({
            type: "button",
            "data-toggle": "button tooltip",
        });
        yesButton.text("commit");
        yesButton.on("click", function() {
            console.info("submit insert column on submit");
            var columnName = $('#inputColHeaderName2').val();
            var dataType = $('#inputDataType2').val();
            console.info("columnName : ", columnName);
            console.info("dataType : ", dataType);

            if (false == matrix.insertColumn(insertColNo, columnName, dataType)) {
                reloadData(sheet, oldMatrix);
            } else {
                reloadData(sheet, matrix);
            }
            $.unblockUI();

        });

        var noButton = $("<button>");
        noButton.addClass("btn btn-block btn-inverse active");
        noButton.attr({
            type: "button",
            "data-toggle": "button tooltip",
        });
        noButton.text("cancel");
        noButton.on("click", function() {
            console.info("cancel insert column on submit");
            $.unblockUI();

        });

        $('#insertFrm').append(yesButton);
        $('#insertFrm').append(noButton);

    }


    function generateInsertRowForm(sheet, matrix, rowNo, colNo, before) {
        $('#insertFrm').html('');
        console.info("entry generateInsertRowForm");
        var oldMatrix = matrix.copyMatrix();
        var insertRowNo = 0;
        if (true == before) {
            insertRowNo = rowNo - 2;
        } else {
            insertRowNo = rowNo - 2 + 1;
        }

        if (insertRowNo < 0 || insertRowNo > matrix.rowNum) {
            setTimeout(function() {
                $.unblockUI({
                    onUnblock: function() {
                        alert('please select position where you want insert row first');
                    }
                });
            }, 200);
            return;
        }

        $('#insertFrm').html('');
        var rowNameStr = '<p><label>row header name:</label><br><input type="text" id = "inputRowHeaderName2" value= ' + '"' +  '"' + '/></p>';
        $('#insertFrm').append(rowNameStr);

        var that = this;
        var yesButton = $("<button>");
        yesButton.addClass("btn btn-block btn-inverse active");
        yesButton.attr({
            type: "button",
            "data-toggle": "button tooltip",
        });
        yesButton.text("commit");
        yesButton.on("click", function() {
            var newRowName = $('#inputRowHeaderName2').val();
            if (false == matrix.insertRow(insertRowNo)) {
                reloadData(sheet, oldMatrix);
            } else {
                if (false == matrix.setRowHeader(insertRowNo, newRowName)) {
                    reloadData(sheet, oldMatrix);
                } else {
                    reloadData(sheet, matrix);
                }

            }
            $.unblockUI();

        });

        var noButton = $("<button>");
        noButton.addClass("btn btn-block btn-inverse active");
        noButton.attr({
            type: "button",
            "data-toggle": "button tooltip",
        });
        noButton.text("cancel");
        noButton.on("click", function() {
            console.info("cancel insert row");
            $.unblockUI();
           
        });

        $('#insertFrm').append(yesButton);
        $('#insertFrm').append(noButton);

    }



    function generateDeleteColForm(sheet, matrix, startColNo, endColNo) {
        $('#insertFrm').html('');
        var oldMatrix = matrix.copyMatrix();
        var startDelColNo = startColNo - 2;
        var endDelColNo = endColNo - 2;
        console.info("entry generateDeleteColForm");
        if (startDelColNo < 0 || startDelColNo > matrix.colNum || endDelColNo < 0 || endDelColNo > matrix.colNum) {
            setTimeout(function() {
                $.unblockUI({
                    onUnblock: function() {
                        alert('please select correct position where you want delete columns first');
                    }
                });
            }, 200);
            return;
        }

        $('#insertFrm').html('');
        var tipStr = '<p><label>would you like to continue ?</p>';
        $('#insertFrm').append(tipStr);

        var that = this;
        var yesButton = $("<button>");
        yesButton.addClass("btn btn-block btn-inverse active");
        yesButton.attr({
            type: "button",
            "data-toggle": "button tooltip",
        });
        yesButton.text("commit");
        yesButton.on("click", function() {
            var delRes = true;
            if (startDelColNo <= endDelColNo) {
                for (delCol = startDelColNo; delCol <= endDelColNo; delCol++) {
                    console.info("delColNo : ", delCol);
                    delRes &= matrix.deleteColumn(startDelColNo); //acutally, after every del, the left cols will move forward
                }
            } else {
                for (delCol = endDelColNo; delCol <= startDelColNo; delCol++) {
                    console.info("delColNo2 : ", delCol);
                    delRes &= matrix.deleteColumn(endDelColNo);
                }
            }
            if (delRes === 1) {
                reloadData(sheet, matrix);
            } else {
                reloadData(sheet, oldMatrix);
            }
            $.unblockUI();

        });

        var noButton = $("<button>");
        noButton.addClass("btn btn-block btn-inverse active");
        noButton.attr({
            type: "button",
            "data-toggle": "button tooltip",
        });
        noButton.text("cancel");
        noButton.on("click", function() {
            console.info("cancel del col");
            $.unblockUI();
           
        });

        $('#insertFrm').append(yesButton);
        $('#insertFrm').append(noButton);

    }


    function generateDeleteRowForm(sheet, matrix, startRow, endRow){
        $('#insertFrm').html('');
        console.info("entry generateDeleteRowForm");
        var oldMatrix = matrix.copyMatrix();
        var startDelRowNo = startRow - 2;
        var endDelRowNo = endRow - 2;
        if (startDelRowNo < 0 || startDelRowNo > matrix.rowNum || endDelRowNo < 0 || endDelRowNo > matrix.rowNum) {
            setTimeout(function() {
                $.unblockUI({
                    onUnblock: function() {
                        alert('please select correct position where you want delete rows first');
                    }
                });
            }, 200);
            return;
        }

        $('#insertFrm').html('');
        var tipStr = '<p><label>would you like to continue ?</p>'
        $('#insertFrm').append(tipStr);

        var that = this;
        var yesButton = $("<button>");
        yesButton.addClass("btn btn-block btn-inverse active");
        yesButton.attr({
            type: "button",
            "data-toggle": "button tooltip",
        });
        yesButton.text("commit");
        yesButton.on("click", function() {
            var delRes = true;
            if (startDelRowNo <= endDelRowNo) {
                for (delRow = startDelRowNo; delRow <= endDelRowNo; delRow++) {
                    console.info("delRowNo : ", delRow);
                    delRes &= matrix.deleteRow(startDelRowNo); //actually, every del row, the left rows will move forward
                }
            } else {
                for (delRow = endDelRowNo; delRow <= startDelRowNo; delRow++) {
                    console.info("delRowNo2 : ", delRow);
                    delRes &= matrix.deleteRow(endDelRowNo);
                }
            }
            if (delRes === 1) {
                reloadData(sheet, matrix);
            } else {
                reloadData(sheet, oldMatrix);
            }
            $.unblockUI();

        });

        var noButton = $("<button>");
        noButton.addClass("btn btn-block btn-inverse active");
        noButton.attr({
            type: "button",
            "data-toggle": "button tooltip",
        });
        noButton.text("cancel");
        noButton.on("click", function() {
            console.info("cancel del col");
            $.unblockUI();
           
        });

        $('#insertFrm').append(yesButton);
        $('#insertFrm').append(noButton);

    }


    function generateColHeaderForm(sheet, matrix, colNo) {
        console.info("entry generateColHeaderForm");
        console.info("now matrix ==== ", matrix.matrix);
        var oldMatrix = matrix.copyMatrix();
        var currentColHeaderName = matrix.getColHeaderNameByColNo(colNo - 2);
        var currentColDataType = matrix.getDataTypeByColNo(colNo - 2);

        var dataTypeList = [];
        dataTypeList = g_eleType.getUseableDatatypeNameList();
        console.info("dataTypeList : ", dataTypeList);

        var tmpStr = "";
        var i = 0;
        for(i = 0; i < dataTypeList.length; i++){
            var optName = dataTypeList[i];
            if(optName == currentColDataType){
                tmpStr += '<option selected> '+ optName + '</option>';
            }else{
                tmpStr += '<option> '+ optName + '</option>';
            }
            
        }
        console.info("tmpStr : ", tmpStr);

        $('#editFrm').html('');
        var colNameStr = '<p><label>column header name:</label><br><input type="text" id = "inputColHeaderName" value= ' + '"' + currentColHeaderName + '"' +'/></p>';
        var dataTypeStr = '<p><label>data Type :</label><br><select name="dataType" id="inputDataType">' + tmpStr;

        $('#editFrm').append(colNameStr);
        $('#editFrm').append(dataTypeStr);

        var that = this;
        var button = $("<button>");
        button.addClass("btn btn-block btn-inverse active");
        button.attr({
            type: "button",
            "data-toggle": "button tooltip",
            title: "Click this to enable/disable viewing of " + that
        });
        button.text("commit");
        button.on("click", function() {
            console.info("come into dataChangeButton click")
            var newValue = $('#inputColHeaderName').val();
            if (newValue != currentColHeaderName) {
                if (true == matrix.setColHeader(colNo - 2, newValue)) {
                    reloadData(sheet, matrix);
                } else {
                    alert("error to set column information");
                    reloadData(sheet, oldMatrix);
                }
            }
            var newDataType = $('#inputDataType').val();
            if (newDataType != currentColDataType) {
                if (true == matrix.changeColDataType(colNo - 2, newDataType)) {
                    reloadData(sheet, matrix);
                } else {
                    alert("error to set column information!");
                    reloadData(sheet, oldMatrix);
                }
            }

        });

        $('#editFrm').append(button);

    }


    function generateRowHeaderForm(sheet, matrix, rowNo) {
        console.info("entry generateRowHeaderForm");
        var oldMatrix = matrix.copyMatrix();
        var currentRowHeaderName = matrix.getRowHeaderNameByRowNo(rowNo - 2);

        $('#editFrm').html('');
        var rowNameStr = '<p><label>row header name:</label><br><input type="text" id = "inputRowHeaderName" value= ' + '"' + currentRowHeaderName + '"' + '/></p>'
        $('#editFrm').append(rowNameStr);

        var that = this;
        var button = $("<button>");
        button.addClass("btn btn-block btn-inverse active");
        button.attr({
            type: "button",
            "data-toggle": "button tooltip",
            title: "Click this to enable/disable viewing of " + that
        });
        button.text("commit");
        button.on("click", function() {
            console.info("come into dataChangeButton click")
            var newValue = $('#inputRowHeaderName').val();
            if (newValue != currentRowHeaderName) {
                if (true == matrix.setRowHeader(rowNo - 2, newValue)) {
                    reloadData(sheet, matrix);
                } else {
                    reloadData(sheet, oldMatrix);
                }
            }

        });

        $('#editFrm').append(button);
    }

    
    function generateSaveForm() {
        console.info("entry generateSaveForm");

        $('#insertFrm').html('');
        var saveFileName = '<p><label>file Name:</label><br><input type="text" id = "inputSaveFileName" value= ' + '"' + '"' + '/></p>'
        $('#insertFrm').append(saveFileName);

        var that = this;
        var yesButton = $("<button>");
        yesButton.addClass("btn btn-block btn-inverse active");
        yesButton.attr({
            type: "button",
            "data-toggle": "button tooltip",
        });
        yesButton.text("commit");
        yesButton.on("click", function() {
            var newFileName = $('#inputSaveFileName').val();
            console.info("save to server file name: ", newFileName);
            saveCurrentSheetToServer(newFileName, myMatrix);
            $.unblockUI();
        });

        var noButton = $("<button>");
        noButton.addClass("btn btn-block btn-inverse active");
        noButton.attr({
            type: "button",
            "data-toggle": "button tooltip",
        });
        noButton.text("cancel");
        noButton.on("click", function() {
            console.info("cancel save file");
            $.unblockUI();
        });

        $('#insertFrm').append(yesButton);
        $('#insertFrm').append(noButton);
    }    


    function generateNormalDataForm(sheet, matrix, rowNo, colNo) {
        console.info("entry generateNormalDataForm");
        var oldMatrix = matrix.copyMatrix();
        var currentColHeaderName = matrix.getColHeaderNameByColNo(colNo - 2);
        var currentColDataType = matrix.getDataTypeByColNo(colNo - 2);
        var currentRowHeaderName = matrix.getRowHeaderNameByRowNo(rowNo -2);
        var tmp = matrix.getEleByXY(rowNo - 2, colNo - 2);
        var currentData = "";
        if (false == tmp) //ugly, fix me
        {
            currentData = "";
        } else {
            currentData = tmp.data;
        }
        console.info("entry 116");
        
        $('#editFrm').html('');

        var colNameStr = '<p><label>column header name:</label><br><input type="text" id = "inputColHeaderName" value= ' + '"' + currentColHeaderName + '"' +' readonly="readonly"/></p>'
        var rowNameStr = '<p><label>row header name:</label><br><input type="text" id = "inputRowHeaderName" value= ' + '"' + currentRowHeaderName + '"' +' readonly="readonly"/></p>'
        var dataTypeStr = '<p><label>data type:</label><br><input type="text" id = "inputDataType" value= ' + '"' + currentColDataType + '"' +' readonly="readonly"/></p>'
        var dataStr = '<p><label>data:</label><br><input type="text" id = "inputNewData" value= ' + '"' + currentData + '"' + '/></p>'
        $('#editFrm').append(colNameStr);
        $('#editFrm').append(rowNameStr);
        $('#editFrm').append(dataTypeStr);
        $('#editFrm').append(dataStr);


        var that = this;
        var button = $("<button>");
        button.addClass("btn btn-block btn-inverse active");
        button.attr({
            type: "button",
            "data-toggle": "button tooltip",
            title: "Click this to enable/disable viewing of " + that
        });
        button.text("commit");
        button.on("click", function() {
            console.info("come into dataChangeButton click")
            var newValue = $('#inputNewData').val();
            var res = matrix.setData(rowNo - 2, colNo - 2, newValue);
            if (false == res) {
                alert("error to set data!");
                reloadData(sheet, oldMatrix);
            } else {
                reloadData(sheet, matrix);
            }
            
        });

        $('#editFrm').append(button);

    }


    function loadFileFromServer(fileName) {
        var loadBody = new fileInServer();
        loadBody.setSaveData(fileName, '');
        var bodyData = JSON.stringify(loadBody);

        $.ajax({
            type: "POST",
            url: "/loadFileFromServer",
            data: bodyData,
            contentType: "application/json; charset=utf-8",
            //contentType: "text/html; charset=utf-8",
            //dataType: "json",
            async: "false",
            success: function(data) {
                console.info("load file = ", data);
                var loadMatrix = JSON.parse(data);
                myMatrix.loadData(loadMatrix);
                reloadData(mySheet, myMatrix);
            },
            failure: function(errMsg) {
                alert("load file error");
            }
        });

    }


    function generateLoadForm() {
        $('#insertFrm').html('');
        console.info("entry generateLoadForm");

        fileNameList = [];
        $.ajax({
            type: "POST",
            url: "/getSaveFileList",
            data: '',
            contentType: "application/json; charset=utf-8",
            async: "false",
            success: function(data) {
                console.info("getSaveFileListFromServer = ", data);
                fileNameList = JSON.parse(data);
                console.info("fileNameList parse = ", fileNameList);
                if (fileNameList.length == 0) {
                    alert("no file exist");
                    $.unblockUI();
                    return;
                }

                var tmpStr = "";
                var i = 0;
                for (i = 0; i < fileNameList.length; i++) {
                    var fileName = fileNameList[i];
                        tmpStr += '<option> ' + fileName + '</option>';
                }
                console.info("tmpStr : ", tmpStr);

                $('#insertFrm').html('');
                var dataTypeStr = '<p><label>load File Name :</label><br><select name="loadFileName" id="inputLoadFileName">' + tmpStr;
                $('#insertFrm').append(dataTypeStr);

                var that = this;
                var yesButton = $("<button>");
                yesButton.addClass("btn btn-block btn-inverse active");
                yesButton.attr({
                    type: "button",
                    "data-toggle": "button tooltip",
                });
                yesButton.text("commit");
                yesButton.on("click", function() {
                    var newFileName = $('#inputLoadFileName').val();
                    console.info("submit loadFile select fileName = ", newFileName);
                    loadFileFromServer(newFileName);
                    $.unblockUI();
                });

                var noButton = $("<button>");
                noButton.addClass("btn btn-block btn-inverse active");
                noButton.attr({
                    type: "button",
                    "data-toggle": "button tooltip",
                });
                noButton.text("cancel");
                noButton.on("click", function() {
                    console.info("cancel Load file");
                    $.unblockUI();
                });

                $('#insertFrm').append(yesButton);
                $('#insertFrm').append(noButton);
            }
        });
    }

    function createForm(sheet, matrix, rowNo, colNo) {
        $('#editFrm').html('');
        var cellType = sheet.getCellDataType(rowNo, colNo);
        switch (cellType) {
            case "colHeader":
                {
                    //alert("colHeader");
                    generateColHeaderForm(sheet, matrix, colNo);
                }
                break;
            case "rowHeader":
                {
                    //alert("rowHeader");
                    generateRowHeaderForm(sheet, matrix, rowNo);
                }
                break;
            case "data":
            case "pendingData":
                {
                    generateNormalDataForm(sheet, matrix, rowNo, colNo);
                    //alert("data");
                }
                break;
            default:
                {
                    return false;
                }
                break;
        }
    }


    function fileInServer() {
        this.fileName = '';
        this.matrix = '';
        this.setSaveData = function(fileName, matrix) {
            this.fileName = fileName;
            this.matrix = matrix;
        }
    }

    function saveCurrentSheetToServer(fileName, matrix) {
        console.info("entry saveCurrentSheetToServer");
        var saveBody = new fileInServer();

        saveBody.setSaveData(fileName, matrix)
        var bodyData = JSON.stringify(saveBody);
        $.ajax({
            type: "POST",
            url: "/saveToServer",
            // The key needs to match your method's input parameter (case-sensitive).
            //data: JSON.stringify({ Markers: markers }),
            data: bodyData,
            //data: JSON.stringify(myData_1.matrix),
            contentType: "application/json; charset=utf-8",
            //contentType: "text/html; charset=utf-8",
            //dataType: "json",
            //async: "false",
            success: function(data) {
                //alert(data);
                return true;
            },
            failure: function(errMsg) {
                alert(errMsg);
                return false;
            }
        });
    }


    var selectStartRow = 0;
    var selectStartCol = 0;
    var selectEndRow = 0;
    var selectEndCol = 0;

    function setSelectRowAndCol(startRow, startCol, endRow, endCol){
        selectStartRow = startRow;
        selectStartCol = startCol;
        selectEndRow = endRow;
        selectEndCol = endCol;
        console.info(" afterSelection : startRow : ", selectStartRow);
        console.info(" afterSelection : startCol : ", selectStartCol);
        console.info(" afterSelection : endRow : ", selectEndRow);
        console.info(" afterSelection : endCol : ", selectEndCol);
    }


    var clickRow = 0;
    var clickCol = 0;

    function setClickRowAndCol(sheet, matrix, row, col) {
        clickRow = row;
        clickCol = col;
        createForm(sheet, matrix, row, col);
    }

    function reloadData(sheet, matrix) {
        sheet.reLoadSheet(matrix);
        hot.loadData(sheet.showSheet);
        console.info("after reloadData");
    }

    function setChange(sheet, matrix, changeArray) {
        var changeCellNum = changeArray.length;
        var i = 0;
        var res = true;
        for (i = 0; i < changeCellNum; i++) {
            var rowNo = changeArray[i][0];
            var colNo = changeArray[i][1];
            var oldValue = changeArray[i][2];
            var newValue = changeArray[i][3];

            var cellType = sheet.getCellDataType(rowNo, colNo);
            if ("colHeader" == cellType) {
                res = matrix.setColHeader(colNo - 2, newValue);
                if (false == res) {
                    alert("error to set column header name!");
                }
                return res;
            } else if ("rowHeader" == cellType) {
                res = matrix.setRowHeader(rowNo - 2, newValue);
                if (false == res) {
                    alert("error to set row header name!");
                }
                return res;

            } else if ("data" == cellType || "pendingData" == cellType) {
                res = matrix.setData(rowNo - 2, colNo - 2, newValue);
                if (false == res) {
                    alert("error to set data!");
                }
                return res;
            } else {
                var msg = "incorrect cell type to modify rowNo: " + rowNo + "colNo: " + colNo;
                alert(msg);
                return false;
            }
        }
        return false;
    }

    function checkMatrixValid(matrix) {
        return true;
    }

    function onEditCell(sheet, matrix, changeArray) {
        var oldMatrix = matrix;
        if (false == setChange(sheet, matrix, changeArray)) {
            reloadData(sheet, oldMatrix);
            return false;
        }
        if (false == checkMatrixValid(matrix)) {
            alert("error to checkMatrixValid");
            reloadData(sheet, oldMatrix);
            return false;
        }
        reloadData(sheet, matrix);
        return true;

    }


    console.info("xxxxxxxxxxxxxx start xxxxxxxxxxxxxx");

    var myMatrix = new matrix();

    console.info("9999999999999999 ");

    if (false == loadMatrixFromLocalStorage("computedMatrix", myMatrix)) {
        alert("no previous data");
        myMatrix.insertColumn(0, "kkk", "number");
        myMatrix.insertColumn(1, "bbb", "number");
        myMatrix.insertColumn(2, "ccc", "number");

        myMatrix.setMatrixData("400", 0, 0);
        myMatrix.setMatrixData("401", 0, 1);
        myMatrix.setMatrixData("402", 0, 2);

        myMatrix.setMatrixData("500", 1, 0);
        myMatrix.setMatrixData("501", 1, 1);
        myMatrix.setMatrixData("502", 1, 2);

        myMatrix.setMatrixData("601", 2, 0);
        myMatrix.setMatrixData("701", 2, 1);

        /*myMatrix.colWeight = {"kkk":1, "bbb":2, "ddd":4};*/
    } else {
        //var computedMatrix = JSON.parse(computedMatrixString);
        //var loadMatrix = JSON.parse(computedMatrix);
        //var loadMatrix = myMatrix;
        console.info("4444444444444444444 matrix:", myMatrix);
        myMatrix.loadData(myMatrix);


    }


    var mySheet = new sheet(myMatrix);

    var data = mySheet.showSheet;

    console.info("ttt data: ", data);

    mySheet.printShowSheet();



    var container = document.getElementById('hot');
    var hot = new Handsontable(container, {
        data: data,
        minSpareRows: 1,
        colHeaders: true,
        rowHeaders: true,
        manualColumnMove: true,
        //manualRowMove : true,

        afterOnCellMouseDown: function(changes, sources) {
            console.info(" sources === ", sources);
            console.info("sources.row = ", sources.row, "sources.col = ", sources.col);
            setClickRowAndCol(mySheet, myMatrix, sources.row, sources.col);
        },

        afterColumnMove: function(srcColNo, destColNo) {
            console.info("afterColumnMove, srcColNo:", srcColNo, "destColNo:", destColNo);
            //myData_1.moveCol(srcColNo, destColNo);
            //hot.loadData(mySheet.showSheet);
            myMatrix.moveCol(srcColNo - 2, destColNo - 2);
            reloadData(mySheet, myMatrix);
        },

        afterChange: function(changes, source) {
            console.info("afterChange changes : ", changes);
            console.info("afterChange source : ", source);

            if (source == "edit") {

                onEditCell(mySheet, myMatrix, changes);

            }
        },

        afterSelection: function(startRow, startCol, endRow, endCol){
            setSelectRowAndCol(startRow, startCol, endRow, endCol);
        },


        cells: function(row, col, prop) {

            if ("grey" == mySheet.getCellColorByXY(row, col)) {
                this.renderer = greyRenderer;
            } else if ("yellow" == mySheet.getCellColorByXY(row, col)) {
                this.renderer = yellowRenderer;
            } else if ("black" == mySheet.getCellColorByXY(row, col)) {
                this.renderer = blackRenderer;
            } else if ("white" == mySheet.getCellColorByXY(row, col)) {
                this.renderer = whiteRenderer;
            } else {
                this.renderer = orangeRenderer;
            }

            var cellProperties = {};
            if (true == mySheet.getCellEditableByXY(row, col)) {
                cellProperties.readOnly = false;
            } else {
                cellProperties.readOnly = true;
            }
            return cellProperties;

        },



    });


    $('#cssmenu li.has-sub>a').on('click', function() {
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp();
        } else {
            element.addClass('open');
            element.children('ul').slideDown();
            element.siblings('li').children('ul').slideUp();
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp();
        }
    });



    $('#Save').click(function() {
        console.info("save");
        generateSaveForm();
        $.blockUI({
            message: $('#insertFrm')
        });

    });

    $('#Load').click(function() {
        console.info("Load");
        generateLoadForm();
        $.blockUI({
            //$.fn.blockUI({
            message: $('#insertFrm')
        });

    });

    $('#New').click(function() {
        console.info("new");
        generateInsertColumnForm(mySheet, myMatrix, 0, mySheet.sheetColNum - 1, false);

        $.blockUI({
            //$.fn.blockUI({
            message: $('#insertFrm')
        });
    });

    $('#InsertCB').click(function() {
        console.info("insert column before");
        generateInsertColumnForm(mySheet, myMatrix, clickRow, clickCol, true);

        $.blockUI({
            //$.fn.blockUI({
            message: $('#insertFrm')
        });
    });

    $('#InsertCA').click(function() {
        console.info("insert column after");
        generateInsertColumnForm(mySheet, myMatrix, clickRow, clickCol, false);

        $.blockUI({
            //$.fn.blockUI({
            message: $('#insertFrm')
        });
    });

    $('#InsertRB').click(function() {
        console.info("insert row before");
        generateInsertRowForm(mySheet, myMatrix, clickRow, clickCol, true);

        $.blockUI({
            //$.fn.blockUI({
            message: $('#insertFrm')
        });
    });

    $('#InsertRA').click(function() {
        console.info("insert row after");
        generateInsertRowForm(mySheet, myMatrix, clickRow, clickCol, false);

        $.blockUI({
            //$.fn.blockUI({
            message: $('#insertFrm')
        });
    });

    $('#DeleteColumn').click(function() {
        console.info("delete column");
        generateDeleteColForm(mySheet, myMatrix, selectStartCol, selectEndCol);
        $.blockUI({
            //$.fn.blockUI({
            message: $('#insertFrm')
        });
    });

    $('#DeleteRow').click(function() {
        console.info("delete row");
        generateDeleteRowForm(mySheet, myMatrix, selectStartRow, selectEndRow);

        $.blockUI({
            //$.fn.blockUI({
            message: $('#insertFrm')
        });
    });



    $('#AHPWeight').click(function() {
        saveMatrix2LocalStorage("localMatrix", myMatrix);
        var win = window.open("/AHPConfPage1", '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Broswer has blocked it
            alert('Please allow popups for this site');
        }

    });


    $('#calculate').click(function() {
        //localStorage.setItem("localMatrix", JSON.stringify(myMatrix));
        //var win = window.open("/computingPage", '_blank');
        saveMatrix2LocalStorage("localMatrix", myMatrix);
        var win = window.open("/normalComputingPage", '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Broswer has blocked it
            alert('Please allow popups for this site');
        }
    });


    $('#purifyData').click(function() {
        saveMatrix2LocalStorage("localMatrix", myMatrix);
        var win = window.open("/biaoZhunHuaPage", '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Broswer has blocked it
            alert('Please allow popups for this site');
        }
    });

    $("#load li a").click(function(e) {
        console.info("load");
    });

    $("#import li a").click(function(e) {
        console.info("import");
    });


});