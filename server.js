var express = require("express");
var mysql = require("mysql");
const nodemailer = require('nodemailer');
const SHA256 = require("crypto-js/sha256");

const {
    connect
} = require("http2");
const {
    connected, on
} = require("process");
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'osesvit2021@gmail.com',
        pass: '9901735897'
    }
});
var con = mysql.createConnection({
    host: "sql10.freesqldatabase.com",
    user: "sql10358571",
    password: "9JqVMLNM21",
    database: "sql10358571",
});

con.connect(function (err) {
    if (err) throw err;
    const connected = true;
    console.log("Connected!");
});

var app = express();

app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true,
}));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
    });
});
app.get("/signup", (req, res) => {
    res.render("signup", {
        title: "Sign Up",
    });
});

app.get("/admin/login", (req, res) => {
    res.render("adminlogin", {
        title: "Admin LogIn",
    });
});

app.post("/admin/loginauth", (req, res) => {
    const email = req.body.email;
    const password = SHA256(req.body.password);
    if (connected == true) {
        con.query(`SELECT * FROM admins where email="${email}"`, function (
            err,
            result,
            fields
        ) {
            if (err) res.send({
                err: err,
                loginstat: false
            });
            console.log("len" + result.length)
            if (result.length == 0) {
                res.send({
                    err: "User not found",
                    loginstat: false,
                });
            } else {
                if (password == result[0].password) {
                    res.send({
                        err: "Authorized User ",
                        loginstat: true,
                    });
                } else {
                    res.send({
                        err: "Email/Password is invalid",
                        loginstat: false,
                    });
                }
            }
        });
    }

});

app.get("/admin/dashboard", (req, res) => {
    if (req.query.auth == "true") {
        if (connected == true) {
            con.query(`SELECT * FROM admins where email="${req.query.email}"`, function (
                err,
                result,
                fields
            ) {
                if (err) {
                    console.log(err);
                    res.render("404");
                }
                if (result.length == 0) {
                    res.render("404");
                } else {
                    if (`${SHA256(req.query.authtoken)}` == result[0].password || req.query.authtoken == result[0].password) {
                        con.query("select * from users",(err,res1)=>{
                            if(err) res.render("404");
                            res.render("admindash", {
                                title: "Admin Dashboard",
                                info: result,scores:res1
                            })
                        })
                    } else {
                        res.render("404");
                    }
                }
            });
        }
    } else {
        res.render("404");
    }
});
app.get("/questions", (req, res) => {
    res.render("questions",{title:"SSC | Questions",email:req.query.email,authtoken:req.query.authtoken})
});

app.get("/previewqs", (req, res) => {
    con.query(`select * from qs`,(err,res1)=>{
        if(err) res.send("Some error occurred")
        res.render("preview",{title:"SSC | Preview Questions",email:req.query.email,authtoken:req.query.authtoken,qs:res1})
    })
});

app.post("/addqs", (req, res) => {

    var opt=`${req.body.op1}$${req.body.op2}$${req.body.op3}$${req.body.op4}`
    console.log(opt)
    con.query(`insert into qs(qs,opts,ans) values("${req.body.qs}","${opt}","${req.body.ans}")`,(err,result)=>{
        if(err) {console.log(err);res.send("some error ocurred while adding question")};
            console.log(result)
            res.redirect(`/questions?email=${req.body.email}&authtoken=${req.body.authtoken}`)
    })

});

app.get("/addqs", (req, res) => {
            res.redirect(`/admin/dashboard?auth=true&email=${req.body.email}&authtoken=${req.body.authtoken}`)
});

app.get("/reset", (req, res) => {
    res.render("reset", {
        title: "Reset Password",
    });
});

