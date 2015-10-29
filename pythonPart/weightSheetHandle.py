import sys
import numpy as np
import os
import os.path
from scipy import *
from py_expression_eval import Parser
import json
from copy import deepcopy
from fractions import Fraction

# def generateNumpyArray(sheet):
#     colNum = sheet['colNum']
#     rowNum = sheet['rowNum']
#     matrix = sheet['matrix']
#     nSheet = np.zeros((rowNum, colNum), float32)

#     for i in range(0, rowNum):
#         for j in range(0, colNum):
#             ele = matrix[i][j]
#             dataStr = ele["data"]
#             data = float(dataStr);
#             nSheet[i][j] = data
#     print "nSheet :--------------------"
#     print nSheet

#     return nSheet

# def generateSheetByNSheet(nSheet, sheet, targetVarName):
#     shape = nSheet.shape
#     nRowNum = sharp[0]
#     nColNum = sharp[1]
#     colNum = sheet['colNum']
#     rowNum = sheet['rowNum']
#     matrix = sheet['matrix']

# def getNColumnByVarName(varName, sheet, nSheet):
#     colNum = sheet['colNum']
#     rowNum = sheet['rowNum']
#     matrix = sheet['matrix']

#     for i in range(0, colNum):
#         ele = matrix[0][i]
#         if varName == ele['colHeaderName']:
#             return True, nSheet[:, i]

#     return False, 0

# def appendSheetnewArr(targetVarName, sheet, newArr):
#     colNum = sheet['colNum']
#     sheet['colNum'] = colNum + 1;
#     rowNum = sheet['rowNum']
#     matrix = sheet['matrix']        
#     elePattern = {u'writeable': False, u'colHeaderName': u'', u'dataType': u'number', u'init': True, u'rowHeaderName': u'', u'data': u''}   
#     for i in range(0, rowNum):
#         ele = elePattern
#         ele['colHeaderName'] = targetVarName
#         ele['data'] = str(newArr[i])
#         print "ele : ", ele
#         sheet['matrix'][i].append(deepcopy(ele))

#     print sheet

def generateWeightNumpyArray(matrix):
    print "matrix DIM = ", len(matrix), "-", len(matrix[0]);
    rowNum = len(matrix) - 1
    colNum = len(matrix[0]) -1 

    nSheet = np.zeros((rowNum, colNum), float32)

    for i in range(1, rowNum + 1):
        for j in range(1, colNum + 1):
            ele = matrix[i][j]
            #print "ele = ", ele
            data = Fraction(ele);
            nSheet[i- 1][j- 1] = data
    print "nSheet :--------------------"
    print nSheet

    return nSheet
