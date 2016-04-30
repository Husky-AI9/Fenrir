
var socket = io.connect('http:raspberrypi.local:5000');

socket.on('Rest', function (data) {
    console.log("Feedback: Rest command received");
});
socket.on('Idle', function (data) {
    console.log("Feedback: Idle command received");
});

socket.on('F', function (data) {
    console.log("Feedback: Forward command received");
});

socket.on('B', function (data) {
    console.log("Feedback: Backward command received");
});

socket.on('L', function (data) {
    console.log("Feedback: Left command received");
});

socket.on('R', function (data) {
    console.log("Feedback: Right command received");
});



$(document).keydown(function(e){ // pressing key 

   var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;


if(key == 87){ // w 
 
        socket.emit('F');
    }
if(key == 65){ // a 

      socket.emit('L');
    }
if(key == 68){ // d 

      socket.emit('R');
    }
if(key == 83){ // s 

      socket.emit('B');
    }
       
});



$(document).ready(function() {
 $("#d-up").click(function(){
     socket.emit('F');
      });
 $("#d-down").click(function(){
      socket.emit('B');
      });
 $("#d-left").click(function(){
      socket.emit('L');
      });
 $("#d-right").click(function(){
      socket.emit('R');
      });
 });