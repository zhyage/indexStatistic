$(document).ready(function() {


    var g_selectSourceList=[];

    var g_AHPMatrix = [];

    var g_matrix;

    var g_weightFormularConf = [];

    var g_weightMethodSubmmit = {};

    var g_weightMehodAndMatrixReadyToSubmit = {};


    $('#AHPConfPage1CommitButton').click(function() {
        console.info("AHPConfPage1CommitButton g_weightMethodSubmmit :", g_weightMethodSubmmit);
        console.info("AHPConfPage1CommitButton g_AHPMatrix.length :", g_AHPMatrix.length);

        if(undefined == g_weightMethodSubmmit.methodName ){
            alert("please select and define weight method");
            return false;
        }

        if(g_AHPMatrix.length < 2){
            alert("please define Matrix");
            return false;
        }

        g_weightMehodAndMatrixReadyToSubmit.weightMethod = g_weightMethodSubmmit;
        g_weightMehodAndMatrixReadyToSubmit.matrix = g_AHPMatrix;
        submitMath2Server("zhy", "123", "weightCompute", AHPConfPage1Matrix, g_weightMehodAndMatrixReadyToSubmit);

        return true;
    });


    $('#HintYesButton').click(function() {

        // TODO: function to check the validate of parameters
        $.unblockUI();
        var buttonName = $('#inputWeightMethodText').val();
        console.info("kkk buttonName : ", buttonName);
        var currentMethod = getWeightFormularConfByButtonName(buttonName);
        console.info("kkk currentMethod : ", currentMethod);
        var methodName = currentMethod.name;
        var parameterList = currentMethod.parameters;
        var methodParameterList = [];
        _.each(parameterList, function(ele){
            var parameterName = '#targetParameters_' + ele.name;
            methodParameterList.push($(parameterName).val());
        })

        g_weightMethodSubmmit.methodName = methodName;
        g_weightMethodSubmmit.methodParameterList = methodParameterList;

        console.info("g_weightMethodSubmmit : ", g_weightMethodSubmmit);

        return true;

    })

    $('#HintCancelButton').click(function() {
        $.unblockUI();

        return true;

    })


    function addEleIntoSelectSourceList(ele) {
        if (undefined == _.find(g_selectSourceList, function(e) {
                return (ele === e);
            })) {
            g_selectSourceList.push(ele);
        }
    }

    function delEleFromSelectSourceList(ele) {
        var index = _.indexOf(g_selectSourceList, ele);
        if (-1 != index) {
            g_selectSourceList.splice(index, 1);
        }
    }

    function showSelectSourceList() {
        console.info("g_selectSourceList : ", g_selectSourceList);
    }


    function columDataSelected(e) {
        if (this.checked) {
            addEleIntoSelectSourceList(this.name);
        } else {
            delEleFromSelectSourceList(this.name);
        }
        showSelectSourceList();
        generaterAHPMatrix();
    }

    function attachCheckboxHandlers() {
            // get reference to element containing toppings checkboxes

            var el = document.getElementById('sourceDataList');

            // get reference to input elements in toppings container element
            var tops = el.getElementsByTagName('input');

            // assign updateTotal function to onclick property of each checkbox
            for (var i = 0, len = tops.length; i < len; i++) {
                if (tops[i].type === 'checkbox') {
                    tops[i].onclick = columDataSelected;
                }
            }
    }

    function generateColumListCheckBoxButton() {
        getMatrixData();

        var appendStr = "";
        var i = 0;
        for (i = 0; i < colNameList.length; i++) {
            var colName = '"' + colNameList[i] + '"';
            console.info("colName :", colName);

            var tmpStr = '<label class="btn btn-primary"> <input type="checkbox" autocomplete="off" name=' + colName + ' value = ' + colName + '> ' + colName + ' </label>'


            console.info("tmpStr : ", tmpStr);
            appendStr = appendStr.concat(tmpStr);
        }
        console.log("appendStr :", appendStr);
        $("#sourceDataList").append(appendStr);
        attachCheckboxHandlers();
    }

    function weightMethodSelected(e){
        console.info("come into weightMethodSelected, value  : ", this.value, "id : ", this.id);
        generateParameterHintForm(this.value);
    }

    function getWeightFormularConfByName(name) {
        var formular = _.find(g_weightFormularConf, function(formular) {
            return (formular.name === name)
        })
        return formular;
    }

    function getWeightFormularConfByButtonName(name) {
        var formular = _.find(g_weightFormularConf, function(formular) {
            return (formular.buttonName === name)
        })
        return formular;
    }

    function generateParameterHintForm(methodName) {

        var currentMethod = getWeightFormularConfByName(methodName);
        var buttonName = currentMethod.buttonName;
        var parameterList = currentMethod.parameters;
        var parameterAppendStr = "";
        var inputMethodAppendStr = "";

        inputMethodAppendStr = '<p><label>weight method:</label><input type="text" id = "inputWeightMethodText" value= ' + buttonName + ' readonly="readonly"/></p>';

        $("#HintInputMethod").html('');
        $("#HintInputMethod").append(inputMethodAppendStr);
        

        _.each(parameterList, function(ele) {
            console.info("ele.name :", ele.name);
            console.info("ele.hint :", ele.hint);
            parameterAppendStr = parameterAppendStr + '<p><label>' + ele.hint + ' </label> <p><label>' + ele.name + ' :</label><input type="text" id = "targetParameters_' + ele.name + '" /></p>'

        })
        $("#HintParameterList").html('');
        $("#HintParameterList").append(parameterAppendStr);

        var commentStr = '<p><label>commnet :</label><input type="text" id = "inputTargetDataComment" value= ""></p>';
        $('#HintComment').html('');
        $('#HintComment').append(commentStr);

        //TODO: to design a more flex and complicate rules for show parameters

        $.blockUI({
            message: $('#parameterHintFrm')
        });

    }



    function attachRadioButtonHandlers() {
            // get reference to element containing toppings checkboxes

            var el = document.getElementById('weightMethodList');

            // get reference to input elements in toppings container element
            var tops = el.getElementsByTagName('input');

            // assign updateTotal function to onclick property of each checkbox
            for (var i = 0, len = tops.length; i < len; i++) {
                if (tops[i].type === 'radio') {
                    tops[i].onclick = weightMethodSelected;
                }
            }
    }

    function generateWeightMethodRadioButton() {

        var appendStr = "";
        var i = 0;
        for (i = 0; i < g_weightFormularConf.length; i++) {
            var buttonName = g_weightFormularConf[i].buttonName;
            var methodName = g_weightFormularConf[i].name;
            console.info("buttonName :", buttonName);

            //var tmpStr = '<label class="btn btn-primary"> <input type="checkbox" autocomplete="off" name=' + colName + ' value = ' + colName + '> ' + colName + ' </label>'
            var tmpStr = '<label class="btn btn-primary"> <input type="radio" name="options" '  +  'value=' + methodName + ' id =' + methodName +  ' autocomplete="off"> ' + buttonName + ' </label>'

            console.info("tmpStr : ", tmpStr);
            appendStr = appendStr.concat(tmpStr);
        }
        console.log("appendStr :", appendStr);
        $("#weightMethodList").append(appendStr);
        attachRadioButtonHandlers();
    }

    var AHPConfPage1Matrix = new matrix();
    var colNameList = [];

    function getMatrixData() {
        loadMatrixFromLocalStorage("localMatrix", AHPConfPage1Matrix);
        console.info("AHPConfPage1Matrix colNum: ", AHPConfPage1Matrix.colNum);

        var i = 0;

        for (i = 0; i < AHPConfPage1Matrix.colNum; i++) {
            colNameList.push(AHPConfPage1Matrix.getColHeaderNameByColNo(i));
        }

    }

    function generaterAHPMatrix() {
        var matrixDim = g_selectSourceList.length + 1;
        console.info("matrixDim : ", matrixDim);

        g_AHPMatrix = new Array();
        for(i = 0; i < matrixDim ; i++)
        {
            g_AHPMatrix[i] = new Array();
            for(j = 0; j < matrixDim; j++)
            {
                if(0 === i && 0 === j){
                    g_AHPMatrix[i][j] = '\\';
                }else if(0 === j){
                    g_AHPMatrix[i][j] = g_selectSourceList[i - 1];
                }else if(0 === i){
                    g_AHPMatrix[i][j] = g_selectSourceList[j - 1];
                }else if(i == j){
                    g_AHPMatrix[i][j] = '1';
                }else{
                    g_AHPMatrix[i][j] = '1';
                }
                
            }
        }

        console.info("ggggg_AHPMatrix : ", g_AHPMatrix);

        g_matrix.loadData(g_AHPMatrix);
    }

    
    function onEditCell(changeArray) {
        console.info("changeArray : ", changeArray)
        console.info("after change AHPMatrix : ", g_AHPMatrix);
        var changeCellNum = changeArray.length;
        var i = 0;
        var res = true;
        for (i = 0; i < changeCellNum; i++) {
            var rowNo = changeArray[i][0];
            var colNo = changeArray[i][1];
            var oldValue = changeArray[i][2];
            var newValue = changeArray[i][3];

            try{
                var crossVar = math.fraction(1 / math.fraction(newValue));
            }catch(err) {
                res = false;
                alert("incorrect input value");
                g_AHPMatrix[rowNo][colNo] = oldValue;
            }

            if(res){
                g_AHPMatrix[colNo][rowNo] = crossVar.n.toString() + '/' + crossVar.d.toString();
            }                
        }

        g_matrix.loadData(g_AHPMatrix);
            
    }


    function initAHPMatrix() {

        var container = document.getElementById('AHPMatrix');
        g_matrix = new Handsontable(container, {
            data: g_AHPMatrix,
            rowHeaders: true,
            colHeaders: true,

            afterChange: function(changes, source) {
                console.info("afterChange changes : ", changes);
                console.info("afterChange source : ", source);

                if (source == "edit") {
                    onEditCell(changes);
                }
            },


            cells: function(row, col, prop) {


                var cellProperties = {};
                if (row == 0 || col == 0 || row == col) {
                    cellProperties.readOnly = true;
                }
                return cellProperties;

            },

        });
    }


    function getWeightFormulaConfFromServer() {

        console.info("entry getWeightFormulaConfFromServer");

        $.ajax({
            type: "POST",
            url: "/toGetWeightFormulaConf",
            data: "",
            contentType: "application/json; charset=utf-8",
            async: "false",
            success: function(data) {
                //alert(data);
                g_weightFormularConf = JSON.parse(data);
                console.info("g_weightFormularConf : ", g_weightFormularConf);
                //showFormulaList(formularConf);
                //initSelectedSourceDataList();
                generateWeightMethodRadioButton();
            },
            failure: function(errMsg) {
                alert(errMsg);
                //return false;
            }
        });
    }

    generateColumListCheckBoxButton();
    getWeightFormulaConfFromServer();

    initAHPMatrix();



})