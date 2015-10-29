

    function submitMathReq() {
        this.userName = '';
        this.passwd = '';
        this.sessionId = 0;
        this.mathType = '';
        this.matrix = '';
        this.mathContent = '';

        this.generateSubmitMathReq = function(userName, passwd, mathType, sessionId, matrix, mathContent) {
            this.userName = userName;
            this.passwd = passwd;
            this.sessionId = sessionId;
            this.mathType = mathType;
            this.matrix = matrix;
            this.mathContent = mathContent;
        }
    }


    function handleMathRes(data){
        var resData = JSON.parse(data);
        //console.info(" resData.reason = ", resData.reason);
        if (resData.result == "success") {
            saveMatrixStr2LocalStorage("computedMatrix", resData.matrix)
        } else {
                    var origDataStr = "";
                    origDataStr = loadMatrixStrFromLocalStorage("localMatrix");
                    if(origDataStr){
                        saveMatrixStr2LocalStorage("computedMatrix", origDataStr);
                        alert(resData.result);
                    }else{
                        alert("error to handle local storage");
                    }
        }
                console.info("now complete submitComputExpressAndData");
                //location.replace("http://192.168.56.101:3000");
                window.close();
    }

    function submitMath2Server(userName, passwd, mathType, matrix, mathContent) {
        console.info("entry submitMath2Server");

        var sessionId = 1;

        var submitBody = new submitMathReq();

        submitBody.generateSubmitMathReq(userName, passwd, mathType, sessionId,
            matrix, mathContent);
        var bodyData = JSON.stringify(submitBody);

        $.ajax({
            type: "POST",
            url: "/submitComputExpressAndData",
            data: bodyData,
            contentType: "application/json; charset=utf-8",
            async: "false",
            success: function(data) {
                handleMathRes(data);
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });

    }