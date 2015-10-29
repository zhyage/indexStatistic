

function cellTypeEnume()
{
    this.cellEnume = 
    [
        {
            type: "blank",
            editable: false,
            color:"grey",
        },
        {
            type: "colHeader",
            editable: true,
            color:"yellow",
        },
        {
            type: "rowHeader",
            editable: true,
            color: "yellow",
        },
        {
            type: "colRW",
            editable: false,
            color: "black",
        },
        {
            type: "rowRW",
            editable: false,
            color: "black",
        },
        {
            type: "data", 
            editable: true,
            color: "white",
        },
        {
            type: "pendingData",
            editable: true,
            color: "white",
        },
        
    ]

    this.checkCellTypeValide = function(type)
    {
        var i = 0;
        for(i = 0; i < this.cellEnume.length; i++)
        {
            var e = this.cellEnume[i];
            if(type == e.type)
            {
                return true;
            }

        }
        return false;
    }
}

var g_cellEnume = new cellTypeEnume();

function getColorByCellType(cellType)
{
    var i = 0;
    for(i = 0; i < g_cellEnume.cellEnume.length; i++)
    {
        var e = g_cellEnume.cellEnume[i];
        if(cellType == e.type)
        {
            return e.color;
        }
    }
    return "unknow";
}

function getEditableByCellType(cellType)
{
    var i = 0;
    for(i = 0; i < g_cellEnume.cellEnume.length; i++)
    {
        var e = g_cellEnume.cellEnume[i];
        if(cellType == e.type)
        {
            return e.editable;
        }
    }
    return "unknow";
}

function eleDataTypeEnume()
{
    this.datatypeEnume = 
    [
        {
            name: "number",
            comment: "this is a number",
            defaultValue: "0.00",
            validate: function fun(n)
            {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }
        },
        {
            name: "string",
            comment: "this is string",
            defaultValue: " ",
            validate: function fun(n)
            {
                if(n.length == 0)
                {
                    return false;
                }
                return true;
            }
        },
        {
            name: "region",
            comment: "this is region",
            defaultValue: "0.00-0.00",
            validate: function fun(n)
            {
                var arr = n.split("-");
                if (arr.length != 2)
                {
                    return false;
                }
                for (e in arr)
                {
                    if(Number(e) != e)
                    {
                        return false;
                    }
                }
                return true;
            }
        },
        {
            name: "undefine",
            comment: "this is undefine data",
            defaultValue: "",
            validate: function fun(n)
            {
                return true;
            }
        }
    ]

    this.getDatatypeByName = function(name)
    {
        for(t in this.typeEnume)
        {
            if(name == t.name)
            {
                return t;
            }
        }
        return null;
    }

    this.getDataDefaultValueByType = function(type)
    {
        var i = 0;
        for(i = 0; i < this.datatypeEnume.length; i++)
        {
            var e = this.datatypeEnume[i];
            if(type == e.name)
            {
                return e.defaultValue;
            }
        }
        return "";
    }

    this.getDataTypeCommentByName = function(name)
    {
        for(t in this.typeEnume)
        {
            if(name == t.name)
            {
                return t.comment;
            }
        }
        return "";
    }

    this.getDatatypeNameList = function()
    {
        var list = [];
        for (t in this.typeEnume)
        {
            list.push(t.name);
        }
        return list;
    }

    this.getUseableDatatypeNameList = function()
    {
        var list = [];
        for(i = 0; i < this.datatypeEnume.length; i++)
        {
            var e = this.datatypeEnume[i];
            if('undefine' != e.name)
            {
                list.push(e.name);
            }
        }
        return list;
    }

    this.checkDataValide = function(data, type)
    {
        var i = 0;
        for(i = 0; i < this.datatypeEnume.length; i++)
        {
            var e = this.datatypeEnume[i];
            if(type == e.name)
            {
                //console.info("----type ", type, "e.name", e.name, "data = ", data)
                if(true == e.validate(data))
                {
                    return true;
                }
            }
        }
        return false;

    }

    this.checkDataTypeValide = function(dataType)
    {
        var i = 0;
        for(i = 0; i < this.datatypeEnume.length; i++)
        {
            var e = this.datatypeEnume[i];
            if(dataType == e.name)
            {
                return true;
            }
        }
        console.error("checkDataTypeValide error dataType : ", dataType);
        return false;
    }


};

