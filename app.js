//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { send } = require("process");


const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonDate = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/a88f12cf31";

    const options = {
        method: "POST",
        auth: "akhmadjon:565ee4f105bcdd962a7e3e009c79fffa-us14"
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html")
        }


         response.on("data", function(data) {
             console.log(JSON.parse(data));
         })
    }) 

    request.write(jsonDate);
    request.end();


    app.post("/failure", function(req, res) {
        res.redirect("/");
    })

});


app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000");
});

//Api key
// 565ee4f105bcdd962a7e3e009c79fffa-us14

//List ID
//a88f12cf31

// res.sendFile(__dirname + "/signup.html")