app.post("/user/login", (req, res) => {
    const email = req.body.email;
    const password = SHA256(req.body.password);
    if (connected == true) {
        con.query(`SELECT * FROM users where email="${email}"`, function (
            err,
            result,
            fields
        ) {
            if (err) res.send({
                err: err,
                loginstat: false
            });
            console.log("len" + result.length)
            if (result.length == 0) {
                res.send({
                    err: "User not found",
                    loginstat: false,
                });
            } else {
                if (password == result[0].password) {
                    res.send({
                        err: "Authorized User ",
                        loginstat: true,
                    });
                } else {
                    res.send({
                        err: "Email/Password is invalid",
                        loginstat: false,
                    });
                }
            }
        });
    }
});
app.get("/user/login/dashboard", (req, res) => {
    if (req.query.auth == "true") {
        if (connected == true) {
            con.query(`SELECT * FROM users where email="${req.query.email}"`, function (
                err,
                result,
                fields
            ) {
                if (err) {
                    console.log(err);
                    res.render("404");
                }
                if (result.length == 0) {
                    res.render("404");
                } else {
                    if (`${SHA256(req.query.authtoken)}` == result[0].password || req.query.authtoken == result[0].password) {
                        con.query(`select startdate,starttime,enddate,endtime from admins where email="admin@gmail.com"`, (err, res1) => {
                            if (err) {
                                console.log(err)
                                res.render("404")
                            } else {
                                if (result.length == 0) {
                                    res.render("404");
                                } else {
                                    res.render("dashboard", {
                                        title: "SSC User dashboard",
                                        info: result,
                                        examinfo: res1
                                    });
                                }
                            }
                        })
                    } else {
                        res.render("404");
                    }
                }
            });
        }
    } else {
        res.render("404");
    }
});
app.post("/update/profile", (req, res) => {
    if (connected == true) {
        con.query(`SELECT email,password FROM users where email="${req.body.email}"`, function (
            err,
            result,
            fields
        ) {
            if (err) {
                console.log(err);
                res.send({
                    err: "some error 😂",
                    updatestat: false
                });
            }
            if (result.length == 0) {
                res.send({
                    err: "some error 😂😂",
                    updatestat: false
                });
            } else {
                con.query(`update users set name="${req.body.name}", phno="${req.body.tel}", gender="${req.body.gender}",dob="${req.body.dob}" where email="${req.body.email}"`, function (
                    err,
                    result,
                    fields
                ) {
                    if (err) {
                        console.log(err);
                        res.send({
                            err: "some error 😂😂😂😂",
                            updatestat: false
                        });
                    }
                    if (result.affectedRows) {
                        res.send({
                            err: "updated",
                            updatestat: true
                        })
                    }
                })

            }
        })
    }
});
app.post("/signup/user", (req, res) => {
    const email = req.body.email;
    const password = SHA256(req.body.password);
    if (connected == true) {
        con.query(`SELECT email FROM users where email="${email}"`, function (err, result, fields) {
            if (err) res.send({
                err: err,
                signupstat: false
            });
            if (result.length != 0) {
                res.send({
                    err: "User Already Exists in System",
                    signupstat: false
                });
            } else {
                con.query(
                    `insert into users (email,password) values ("${email}","${password}")`,
                    function (err, result, fields) {
                        if (err) res.send(err);
                        res.send({
                            err: "Successful",
                            signupstat: true
                        });
                        let mailDetails = {
                            from: 'osesvit2021@gmail.com',
                            to: email,
                            subject: 'Confirm and Complete your registration to SSC',
                            html: `<head><head><body></head><h4>Dear ${email.split("@")[0]},<br><br> <p>Thank You for Signing Up in SSC,and Plz complete yor profile by clicking here</p><br><button>Complete profile</button><br><br><p>Thank You</p> </h4></body>`
                        };

                        mailTransporter.sendMail(mailDetails, function (err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('Email sent successfully');
                            }
                        });
                    }
                );
            }
        });
    }
});

app.delete("/delete",(req,res)=>{
    con.query(`DELETE FROM qs WHERE slno="${req.query.slno}";`,(err,res1)=>{
        if(err) res.send({err:"Some error occured"})
        res.send({err:"Question Deleted Successful"})
    })
})
var otp = 0;

app.post("/reset/sendcode", (req, res) => {
    const email = req.body.email;
    const password = SHA256(req.body.password);
    if (connected == true) {
        con.query(`SELECT email FROM users where email="${email}"`, function (err, result, fields) {
            if (err) res.send({
                err: err,
                sendstat: false
            });
            console.log(result.length)
            if (result.length == 0) {
                res.send({
                    err: "User not exist",
                    sendstat: false
                });
            } else {
                otp = Math.floor(100000 + Math.random() * 900000);
                let mailDetails = {
                    from: 'osesvit2021@gmail.com',
                    to: email,
                    subject: 'Reset your Password of SSC system',
                    html: `<head><head><body></head><h4>Dear ${email.split("@")[0]},<br><br> <p>OTP tp reset ur password is here ${otp}</p><br><br><p>Thank You</p> </h4></body>`
                };
                mailTransporter.sendMail(mailDetails, function (err, data) {
                    if (err) {
                        res.send({
                            err: "Otp not Sent",
                            sendstat: false
                        })
                    } else {
                        res.send({
                            err: "Otp Sent",
                            sendstat: true
                        })
                    }
                });
            }
        })
    }
});

