var express = require('express');
var saveAndLoad = require('../modules/saveAndLoad');
var methodConfHandle = require('../modules/methodConfHandle');
var submit2Python = require('../modules/submit2Python');
var router = express.Router();


/*router.get('/', function(req, res, next) {
    res.sendfile('./views/index.html');
});

router.get('/normalComputingPage', function(req, res, next) {
    res.sendfile('./views/normalComputing.html');
});

router.get('/biaoZhunHuaPage', function(req, res, next) {
    res.sendfile('./views/biaoZhunHua.html');
});

router.get('/AHPConfPage1', function(req, res, next) {
    res.sendfile('./views/AHPConfPage1.html');
});

router.post('/saveToServer', function(req, res, next) {
    var saveInfo = req.body;
    var fileName = saveInfo.fileName;
    var matrixString = JSON.stringify(saveInfo.matrix);
    res.send(saveAndLoad.saveMatrix(fileName, matrixString));
});

router.post('/loadFileFromServer', function(req, res, next) {
    var loadInfo = req.body;
    var fileName = loadInfo.fileName;
    res.send(saveAndLoad.loadMatrix(fileName));
});

router.post('/getSaveFileList', function(req, res, next) {
    res.send(saveAndLoad.getSavedFileList());
});

router.post('/toGetBiaoZhunFaConf', function(req, res, next) {
    res.send(methodConfHandle.getPurifyMethodConf());
});

router.post('/toGetWeightFormulaConf', function(req, res, next) {
    res.send(methodConfHandle.getAHPMethodConf());
});

router.post('/submitComputExpressAndData', function(req, res, next){
    var submitBody = req.body;

    var submitBodyString = JSON.stringify(submitBody);
   

    function sendResBack(res, resultMsg)
    {
        console.info("here message back from python:", resultMsg);
        res.send(resultMsg);
    }

    submit2Python.sendMsg2Py(submitBodyString, sendResBack, res);
});*/



var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function(passport) {

    /* GET login page. */
    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('index', {
            message: req.flash('message')
        });
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res) {
        res.render('register', {
            message: req.flash('message')
        });
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    /* GET Home Page */
    router.get('/home', isAuthenticated, function(req, res) {
        res.render('first', { user: req.user });
    });

    router.get('/normalComputingPage', isAuthenticated, function(req, res, next) {
        //res.sendfile('./views/normalComputing.html');
        res.render('normalComputing', { user: req.user });
    });

    router.get('/biaoZhunHuaPage', isAuthenticated, function(req, res, next) {
        //res.sendfile('./views/biaoZhunHua.html');
        res.render('biaoZhunHua', { user: req.user });
    });

    router.get('/AHPConfPage1', isAuthenticated, function(req, res, next) {
        //res.sendfile('./views/AHPConfPage1.html');
        res.render('AHPConfPage1', { user: req.user });
    });

    router.post('/saveToServer', isAuthenticated, function(req, res, next) {
        var saveInfo = req.body;
        var userName = req.user.username;
        var fileName = userName + '/' + saveInfo.fileName;
        var matrixString = JSON.stringify(saveInfo.matrix);
        res.send(saveAndLoad.saveMatrix(fileName, matrixString));
    });

    router.post('/loadFileFromServer', isAuthenticated, function(req, res, next) {
        var loadInfo = req.body;
        var userName = req.user.username;
        var fileName = userName + '/' + loadInfo.fileName;
        res.send(saveAndLoad.loadMatrix(fileName));
    });

    router.post('/getSaveFileList', isAuthenticated, function(req, res, next) {
        var userName = req.user.username;
        var path = userName;
        res.send(saveAndLoad.getSavedFileList(path));
    });

    router.post('/toGetBiaoZhunFaConf', isAuthenticated, function(req, res, next) {
        res.send(methodConfHandle.getPurifyMethodConf());
    });

    router.post('/toGetWeightFormulaConf', isAuthenticated, function(req, res, next) {
        res.send(methodConfHandle.getAHPMethodConf());
    });

    router.post('/submitComputExpressAndData', isAuthenticated, function(req, res, next) {
        var submitBody = req.body;

        var submitBodyString = JSON.stringify(submitBody);


        function sendResBack(res, resultMsg) {
            console.info("here message back from python:", resultMsg);
            res.send(resultMsg);
        }

        submit2Python.sendMsg2Py(submitBodyString, sendResBack, res);
    });

    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}

/*module.exports = router;*/