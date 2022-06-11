// global variables
var mailAddress = '';
var mailPassword = '';
var count = 0;
// mail server credentials
process.argv.forEach(function(val, index, array) {
  if (index == 0) {
     // remove first and last character 
     mailAddress = val.slice(1, -1);
     console.log(mailAddress);
  }
  if (index == 1) {
     mailPassword = val.slice(1, -1);
     console.log(mailPassword);
  }
  
}
); 
// HTML templating engine
var pug = require('pug');
// database for analytics sqlite3
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/database.db');
// create table if not exists
db.run("CREATE TABLE IF NOT EXISTS analytics (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, timestamp TEXT)");
db.run("CREATE TABLE IF NOT EXISTS templates (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT ,template TEXT");
// insert template into table if not exists
function insertTemplate(name, template) {
  db.run("INSERT INTO templates (name, template) VALUES (?, ?)", [name, template]);
}
// insert data into table
function insertData(email, timestamp) {
  db.run("INSERT INTO analytics (email, timestamp) VALUES (?, ?)", [email, timestamp]);
}
// get data from table
function getNumberCallsMade() {
  // (function to get num of emails sent out)
  // count number of rows in table and return it as a number
  db.get("SELECT COUNT(*) AS count FROM analytics", function(err, row) {
    if (err) {
      console.log(err);
    } else {
      count = 0;
      console.log(row.count);
      console.log(typeof row.count);
      count = count + row.count;
    }
  } 
  );
  return count;
}
// Require express
const express = require("express");
// Initialize express
const app = express();
var nodemailer = require('nodemailer');
// cors
const cors=require("cors");
const { json } = require('express');
const corsOptions ={
   origin:'*', 
   credentials:true, //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)); //cors
app.use(express.json());
// Function to send an email 
function sendEmail(email, subject, message) {
  var transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: { //email credentials
        user: mailAddress, 
        pass: mailPassword, 
    }
});
  var mailOptions = {
    from: mailAddress,
    to: email,
    subject: subject,
    html: '<h1>Welcome</h1><p>That was easy!</p>'
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
// Set port
const port = process.env.PORT || 3000;
// API endpoints for email sending 
app.post("/api/email", (req, res) => {
    // Get email and message from request
    const { to, subject } = req.body;
    // Send email
    sendEmail(to, subject);
    // Return success
    res.json({ success: true });
    // Publish Analytics event pn api/analytics post
    // post to analytics
    insertData(to, new Date().toLocaleString());
    }
);

// API endpoints for getting analytics events
app.get("/api/analytics", (req, res) => {
    // Get number of events
    var count = getNumberCallsMade();
    // Send count 
    res.send ({ 'count': count });    
});
// API endpoints for getting email templates

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`http://localhost:${port}`);
    // log every 5 minutes
    setInterval(() => {
        console.log("Server is still running btw");
    }
    , 300000);
}
);
// Export app
module.exports = app;
// End of file