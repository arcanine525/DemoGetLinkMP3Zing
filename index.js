var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var request = require('request');

var myPythonScriptPath = 'get.py';
var PythonShell = require('python-shell');

app.set("views engine", "ejs");
app.set("views" , "./views");
app.use(express.static(__dirname + '/views'))
app.listen(process.env.PORT || 525);

app.get("/home", function(req, res){
    res.render("test", {data: "hello"});
});

app.get("/link", function(req, res){
    var options = {
    mode: 'text',
    args: 'http://mp3.zing.vn/bai-hat/Xin-Dung-Lang-Im-Soobin-Hoang-Son/ZW80B6I8.html'
    //args: linkToGet
    };

    PythonShell.run('get.py', options, function (err, message) {
    if (err) throw err;
    result = message[0];
    //res.send("Link get được: "+ result.toString());
    res.render("test", {data: result.toString()});
    console.log('Kết quả: ', result);
    });
});

app.get('/api', function(req, res){
    var linkToGet = req.query.link;
    
    var options = {
    //args: 'http://mp3.zing.vn/bai-hat/Xin-Dung-Lang-Im-Soobin-Hoang-Son/ZW80B6I8.html'
    args: linkToGet
    };

    PythonShell.run('get.py', options, function (err, message) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    result = message[0];
    res.send("Link get duoc: "+ result);
    console.log('results: ', result);
    });

});
    
// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  var u = req.body.username;
  var p = req.body.pass;
  res.send('Welcome, ' + u + 'Your pass: ' + p )
})



/*
app.get("/home", function(req, res) {
    res.render("home");
    console.log("Home page");

});
*/



console.log("Start Now!")
