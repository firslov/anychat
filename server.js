const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io').listen(server).sockets;
const multer = require('multer');


var chathis = [];

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/public/image/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.slice(0,6))
  }
})

var upload = multer({ storage: storage })

app.use(express.static('dist'))

io.on("connection", socket => {
  console.log('a user connected');

  socket.on('into-room', id => {
    socket.join(id);
    console.log('join room ' + id);
    var exist = false;
    var one = {};
    one.id = id;
    one.his = [];
    if (chathis.length == 0) {
      chathis.push(one);
      socket.emit('backhis', []);
    } else {
      for (var item = 0; item < chathis.length; item++) {
        if (chathis[item].id == id) {
          socket.emit('backhis', chathis[item].his);
          exist = true
        };
      };
      if (exist == false) {
        chathis.push(one);
        socket.emit('backhis', []);
      };
    };
    console.log(chathis)
  });
  socket.on('quit-room', id => {
    socket.leave(id);
    console.log('leave room ' + id);
  });


  // message
  socket.on('chat-message', msg => {
    console.log(msg.id);
    console.log(msg.msg);
    const one = {
      msg: msg.msg,
      time: msg.time
    }
    for (var item = 0; item < chathis.length; item++) {
      if (chathis[item].id == msg.id) {
        console.log("in:"+chathis[item].his.length)
        if (chathis[item].his.length >= 10){
          chathis[item].his.shift()
        }
        chathis[item].his.push(one)
        console.log("out:"+chathis)
      }
    };
    // console.log(msg.msg);
    // send_msg = chathis[length()]
    io.to(msg.id).emit('output', {
      msg: one
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

})

app.post('/upload', upload.single('file'), function(req, res){
  res.json({ok: true, status: 200, statusText: "Upload Success"});
});

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server running on port ${port}`));
