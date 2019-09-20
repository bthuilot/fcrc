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

    setTimeout(sendEvent, getRandomTime());
  }
}


function sendEvent() {
  io.emit('popup', { for: 'everyone' });
  console.log('window sent')
  setTimeout(sendEvent, getRandomTime());
}
  
function getRandomTime(){
  return (60000) * random.int(2,8);
}



http.listen(3000, function(){
      console.log('listening on *:3000');
    });




penis = new FCRCServer();


