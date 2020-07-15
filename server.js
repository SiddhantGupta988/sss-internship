var express = require("express");
var mysql = require("mysql");
const nodemailer = require('nodemailer');
var SHA256 = require("crypto-js/sha256");
const {
  connect
} = require("http2");
const {
  connected
} = require("process");
let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'osesvit2021@gmail.com',
    pass: 'OSE2021SVIT'
  }
});
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testnodejs",
});

con.connect(function (err) {
  if (err) throw err;
  const connected = true;
  console.log("Connected!");
});

var app = express();

app.set("view engine", "ejs");

app.listen(3000);

app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

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
  console.log(req.query.auth)
  console.log(req.query.email)
  console.log(req.query.authtoken)
  if (req.query.auth == "true") {
    if (connected == true) {
      con.query(`SELECT email,password FROM admins where email="${req.query.email}" and password="${SHA256(req.query.authtoken)}"`, function (
        err,
        result,
        fields
      ) {
        if (err) { console.log(err);res.render("404");}
        if (result.length == 0) {
          res.render("404");
        } else {
          if (`${SHA256(req.query.authtoken)}` == result[0].password) {
            res.render("admindash")
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
  console.log(req.query.auth)
  console.log(req.query.email)
  console.log(req.query.authtoken)
  if (req.query.auth == "true") {
    if (connected == true) {
      con.query(`SELECT email,password FROM users where email="${req.query.email}" and password="${SHA256(req.query.authtoken)}"`, function (
        err,
        result,
        fields
      ) {
        if (err) { console.log(err);res.render("404");}
        if (result.length == 0) {
          res.render("404");
        } else {
          if (`${SHA256(req.query.authtoken)}` == result[0].password) {
            res.render("dashboard",{title:"SSC User dashboard"});
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

app.use((req, res) => {
  res.render("404");
});