// Make the connection here
var socket = io.connect("http://localhost:4000");

// Reference of the html elememts
var message = document.getElementById('message');
var handle =  document.getElementById('handle');
var button =  document.getElementById('send');
var output =  document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit events
button.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

// Typing feedback
message.addEventListener('keypress',function(){
  socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
  feedback.innerHTML = ""; // refresh back the data
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message..</em></p>';
});