var g_eleType = new eleDataTypeEnume();


function ele()
{
    this.init = false;//just for hold the place, no real data be set
    this.dataType = "";
    this.colHeaderName = "";//for the column headerName
    this.rowHeaderName = "";//for the row headerName
    //this.posX = 0;
    //this.posY = 0;
    this.writeable = false;
    this.data = "";//data all store by string


    this.setEleColHeaderName = function(colHeaderName)
    {
        this.colHeaderName = colHeaderName;
        return true;
    }
    this.setEleRowHeaderName = function(rowHeaderName)
    {
        this.rowHeaderName = rowHeaderName;
        return true;
    }
    /*
    this.setElePos = function(x, y)
    {
        this.posX = x;
        this.posY = y;
        return true;
    }
    */
    this.setEleWriteable = function(writeable)
    {
        this.writeable = writeable;
        return true;
    }
    this.setEleData = function(dataType, data, init)
    {
        if(init == false)
        {
            /*   
            this.data = g_eleType.getDataDefaultValueByType(dataType);

            if(false == g_eleType.checkDataTypeValide(dataType))
            {
                return false;
            }
            this.dataType = dataType;
            return true;
            */
            if(false == g_eleType.checkDataValide(data, dataType))
            {
                console.info("error to checkDataValide data: ", data, "dataType :", dataType);
                return false;
            }
            this.init = true;
            this.data = data;
            this.dataType = dataType;
            return true;

        }
        else
        {
            if(false == g_eleType.checkDataValide(data, dataType))
            {
                console.info("error to checkDataValide data: ", data, "dataType :", dataType);
                return false;
            }
            this.init = true;
            this.data = data;
            this.dataType = dataType;
            return true;
        }
    }

    this.setEle = function(dataType, colHeaderName, rowHeaderName, data, x, y)
    {  
        var res = this.setEleColHeaderName(colHeaderName)&
                    this.setEleRowHeaderName(rowHeaderName)&
                    this.setEleData(dataType, data, true);
        if(false == res)
        {
            console.info("setEle res : false");
        }
        else
        {
            console.info("setEle res: true");
        }
        return res;
    }

    this.createEle = function(dataType, colHeaderName, rowHeaderName, x, y)//hold the ele place.
    {
        var res = this.setEleColHeaderName(colHeaderName)&
                    this.setEleRowHeaderName(rowHeaderName)&
                    this.setEleData(dataType, g_eleType.getDataDefaultValueByType(dataType), false);
        if(false == res)
        {
            console.error("createEle res : false");
        }
        else
        {
            console.info("createEle res: true");
        }
        return res;
    }
}


