var app = require('express')();
var http = require('http').createServer(app);

var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

function remove(array, value) {
  var index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
}


class FCRCServer {
  constructor() {
    this.users = []

    io.on('connection', (socket) => {
      console.log('User connected')
      this.users.push(socket);
      socket.on('disconnect', () => {
        remove(this.users, socket);
        console.log('User disconnected');
        console.log(this.users.length);
      });
    });

    io.emit('some event', { for: 'everyone' });

  }


}

penis = new FCRCServer();

    http.listen(3000, function(){
      console.log('listening on *:3000');
    });


