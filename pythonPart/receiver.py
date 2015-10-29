import json
import zmq
import time
import sys
# from validateMathExpression import validateMathExpression
# from expressionHandle import expressionHandle
from purifyHandle import purifyMathHandle
from normalMathHandle import normalMathHandle
from weightMathHandle import weightMathHandle


    # function submitMathReq() {
    #     this.userName = '';
    #     this.passwd = '';
    #     this.sessionId = 0;
    #     this.mathType = '';
    #     this.matrix = '';
    #     this.mathContent = '';

    #     this.generateSubmitMathReq = function(userName, passwd, sessionId, mathType, matrix, mathContent) {
    #         this.userName = userName;
    #         this.passwd = passwd;
    #         this.sessionId = sessionId;
    #         this.mathType = mathType;
    #         this.matrix = matrix;
    #         this.mathContent = mathContent;
    #     }
    # }


def parseMsg(jsonStr):
    returnVar = {"result":"", "matrix":""}
    #print jsonStr
    jsonObj = json.loads(jsonStr)
    #print json.dumps(jsonObj)

    userName = jsonObj["userName"]
    passwd = jsonObj["passwd"]
    sessionId = jsonObj["sessionId"]
    mathType = jsonObj["mathType"]
    matrix = jsonObj["matrix"]
    mathContent = jsonObj["mathContent"]


    print "userName : ", userName
    print "passwd  : ", passwd
    print "sessionId : ", sessionId
    print "mathType : ", mathType


    sheet = jsonObj['matrix']

    print sheet;

    if mathType == "purifyCompute":
        res = purifyMathHandle(sheet, mathContent)
        if True != res[0]:
            returnVar["result"] = res[2]
            returnVar["matrix"] = ""
            return returnVar
    elif mathType == "normalCompute":
        res = normalMathHandle(sheet, mathContent)
        if True != res[0]:
            returnVar["result"] = res[2]
            returnVar["matrix"] = ""
            return returnVar
    elif mathType == "weightCompute":
        res = weightMathHandle(sheet, mathContent)
        if True != res[0]:
            returnVar["result"] = res[2]
            returnVar["matrix"] = ""
            return returnVar
    else:
        returnVar["result"] = "no such mathType : " + mathType
        returnVar["matrix"] = ""
        return returnVar


    returnVar["result"] = "success"

    print "success return sheet : ", res[1]

    returnVar["matrix"] = res[1]
    return returnVar
                


port = "5556"
if len(sys.argv) > 1:
    port = sys.argv[1]
    int(port)

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:%s" % port)


while True:
    #  Wait for next request from client
    message = socket.recv()
    resultMsg = parseMsg(message)
    #print "Received request: ", message
    # time.sleep(1)
    #socket.send("World from %s" % port)
    socket.send(json.dumps(resultMsg));    


# def main():
#     message = '{"targetVarName":"rr","expression":"kkk+ccc","matrix":{"colNum":3,"rowNum":4,"matrix":[[{"init":true,"dataType":"integer","colHeaderName":"kkk","rowHeaderName":"","writeable":false,"data":"400"},{"init":true,"dataType":"integer","colHeaderName":"bbb","rowHeaderName":"","writeable":false,"data":"401"},{"init":true,"dataType":"integer","colHeaderName":"ccc","rowHeaderName":"","writeable":false,"data":"402"}],[{"init":true,"dataType":"integer","colHeaderName":"kkk","rowHeaderName":"","writeable":false,"data":"500"},{"init":true,"dataType":"integer","colHeaderName":"bbb","rowHeaderName":"","writeable":false,"data":"501"},{"init":true,"dataType":"integer","colHeaderName":"ccc","rowHeaderName":"","writeable":false,"data":"0"}],[{"init":true,"dataType":"integer","colHeaderName":"kkk","rowHeaderName":"","writeable":false,"data":"0"},{"init":true,"dataType":"integer","colHeaderName":"bbb","rowHeaderName":"","writeable":false,"data":"601"},{"init":true,"dataType":"integer","colHeaderName":"ccc","rowHeaderName":"","writeable":false,"data":"0"}],[{"init":true,"dataType":"integer","colHeaderName":"kkk","rowHeaderName":"","writeable":false,"data":"0"},{"init":true,"dataType":"integer","colHeaderName":"bbb","rowHeaderName":"","writeable":false,"data":"701"},{"init":true,"dataType":"integer","colHeaderName":"ccc","rowHeaderName":"","writeable":false,"data":"0"}]]}}'
#     parseMsg(message)

# if __name__ == "__main__":
#     main()