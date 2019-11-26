const express = require('express')
const multer = require('multer');

var app = express()
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/public/image/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.slice(0,6))
  }
})

var upload = multer({ storage: storage })


app.post('/upload', upload.single('file'), function(req, res){
  res.json({ok: true, status: 200, statusText: "Upload Success"});
});

app.listen(6000);