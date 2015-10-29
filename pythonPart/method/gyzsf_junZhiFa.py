#-*- coding:utf-8 -*-
from scipy import *
import numpy as np
from sheetHandle import generateNumpyArray
from sheetHandle import generateSheetByNSheet
from sheetHandle import getNColumnByVarName
from sheetHandle import appendSheetnewArr


def getXib(colList, positive):
    print "average :", np.mean(colList)
    return np.mean(colList)

def getNewColArr(colList, positive, xib):
    if(positive == "1"):
        for i in range(0, len(colList)):
            colList[i] = colList[i]/xib
    else:
        for i in range(0, len(colList)):
            colList[i] = xib/colList[i]

    return colList

def verify(targetVarName, expression, argList, sheet, nSheet):
    print "in gyzsf_jiZhiFa verify"
    [res, colArr] = getNColumnByVarName(argList[0], sheet, nSheet)
    if(False == res):
        return False, "incorrect data source"
    
    print "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
    for x in np.nditer(colArr):
        if (x == 0):
            errorReason = "gyzsf_junZhiFa does not allow " + argList[0] + "has 0 to be elements"
            return False, errorReason
    print "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkend"    

    return True, ""


def gyzsf_junZhiFa(targetVarName, expression, argList, sheet, nSheet):
    print "execute gyzsf_junZhiFa"
    # print "targetVarName: ", targetVarName
    # print "argList :", argList
    # print "sheet: ", sheet
    # print "nSheet :", nSheet

    verifyRes = verify(targetVarName, expression, argList, sheet, nSheet)
    if(False == verifyRes[0]):
        return False, 0, verifyRes[1];

    [res, colArr] = getNColumnByVarName(argList[0], sheet, nSheet)
    if(False == res):
        return False, 0, "incorrect data srouce"
    else:
        print "colArr = ", var, " : ", colArr

    xib = getXib(colArr, argList[1])

    newCol = getNewColArr(colArr, argList[1], xib)

    print "newCol :", newCol

    appendSheetnewArr(targetVarName, sheet, newCol)

    return True, sheet, ""



