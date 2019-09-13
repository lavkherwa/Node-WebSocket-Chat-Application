// Import Libraries
var express = require('express');
var socket = require('socket.io');

// Application Setup
var app = express();
var server = app.listen(4000, function(){
  console.log("woo, server started at 4000");
});

// Static File
app.use(express.static('public'));

// Socket Setup
var io = socket(server);

io.on('connection', function(socket){
  console.log("Socket connection establised", socket.id);

  // Listen to messages on this connection
  socket.on('chat', function(data){
    // Emit message to all the sockets
    io.sockets.emit('chat', data);
  });

  // Listen to messages on this connection
  socket.on('typing', function(data){
    // Broadcast message to all the sockets
    socket.broadcast.emit('typing', data);
  });


})