function matrix()
{
    this.colNum = 0;
    this.rowNum = 0;
    this.matrix = [];
    this.colWeight = {};
    this.rowWeight = {};


    this.verifyMatrix = function(){
        //console.info("verifyMatrix, this.rowNum = ", this.rowNum, "this.colNum = ", this.colNum);
        var needCleanUpCol = [];
        for(x = 0; x < this.rowNum; x++){
            for(y = 0; y < this.colNum; y++){
                var e = this.getEleByXY(x, y)
                //console.info("verifyMatrix, dataType: ", e.dataType);
                //console.info("verifyMatrix, data value: ", e.data);
                if(false == g_eleType.checkDataValide(e.data, e.dataType)){
                    var alertStr = "ther is illegal data in colnume : " + e.colHeaderName;
                    needCleanUpCol.push(this.getColNoByColHeaderName(e.colHeaderName));
                    alert(alertStr);
                }
            }
        }
        return needCleanUpCol;
    }

    this.cleanUpIllegalColnum = function(needCleanUpCol){
        for(i = 0; i < needCleanUpCol.length; i++){
            this.deleteColumn(needCleanUpCol[i]);
        }
    }

    this.loadData = function(matrix)
    {
        this.colNum = matrix.colNum;
        this.rowNum = matrix.rowNum;
        this.matrix = matrix.matrix;
        this.colWeight = matrix.colWeight;
        this.rowWeight = matrix.rowWeight;
        this.cleanUpIllegalColnum(this.verifyMatrix());
    }


    this.initMatrix = function(x, y)
    {
        this.colNum = x;
        this.rowNum = y;
        var i = 0;
        var j = 0;
        this.matrix = new Array();
        for(i = 0; i < this.rowNum; i++)
        {
            this.matrix[i] = new Array();
            for(j = 0; j < this.colNum; j++)
            {
                var e = new ele()
                //this.setEle = function(dataType, colHeaderName, rowHeaderName, data, x, y)

                var res = e.createEle("undefine", "col"+j.toString(), "row"+i.toString(), i, j);

                if(false == res)
                {
                    console.error("in initMatrix, createEle error");
                    return false;
                }
                else
                {
                    var jsonStr = (e);
                    this.matrix[i][j] = jsonStr;
                }
            }
        }
        return true;
    }


    this.copyMatrix = function()
    {
        var copyMatrix = this.matrix;
        return copyMatrix;
    }

    this.printMatrix = function()
    {
        var i = 0;
        var j = 0;
        for(i = 0; i < this.rowNum; i++)
        {
            for(j = 0; j < this.colNum; j++)
            {
                console.info("matrix[", i, "][", j, "] = ", this.matrix[i][j]);
                console.info(" | ");
            }
            console.info("------------------------------------------------------------");
        }
    }

    this.getColWeightValueByColHeaderName = function(colHeaderName){
        console.info("colWeight : ", this.colWeight);
        return this.colWeight[colHeaderName];
    }

    this.insertColumn = function(colNo, colHeaderName, dataType)
    {
        var i = 0;
        var j = 0;

        if(colNo > this.colNum)//column must continuous
        {
            console.info("error to insertColumn, column must continuous");
            return false;
        }

        if(0 == this.rowNum)//no data in matrix
        {
            this.initMatrix(1, 1);
            var e = new ele();
            res = e.createEle(dataType, colHeaderName, "", 0, 0);
            if(false == res)
            {
                console.info("incorrect new insert data");
                return false;
            }
            this.matrix[i][j] = (e);
            return true;
        }

        var copyMatrix = this.copyMatrix();
        var oldColNum = this.colNum;
        var oldRowNum = this.rowNum;

        this.initMatrix(oldColNum + 1, oldRowNum);

        for(i = 0; i < this.rowNum; i++)
        {
            for(j = 0; j < this.colNum; j++)
            {       
                if(j > colNo)
                {
                    this.matrix[i][j] = copyMatrix[i][j - 1];
                }
                else if(j < colNo)
                {
                    this.matrix[i][j] = copyMatrix[i][j];
                }
                else
                {
                    var e = new ele();
                    var rowName = this.getRowHeaderNameByRowNo(i);
                    //console.info("rowName :", rowName);
                    res = e.createEle(dataType, colHeaderName, this.getRowHeaderNameByRowNo(i), i, j);

                    if(false == res)
                    {
                        console.info("incorrect new insert data");
                        return false;
                    }
                    this.matrix[i][j] = (e);
                }
            }
        }
        return true;
    }


    this.getRowHeaderNameByRowNo = function(rowNo)
    {
        var i = 0;
        for(i = 0; i < this.colNum; i++)
        {
            var eString = this.getDataByXY(rowNo, i);
            if(false == eString)
            {
                continue;
            }
            var e = (eString);
            if(true == e.init)
            {
                return e.rowHeaderName;
            }
        }
        return "";
    }

    this.deleteColumn = function(colNo)
    {
        console.info("----------------deleteCol colNo: ", colNo, "----------------------");

        if(colNo >= this.colNum)
        {
            console.error("incorrect colNo", colNo);
            return false;
        }
        var copyMatrix = this.copyMatrix();
        var oldColNum = this.colNum;
        var oldRowNum = this.rowNum;
        var i = 0;
        var j = 0;

        this.initMatrix(oldColNum - 1, oldRowNum);

        for(i = 0; i < this.rowNum; i++)
        {
            for(j = 0; j < oldColNum; j++)
            {

                if(j > colNo)
                {
                    this.matrix[i][j - 1] = copyMatrix[i][j];
                }
                else if(j < colNo)
                {
                    this.matrix[i][j] = copyMatrix[i][j];
                }
                else
                {
                    //do nothing
                }
            }
        }
        return true;
    }

    this.setMatrixData = function(data, x, y)
    {
        console.info("entry setMatrixData");
        if(y >= this.colNum)
        {
            console.error("no y space");
            return false;
        }

        if(x > this.rowNum)
        {
            console.error("in x must continuous");
            return false;
        }

        if(x == this.rowNum)//the max row, must create new ele for whole row
        {
            this.insertRow(x);
        }

        var e = this.getEleByXY(x, y)
        if(false == e)
        {
            return false;
        }
        else
        {
            var newData = new ele();

            console.info("getDataTypeByColNo: ", this.getDataTypeByColNo(y));
            console.info("getColHeaderNameByColNo: ", this.getColHeaderNameByColNo(y));
            console.info("getRowHeaderNameByRowNo: ", this.getRowHeaderNameByRowNo(x));
            res = newData.setEle(this.getDataTypeByColNo(y), 
                    this.getColHeaderNameByColNo(y), 
                    this.getRowHeaderNameByRowNo(x), 
                    data, x, y);
            if(false == res)
            {
                console.info("incorrect new insert data");
                return false;
            }
            this.matrix[x][y] = (newData);
            return true;
            
        }
    }


    this.insertRow = function(rowNo)
    {
        console.info("--------insert row rowNo:", rowNo, "------------------");
        if(this.colNum == 0)
        {
            console.error("matrix is not init yet");
            return false;
        }
        if(rowNo > this.rowNum)
        {
            console.error("incorrect rowNo", rowNo);
            return false;
        }
        
        var dataTypeList = [];
        var colHeaderNameList = [];
        for(i = 0; i < this.colNum; i++)
        {
            dataTypeList[i] = this.getDataTypeByColNo(i);
            colHeaderNameList[i] = this.getColHeaderNameByColNo(i);
        }

        var copyMatrix = this.copyMatrix();
        var oldColNum = this.colNum;
        var oldRowNum = this.rowNum;
        
        
        this.initMatrix(oldColNum, oldRowNum + 1);

        for(i = 0; i < this.rowNum; i++)
        {
            for(j = 0; j < this.colNum; j++)
            {
                if(i > rowNo)
                {
                    this.matrix[i][j] = copyMatrix[i - 1][j];
                }
                else if(i < rowNo)
                {
                    this.matrix[i][j] = copyMatrix[i][j];
                }
                else
                {
                    //console.info("tttttttttttttttttttttttttttttttt");
                    var e = new ele();

                    //res = e.createEle(this.getDataTypeByColNo(j), this.getColHeaderNameByColNo(j), "", i, j);
                    res = e.createEle(dataTypeList[j], colHeaderNameList[j], "", i, j);
                    
                    if(false == res)
                    {
                        console.info("incorrect new insert data");
                        return false;
                    }
                    this.matrix[i][j] = (e);

                }
            }
        }
        return true;
    }


    this.getColHeaderNameByColNo = function(colNo)
    {
       
        var eString = this.getDataByXY(0, colNo);
        //console.info("--------------------------------x, y: ", 0, colNo, " eString: ", eString);
        if(false == eString)
        {
            return "";
        }
        var e = (eString);
        
        return e.colHeaderName;
            
    }

    this.getColNoByColHeaderName = function(colHeaderName){
        for(y = 0; y < this.colNum; y++){
            var e = this.getDataByXY(0, y);
            if(colHeaderName == e.colHeaderName){
                return y;
            }
        }
        return false;
    }

    this.getDataTypeByColNo = function(colNo)
    {
        var eString = this.getDataByXY(0, colNo);
        //console.info("--------------------------------x, y: ", 0, colNo, " eString: ", eString);
        if(false == eString)
        {
            return "";
        }
        var e = (eString);
        
        return e.dataType;
    }

    this.getEleByXY = function(x, y)
    {
        
        if(x >= this.rowNum || y >= this.colNum)
        {
            console.error("error to getEleByXY");
            return false;
        }        
        var e = (this.matrix[x][y]);
        return e;

    }

    this.deleteRow = function(rowNo)
    {
        console.info("----------------deleteRow rowNo: ", rowNo, "----------------------");

        if(rowNo >= this.rowNum)
        {
            console.error("incorrect rowNo", rowNo);
            return false;
        }
        var copyMatrix = this.copyMatrix();
        var oldColNum = this.colNum;
        var oldRowNum = this.rowNum;
        var i = 0;
        var j = 0;

        this.initMatrix(oldColNum, oldRowNum - 1);

        for(i = 0; i < oldRowNum; i++)
        {
            for(j = 0; j < this.colNum; j++)
            {
                if(i > rowNo)
                {
                    this.matrix[i - 1][j] = copyMatrix[i][j];
                }
                else if(i < rowNo)
                {
                    this.matrix[i][j] = copyMatrix[i][j];
                }
                else
                {
                    //do nothing
                }
            }
        }
        return true;
    }

    this.moveCol = function(srcColNo, destColNo)
    {
        console.info("----------------moveCol srcColNo: ", srcColNo, "destColNo: ", destColNo, "------------");
        if(srcColNo >= this.colNum || destColNo >= this.colNum)
        {
            console.error("error to moveCol");
            return false;
        }
        var i = 0;
        var j = 0;
        var tempCol = [];
        for(i = 0; i < this.rowNum; i++)
        {
            tempCol[i] = this.matrix[i][srcColNo];
        }

        if(srcColNo < destColNo)
        {
            for(i = srcColNo; i < destColNo; i++)
            {
                for(j = 0; j < this.rowNum; j++)
                {
                    this.matrix[j][i] = this.matrix[j][i + 1];
                }
            }
        }
        else
        {
            for(i = srcColNo; i > destColNo; i--)
            {
                for(j = 0; j < this.rowNum; j++)
                {
                    this.matrix[j][i] = this.matrix[j][i - 1];
                }
            }
        }

        for(i = 0; i < this.rowNum; i++)
        {
            this.matrix[i][destColNo] = tempCol[i];
        }
        return true;
    }


    this.moveRow = function(srcRowNo, destRowNo)
    {
        console.info("----------------moveRow srcRowNo: ", srcRowNo, "destRowNo: ", destRowNo, "------------");
        if(srcRowNo >= this.rowNum || destRowNo >= this.rowNum)
        {
            console.error("error to moveRow");
            return false;
        }
        var i = 0;
        var j = 0;
        var tempRow = [];
        for(i = 0; i < this.colNum; i++)
        {
            tempRow[i] = this.matrix[srcRowNo][i];
        }

        if(srcRowNo < destRowNo)
        {
            for(i = srcRowNo; i < destRowNo; i++)
            {
                for(j = 0; j < this.colNum; j++)
                {
                    this.matrix[i][j] = this.matrix[i + 1][j];
                }
            }
        }
        else
        {
            for(i = srcRowNo; i > destRowNo; i--)
            {
                for(j = 0; j < this.colNum; j++)
                {
                    this.matrix[i][j] = this.matrix[i - 1][j];
                }
            }
        }
        for(i = 0; i < this.colNum; i++)
        {
            this.matrix[destRowNo][i] = tempRow[i];
        }
        return true;
    }

    this.generateJsonData = function()
    {
        var jsonFormatTable = (this.matrix);
        console.info("********************************************");
        console.info(jsonFormatTable);
        console.info("********************************************");
    }

    this.getDataByXY = function(rowNo, colNo)
    {
        if(colNo >= this.colNum || rowNo >= this.rowNum)
        {
            return false;
        }
        return this.matrix[rowNo][colNo];
    }

    this.setColHeader = function(colNo, name)
    {
        var i = 0;

        if(true == this.checkColHeaderExist(name))
        {
            return false;
        }

        for(i = 0; i < this.rowNum; i++)
        {
            var eString = this.getDataByXY(i, colNo);
            if(false == eString)
            {
                return false;
            }
            var e = (eString)
            if(true == e.init)
            {
                var newEle = new ele();
                if(false == newEle.setEle(e.dataType, name, e.rowHeaderName, e.data, i, colNo))
                {
                    return false;
                }
                this.matrix[i][colNo] = (newEle);
            }
        }
        return true;
    }

    this.setRowHeader = function(rowNo, name)
    {
        var i = 0;

        if(true == this.checkRowHeaderExist(name))
        {
            return false;
        } 

        for(i = 0; i < this.colNum; i++)
        {
            var eString = this.getDataByXY(rowNo, i);
            if(false == eString)
            {
                return false;
            }
            var e = (eString)
            if(true == e.init)
            {
                var newEle = new ele();
                if(false == newEle.setEle(e.dataType, e.colHeaderName, name, e.data, rowNo, i))
                {
                    return false;
                }
                this.matrix[rowNo][i] = (newEle);
            }
        }
        return true;
    }

    this.setData = function(rowNo, colNo, value)
    {
        var res = this.setMatrixData(value, rowNo, colNo);
        console.info("++++++++++++++++++++++++++ res :", res);
        return res;
    }

    this.checkColHeaderExist = function(colHeaderName)
    {
        var i = 0;
        for(i = 0; i < this.colNum; i++)
        {
            var colName = this.getColHeaderNameByColNo(i);
            if(colName == colHeaderName)
            {
                console.error("colHeaderName :", colHeaderName , "already exist");
                return true;
            }
        }
        return false;
    }

    this.checkRowHeaderExist = function(rowHeaderName)
    {
        if("" == rowHeaderName)//allow rowHeaderName be empty
        {
            return false;
        }
        var i = 0;
        for(i = 0; i < this.rowNum; i++)
        {
            var rowName = this.getRowHeaderNameByRowNo(i);
            if(rowName == rowHeaderName)
            {
                console.error("rowHeaderName :", rowHeaderName , "already exist");
                return true;
            }
        }
        return false;
    }

    this.changeColDataType = function(colNo, type)
    {
        var defaultValue = g_eleType.getDataDefaultValueByType(type);
        var i = 0;
        for(i = 0; i < this.rowNum; i++)
        {
            var e = new ele();

            res = e.createEle(type, this.getColHeaderNameByColNo(colNo), this.getRowHeaderNameByRowNo(i), i, colNo);
            
            if(false == res)
            {
                console.error("incorrect new insert data");
                return false;
            }
            this.matrix[i][colNo] = (e);
        }
        return true;
    }



}

