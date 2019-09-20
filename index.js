var app = require('express')();
var http = require('http').createServer(app);
const random = require('random')

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
    this.responded_users = []
    
    io.on('connection', (socket) => {

      console.log('User connected')
      this.users.push(socket);

      socket.on('disconnect', () => {
        remove(this.users, socket);
        console.log('User disconnected');
      });

      socket.on('close', () => {

        if (this.responded_users.length == this.users.length - 1) { 
          socket.send('drink');
          this.responded_users = [];
        } else {
          this.responded_users.push(socket);
        }

      })
    });

    while(true) {
      setTimeout(this.sendEvent, this.getRandomTime())
    }
  }

  sendEvent() {
    io.emit('popup', { for: 'everyone' });
  }
  
  getRandomTime(){
    return (60000) * random.int(min = 2, max = 8);
  }

}

penis = new FCRCServer();

    http.listen(3000, function(){
      console.log('listening on *:3000');
    });


