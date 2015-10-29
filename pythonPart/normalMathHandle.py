import sys
import numpy as np
import os
import os.path
#from py_expression_eval import Parser
from expressionParse import Parser
from scipy import *
import json
from copy import deepcopy
from sheetHandle import generateNumpyArray
from sheetHandle import generateSheetByNSheet
from sheetHandle import getNColumnByVarName
from sheetHandle import appendSheetnewArr

sys.path.append("")
sys.path.append("method")



def filterVarList(allVarList):
    return [elem for elem in allVarList if (elem.find('fn_') != 0 or True == elem.isdigit())]  

def normalMathHandle(sheet, mathContent):
    nSheet = generateNumpyArray(sheet)
    print "come into normalMathHandle"
    print mathContent

    targetVarName = mathContent['targetVarName']
    expression = mathContent['expression']

    parser = Parser()
    expr = parser.parse(expression)
    allVarList = expr.variables()
    print allVarList
    varList = filterVarList(allVarList)
    print varList
    varDic = {}
    for var in varList:
        [res, colArr] = getNColumnByVarName(var, sheet, nSheet)
        if(False == res):
            return False, sheet
        else:
            print "colArr = ", var, " : ", colArr
            varDic[var] = colArr

            print varDic    

    newCol = parser.evaluate(expression, varDic)
    print "newCol : ", newCol

    appendSheetnewArr(targetVarName, sheet, newCol)

    newSheetJson =  json.dumps(sheet)


    return True, newSheetJson, ""


    