function cell()
{
    this.cellType = "blank";
    this.cellContent = "";

    this.setCellType = function(cellType)
    {
        if(false == g_cellEnume.checkCellTypeValide(cellType))
        {
            return false;
        }
        this.cellType = cellType;
        return true;
    }

    this.setCellContent = function(cellContent)
    {
        this.cellContent = cellContent;
        return true;
    }

    this.setCell = function(cellType, cellContent)
    {
        return this.setCellType(cellType) & 
                this.setCellContent(cellContent);
    }
}



function sheet(matrix)
{

    this.sheetColNum = matrix.colNum + 2;
    
    this.sheetRowNum = matrix.rowNum + 3;

    this.reLoadSheet = function(matrix)
    {
        this.sheetColNum = matrix.colNum + 2;
        this.sheetRowNum = matrix.rowNum + 3;
        this.sheet = this.generateSheet(matrix);
        this.showSheet = this.getShowPureDataSheet();
    }


    this.generateSheet = function(matrix)
    {
        var i = 0;
        var j = 0;
        var x = this.sheetRowNum;
        var y = this.sheetColNum;
        var sheet = new Array();
        console.info("x : y: ", x, y);
        for(i = 0; i < x ; i++)
        {
            sheet[i] = new Array();
            for(j = 0; j < y; j++)
            {
                var e = new cell()
                if(i < 2 && j < 2)//blank cell
                {
                    e.setCell("blank", "");
                }
                else if(i == x - 1)//the last line
                {
                    if(j < 2)
                    {
                        e.setCell("blank", "");
                    }
                    else
                    {
                        e.setCell("pendingData", "");
                    }
                }
                else if(i == 0)//col header
                {
                    //this.getColHeaderNameByColNo = function(rowNo, colNo)
                    var colHeaderName = matrix.getColHeaderNameByColNo(j - 2);
                    e.setCell("colHeader", colHeaderName);
                }
                else if(j == 0)// row header
                {
                    var rowHeaderName = matrix.getRowHeaderNameByRowNo(i - 2);
                    e.setCell("rowHeader", rowHeaderName);
                }
                else if(i == 1)//col RW
                {
                    colHeaderName = matrix.getColHeaderNameByColNo(j - 2);
                    colWightValue = matrix.getColWeightValueByColHeaderName(colHeaderName);
                    if(undefined != colWightValue){
                        e.setCell("colRW", colWightValue);
                    }else{
                        e.setCell("colRW", "");
                    }
                    
                }
                else if(j == 1)//row RW
                {
                    e.setCell("rowRW", "");
                }
                else//data
                {
                    console.info("matrix, x, y:", i-2, j-2, matrix.getEleByXY(i-2, j-2));
                    
                    var ele = matrix.getEleByXY(i-2, j-2);
                    e.setCell("data", ele.data);
                }
                var jsonStr = (e);
                sheet[i][j] = jsonStr;
                console.info("jsonstr :", jsonStr);
            }
        }
        return sheet;
    }

    this.printSheet = function()
    {
        var i = 0;
        var j = 0;
        for(i = 0; i < this.sheetRowNum; i++)
        {
            for(j = 0; j < this.sheetColNum; j++)
            {
                console.info("sheet[", i, "][", j, "] = ", this.sheet[i][j]);
                console.info(" | ");
            }
            console.info("------------------------------------------------------------");
        }
    }

    this.getShowPureDataSheet = function()
    {
        var i = 0;
        var j = 0;
        
        var showSheet = new Array();
        for(i = 0; i < this.sheetRowNum; i++)
        {
            showSheet[i] = new Array();
            for(j = 0; j < this.sheetColNum; j++)
            {
                var e = (this.sheet[i][j]);
                showSheet[i][j] = e.cellContent;
            }
        }
        return showSheet;
    }

    this.printShowSheet = function()
    {
        var i = 0;
        var j = 0;
        console.info("----------------show sheet-------------------");
        for(i = 0; i < this.sheetRowNum; i++)
        {
            for(j = 0; j < this.sheetColNum; j++)
            {
                console.info("showSheet[", i, "][", j, "] :", this.showSheet[i][j]);
            }
        }
        console.info("---------------------------------------------");
    }

    this.getCellDataType = function(rowNo, colNo)
    {
        var e = (this.sheet[rowNo][colNo]);
        return e.cellType;
    }

    this.getCellColorByXY = function(rowNo, colNo)
    {
        if(rowNo < this.sheetRowNum && colNo < this.sheetColNum)
        {
            var color = getColorByCellType(this.getCellDataType(rowNo, colNo));
            return color;
        }
        else
        {
            
            return "unknow";
            
        }
    }


    this.getCellEditableByXY = function(rowNo, colNo)
    {
        if(rowNo < this.sheetRowNum && colNo < this.sheetColNum)
        {
            var editable = getEditableByCellType(this.getCellDataType(rowNo, colNo));
            return editable;
        }
        else
        {
            return "unknow";
        }
    }

    this.sheet = this.generateSheet(matrix);

    this.showSheet = this.getShowPureDataSheet();

}

