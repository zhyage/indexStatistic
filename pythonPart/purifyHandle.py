import sys
import numpy as np
import os
import os.path
from scipy import *
#from py_expression_eval import Parser
import json
from copy import deepcopy
from sheetHandle import generateNumpyArray
from sheetHandle import generateSheetByNSheet
from sheetHandle import getNColumnByVarName
from sheetHandle import appendSheetnewArr
from validateMathExpression import validateMathExpression

sys.path.append("")
sys.path.append("method")



#fn(gyzsf_jiZhiFa)(x, y)
def parseExpressionMethodAndArgList(expression, srcVarName, parameteList):
    print("expression === ", expression)
    print("parameteList === ", parameteList)
    tmp = expression.strip()
    tmp = tmp[3:]
    npos = tmp.index(")")
    method = tmp[:npos]
    parameteList.insert(0, srcVarName)
    #npos = tmp.index("(")
    # argListStr = tmp[npos+1:-1]
    # argList = argListStr.split(',');
    # for i in range(0, len(argList)):
    #     argList[i] = argList[i].strip()


    print "method : ", method
    print "argList :", parameteList
    return method, parameteList



def computingFnSheet(targetVarName, srcVarName, expression, parameteList, sheet, nSheet):

    tmp = parseExpressionMethodAndArgList(expression, srcVarName, parameteList)
    methodName = tmp[0]
    argList = tmp[1]
    callFunction = methodName


    module = __import__(methodName, globals(), locals(), [callFunction])
    ds = getattr(module, callFunction)
    res = ds(targetVarName, expression, argList, sheet, nSheet)
    print "execute result : ", res
    return res

def computingnSheet(targetVarName, srcVarName, expression, parameteList, sheet, nSheet):
    if("fn(" in expression):
        return computingFnSheet(targetVarName, srcVarName, expression, parameteList, sheet, nSheet)
        #return True, sheet;
    # else:
    #     parser = Parser()
    #     expr = parser.parse(expression)
    #     varList = expr.variables()
    #     varDic = {}
    #     for var in varList:
    #         [res, colArr] = getNColumnByVarName(var, sheet, nSheet)
    #         if(False == res):
    #             return False, sheet
    #         else:
    #             print "colArr = ", var, " : ", colArr
    #             varDic[var] = colArr

    #     print varDic    


    #     newCol = parser.evaluate(expression, varDic)
    #     print "newCol : ", newCol

    #     appendSheetnewArr(targetVarName, sheet, newCol)

    #     return True, sheet



def expressionHandle(targetVarName, srcVarName, expression, parameteList, sheet):
    nSheet = generateNumpyArray(sheet)

    [res, newSheet, reason] = computingnSheet(targetVarName, srcVarName, expression, parameteList, sheet, nSheet)
    newSheetJson =  json.dumps(newSheet)
    return res, newSheetJson, reason
    
def purifyMathHandle(sheet, mathContent):
    for formular in mathContent:
        targetVarName = formular['targetName']
        srcVarName = formular['srcDataName']
        expression = formular['formularName']
        parameterList = formular['parameterList']

        if True != validateMathExpression(targetVarName, srcVarName, expression, parameterList, sheet):
            reason = "validate Mathexpression failed with" + targetVarName
            returnMatrix = ""
            return False, returnMatrix, reason 

        res = expressionHandle(targetVarName, srcVarName, expression, parameterList, sheet)
        if True != res[0]: #error happens in one of all expressions
            return res

    return res #no error happen