const path = require('path');
const express = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://ganesh:12345678Gan@cluster0.1rzep.mongodb.net/byteaca?retryWrites=true&w=majority";




const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

app.post('/send', (req, res) => {
  try {
    console.log("inside post method");
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

var d = new Date(req.body.dob);
var day = days[d.getDay()];

 MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("ByteAcademy");
  var myobj = { name: req.body.name, dob: req.body.dob };
  dbo.collection("customers").insertOne(myobj, function(err, re) {
    if (err) throw err;
    console.log("document inserted");
    db.close();
    res.send({
          success: true,
          message: `Hi ${req.body.name}, you are born on ${day}`
        });
  });
});

    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something Went Wrong'
    });
  }
});

app.listen(3030, () => {
  console.log('server start on port 3030');
});