/*

var testEle = new ele();
//this.setEle = function(dataType, colHeaderName, rowHeaderName, data, x, y)

// testEle.setEle("integer", "col1", "row1", "333.3", 0, 0);
// testEle.setEle("integer", "col1", "row1", "333", 0, 0);

// var myMatrix = new matrix();
// myMatrix.initMatrix(3, 5);
// myMatrix.printMatrix();

// myMatrix.insertColumn(2, "aaa", "integer");
// console.info("#############################################")
// myMatrix.printMatrix();

// myMatrix.deleteColumn(3);
// console.info("#############################################")
// myMatrix.printMatrix();

// myMatrix.insertRow(3);
// console.info("#############################################")
// myMatrix.printMatrix();


var myMatrix = new matrix();
myMatrix.insertColumn(0, "aaa", "integer");
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.setMatrixData("400", 0, 0);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.setMatrixData("410", 1, 0);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.setMatrixData("420", 2, 0);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.insertColumn(1, "bbb", "integer");
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.setMatrixData("401", 0, 1);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.setMatrixData("411", 1, 1);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.setMatrixData("421", 2, 1);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.moveCol(0, 1);
console.info("#############################################")
myMatrix.printMatrix();


myMatrix.deleteColumn(1);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.deleteRow(1);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.moveCol(0, 1);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.moveRow(0, 1);
console.info("#############################################")
myMatrix.printMatrix();

var mySheet = new sheet(myMatrix);
mySheet.printSheet();
mySheet.printShowSheet();
//mySheet.getShowPureDataSheet(myMatrix);
*/