app.post("/reset/pwupdate", (req, res) => {
    const email = req.body.email;
    const password = SHA256(req.body.password);
    const userotp = req.body.otp;
    if (connected == true) {
        con.query(`SELECT email FROM users where email="${email}"`, function (err, result, fields) {
            if (err) res.send({
                err: err,
                sendstat: false
            });
            console.log(result.length)
            if (result.length == 0) {
                res.send({
                    err: "User not exist",
                    sendstat: false
                });
            } else {
                if (userotp == otp) {
                    con.query(`UPDATE users SET password="${password}" where email="${email}"`, function (err, result, fields) {
                        if (err) res.send({
                            err: err,
                            sendstat: false
                        });
                        if (result.affectedRows) {
                            let mailDetails = {
                                from: 'osesvit2021@gmail.com',
                                to: email,
                                subject: 'Password Chanaged',
                                html: `<head><head><body></head><h4>Dear ${email.split("@")[0]},<br><br> <p>Your password is updated.</p><br><br><p>Thank You</p> </h4></body>`
                            };
                            mailTransporter.sendMail(mailDetails, function (err, data) {
                                if (err) {
                                    res.send({
                                        err: "Otp not Sent",
                                        sendstat: false
                                    });
                                } else {
                                    res.send({
                                        err: "Otp Sent",
                                        sendstat: true
                                    })
                                }
                            });
                        }
                    })
                } else {
                    res.send({
                        err: "Invalid OTP",
                        sendstat: false
                    })
                }
            }
        })
    }
});

const multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        /*Appending extension with original name*/
        console.log(file.originalname)
        cb(null, file.originalname.split(".")[0] + Date.now() + path.extname(file.originalname))
    }

})

var upload = multer({
    storage: storage
});
app.post('/upload', upload.single('photo'), (req, res) => {
    if (req.file) {
        if (connected == true) {
            con.query(`update users set dp="${req.file.filename}" where email="${req.body.email}" and password="${req.body.authtoken}"`, function (err, res1, fields) {
                if (err) {
                    console.log(err);
                    res.send("unable to upload picture try again")
                } else {
                    if (res1.affectedRows == 1) {
                        con.query(`select * from users where email="${req.body.email}" and password="${req.body.authtoken}"`, function (err, res1) {
                            if (err) {
                                console.log(err);
                                res.redirect("/")
                            } else {
                                res.redirect(`/user/login/dashboard?auth=true&email=${req.body.email}&authtoken=${req.body.authtoken}`)
                            }
                        })
                    }
                }
            })
        }
    } else res.send("Error in uploading picture try after some time");
});
app.post("/adminupdate", (req, res) => {
    console.log(req.body.email)
    con.query(`SELECT * FROM admins where email="${req.body.email}"`, (err, result) => {
        if (err) {
            console.log(err);
            res.send("unable update")
        } else {
            console.log(result)
            if (req.body.authtoken == result[0].password) {
                con.query(`update admins set startdate="${req.body.startdate}",starttime="${req.body.starttime}",enddate="${req.body.enddate}",endtime="${req.body.endtime}",noh="${req.body.noh}" where email="${req.body.email}"`, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.send("unable update")
                    } else {
                        if (result.affectedRows == 1) {
                            res.redirect(`/admin/dashboard?auth=true&email=${req.body.email}&authtoken=${req.body.authtoken}`)
                        }

                    }
                })
            }
        }
    })
});
app.post("/submit",(req,res)=>{
    con.query(`select * from qs`,(err,res1)=>{
        if(err) res.send("some error occured")
        var i=parseInt(1)
        var score=0;
        res1.forEach(qs => {
            if(qs.ans==req.body[i]){
                score++;
                i++;
            }else{
                i++;
            }
        });
        con.query(`update users set score="${score}",takeexam="1" where email="${req.body.email}"`,(err,res2)=>{
            if(err) throw err;
            console.log(res2)
            if(res2.affectedRows==1){
            res.redirect(`/user/login/dashboard?auth=true&email=${req.body.email}&authtoken=${req.body.authtoken}`)
            }
        })
    })
});
app.get("/exam",(req,res)=>{
    con.query(`select * from qs`,(err,res1)=>{
        if(err) res.send("some error occured")
        con.query(`select * from admins where email="admin@gmail.com"`,(err,res2)=>{
            if(err) res.send("some error occured")
            con.query(`select * from users where email="${req.query.email}"`,(err,res3)=>{
                if(err) res.send("some error occured")
                res.render("exam",{title: "Take Exam",qs:res1,exam:res2,info:res3})
            })        })
    })
})
app.get("/edit",(req,res)=>{
    con.query(`select * from qs where slno="${req.query.slno}"`,(err,res1)=>{
        if(err) res.send("error loding qs");
        res.render("edit",{title:"SSC | Edit Questions",email:req.query.email,authtoken:req.query.authtoken,qs:res1})
    })
})

app.post("/updateqs",(req,res)=>{
    var opt=`${req.body.op1}$${req.body.op2}$${req.body.op3}$${req.body.op4}`
    console.log(opt)
    con.query(`update qs set qs="${req.body.qs}",opts="${opt}",ans="${req.body.ans}" where slno="${req.body.slno}"`,(err,result)=>{
        if(err) {console.log(err);res.send("some error ocurred while adding question")};
        console.log(result)
        res.redirect(`/previewqs?email=${req.body.email}&authtoken=${req.body.authtoken}`)
    })
})
app.use((req, res) => {
    res.render("404")
});
