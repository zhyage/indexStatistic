$(document).ready(function() {

    var g_submitMathContent = {};

    $('#formularCancelButton').click(function() {

        return true;
    });

    $('#formularCommitButton').click(function() {
        var targetVarName = getTargetVarName();
        var expression = getExpression();
        g_submitMathContent.targetVarName = targetVarName;
        g_submitMathContent.expression = expression;


        submitMath2Server("zhy", "123", "normalCompute", normalComputingMatrix, g_submitMathContent);

        return true;
    });


    var normalComputingMatrix = new matrix();
    var colNameList = [];

    function getMatrixData() {
        loadMatrixFromLocalStorage("localMatrix", normalComputingMatrix);
        console.info("normalComputingMatrix colNum: ", normalComputingMatrix.colNum);

        var i = 0;

        for (i = 0; i < normalComputingMatrix.colNum; i++) {
            colNameList.push(normalComputingMatrix.getColHeaderNameByColNo(i));
        }

    }

    function columDataClicked(e){
        modifyExpression(this.name);
    }


    function attachButtonClickHandlers() {
        // get reference to element containing toppings checkboxes
        var el = document.getElementById('colNameList');

        // get reference to input elements in toppings container element
        var tops = el.getElementsByTagName('input');

        // assign updateTotal function to onclick property of each checkbox
        for (var i = 0, len = tops.length; i < len; i++) {
            if (tops[i].type === 'button') {
                tops[i].onclick = columDataClicked;
            }
        }
    }

    function generateColumListButton() {
        getMatrixData();

        var appendStr = "";
        var i = 0;
        for (i = 0; i < colNameList.length; i++) {
            var colName = '"' + colNameList[i] + '"';
            console.info("colName :", colName);
            var tmpStr = '<label><input type="button" class="btn btn-primary" name=' + colName + ' value = ' + colName + ' /> </label> <br>';

            console.info("tmpStr : ", tmpStr);
            appendStr = appendStr.concat(tmpStr);
        }
        console.log("appendStr :", appendStr);
        $("#colNameList").append(appendStr);
        attachButtonClickHandlers();
    }


    generateColumListButton();

});


var gExpressionRes = {
    expressionString: "",
    cursorStart: 0,
    cursorEnd: 0
};

function getExpressionAndCursorPosition() {
    gExpressionRes.expressionString = $('#numericExpressions').val();
    gExpressionRes.cursorStart = $('#numericExpressions').prop("selectionStart");
    gExpressionRes.cursorEnd = $('#numericExpressions').prop("selectionEnd");
    //alert(JSON.stringify(gExpressionRes));
}

function setExpression(expressString) {
    $('#numericExpressions').val(expressString);
}

function setHints(hitMessage) {
    $('#numericExpressionsHint').val(hitMessage);
}

function getExpression() {
    return $('#numericExpressions').val();
}

function getTargetVarName() {
    return $('#targetVariable').val();
}

function modifyExpression(addString) {
    var newExpress = "";
    getExpressionAndCursorPosition();
    if (0 == gExpressionRes.expressionString) {
        newExpress = addString;
    } else {
        var first = gExpressionRes.expressionString.slice(0, gExpressionRes.cursorStart);
        var tail = gExpressionRes.expressionString.slice(gExpressionRes.cursorEnd,
            gExpressionRes.expressionString.length);
        newExpress = first + addString + tail;

    }
    setExpression(newExpress);
}

function getTargetVarName() {
    return $('#targetVar').val();
}