/*var myMatrix = new matrix();
    myMatrix.insertColumn(0, "aaa", "integer");
    myMatrix.insertColumn(1, "bbb", "integer");
    myMatrix.insertColumn(2, "ccc", "integer");
    //this.setMatrixData = function(data, x, y)
    myMatrix.setMatrixData("400", 0, 0);
    myMatrix.setMatrixData("401", 0, 1);
    myMatrix.setMatrixData("402", 0, 2);

    myMatrix.setMatrixData("500", 1, 0);

    myMatrix.insertColumn(3, "ddd", "float");

    var mySheet = new sheet(myMatrix);

    var data = mySheet.showSheet;

    console.info("ttt data: ", data);

    mySheet.printShowSheet();


    console.info("------------------");
    console.info((myMatrix));
    console.info("-------------------")*/


    //myMatrix.setMatrixData("600", 2, 0);
    //mySheet.reLoadSheet(myMatrix);
    //mySheet.printShowSheet();


    
/*
    console.info("color : ", mySheet.getCellColorByXY(0, 0));
    console.info("color : ", mySheet.getCellColorByXY(0, 1));
    console.info("color : ", mySheet.getCellColorByXY(0, 2));
    console.info("color : ", mySheet.getCellColorByXY(0, 3));
    console.info("color : ", mySheet.getCellColorByXY(0, 4));
    console.info("----------");

    console.info("color : ", mySheet.getCellColorByXY(1, 0));
    console.info("color : ", mySheet.getCellColorByXY(1, 1));
    console.info("color : ", mySheet.getCellColorByXY(1, 2));
    console.info("color : ", mySheet.getCellColorByXY(1, 3));
    console.info("color : ", mySheet.getCellColorByXY(1, 4));
    console.info("----------");

    console.info("color : ", mySheet.getCellColorByXY(2, 0));
    console.info("color : ", mySheet.getCellColorByXY(2, 1));
    console.info("color : ", mySheet.getCellColorByXY(2, 2));
    console.info("color : ", mySheet.getCellColorByXY(2, 3));
    console.info("color : ", mySheet.getCellColorByXY(2, 4));
    console.info("----------");

    console.info("color : ", mySheet.getCellColorByXY(3, 0));
    console.info("color : ", mySheet.getCellColorByXY(3, 1));
    console.info("color : ", mySheet.getCellColorByXY(3, 2));
    console.info("color : ", mySheet.getCellColorByXY(3, 3));
    console.info("color : ", mySheet.getCellColorByXY(3, 4));

    console.info("editable : ", mySheet.getCellEditableByXY(2, 0));
    console.info("editable : ", mySheet.getCellEditableByXY(2, 1));
    console.info("editable : ", mySheet.getCellEditableByXY(2, 2));
    console.info("editable : ", mySheet.getCellEditableByXY(2, 3));
    console.info("editable : ", mySheet.getCellEditableByXY(2, 4));
    console.info("----------");
    */
