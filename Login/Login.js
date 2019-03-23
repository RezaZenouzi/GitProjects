var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var mysql = require("mysql");
var app = express();


app.use(express.static(__dirname+"/static"));
app.use(bodyParser());
app.use(session({secret:"reza"}));

                                        // Connect to database
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
        console.log("error is : "+err.toString());
    }
   console.log("connected")
});

                                        // It is method for index page
app.get('/',function (req,res,next) {
   console.log("index page");
   res.sendFile(__dirname+"/static/index.html")
});

                                        // It is the method for log in page
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

                                        // It is the method for sign in the user
app.post('/signIn',function (req,res,next) {
  var name = req.body.name.toString();
  var pass = req.body.pass;

    connection.query("SELECT * FROM users WHERE Name = ? And Password = ?",[name,pass],function (err,result,fields) {
            if (err)
            {
                console.log("error is : "+err.toString());
            }
            else
            {
                if (result.length > 0)
                {
                    req.session.user = name ;
                    res.send("true");
                }
                else
                {
                    res.send("Username Or Password Is Wrong !")
                }
            }
        }
    );

});

                                            // It is the method for sign out the user
app.post('/signOut',function (req,res,next) {
    if (req.session.user != undefined)
    {
        req.session.user = undefined;
        res.send("true");
    }
    else
    {
        res.send("Please Sign Up First ...");
    }
});

                                            // It is the method list page
app.get('/list', (req, res) => {
    res.sendFile(__dirname+"/static/list.html");
});


                                            // It is the method for edit username
app.post('/edit',function (req,res,next) {
    var id = req.body.id;
    var newName = req.body.newName;
    console.log(id);
    console.log(newName);
    connection.query('UPDATE users SET Name = ? WHERE Id = ?', [newName, id]);
    res.send("Updated !");
});

app.listen(8000);
console.log("server run !");