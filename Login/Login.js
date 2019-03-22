var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var mysql = require("mysql");
var app = express();


app.use(express.static(__dirname+"/static"));
app.use(bodyParser());
app.use(session({secret:"reza"}));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rezareza6969',
    database: 'logindb',
    port: 3306
});
connection.connect(function (err) {
    if (err)
    {
        console.log("errorrrrrrrrrr is : "+err.toString());
    }
   console.log("connected")
});
connection.query(
    "Select * From users",function (err,result,fields) {
        if (err)
        {
            console.log("error is : "+err.toString());
        }
        console.log(result);
    }
);
connection.end();

var users = {"reza":"1234","ali":"5678"};

app.get('/',function (req,res,next) {
   console.log("index page");
   res.sendFile(__dirname+"/static/index.html")
});
app.get("/logIn",function (req,res,next) {
    if (req.session.user != undefined)
    {
        res.sendFile(__dirname+"/static/logInPage.html");
    }
    else
    {
        res.send("Please Sign Up First ...");
    }
});
app.post('/signIn',function (req,res,next) {
    console.log(req.body);
  /*  for (user in users)
    {
        if (req.body["name"] == user)
        {
            if (req.body["pass"] == users[user])
            {
                req.session.user = req.body["name"] ;
                res.send("true");
                console.log(req.session);
                return;
            }
            else
            {
                res.send("Password Is Wrong ! ");
                return;
            }
        }
    }
    res.send("User Could Not Found ! ");*/

  var name = req.body.name;
  var pass = req.body.pass;

    connection.query(
        "Select * From users Where Name = ?",[name],function (err,result,fields) {
            if (err)
            {
                console.log("error is : "+err.toString());
            }
            else
            {
                if (result.length > 0)
                {
                    if (result[0].password == pass)
                    {
                        res.send("log in")
                    }
                    else
                    {
                        res.send("password ")
                    }
                }
                else
                {
                    res.send("username")
                }
            }
        }
    );

});
app.post('/signOut',function (req,res,next) {
    if (req.session.user != undefined)
    {
        req.session.user = "";
        res.send("true");
        return;
    }
    else
    {
        res.send("Please Sign Up First ...");
    }
});


app.listen(8000);
console.log("server run !");