
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

function hoveroff(){
     $("#idle").css("background-color","#3498DB","opacity","50%");
     $("#rest").css("background-color","#3498DB","opacity","50%");
     $("#tank").css("background-color","#3498DB","opacity","50%");
}

$(document).keydown(function(e){ // pressing key 

   var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

if(key == 111){ // r
        socket.emit('CU');
    }
if(key == 108){ // r
        socket.emit('CD');
    }
if(key== 107){ // r
        socket.emit('CR');
    }
if(key == 59){ // r
        socket.emit('CL');
    }
if(key == 82){ // r
      $("#rest").css("background-color","#81CFE0","opacity","50%");
      $("#idle").css("background-color","#3498DB","opacity","50%");
      $("#walking").css("background-color","#3498DB","opacity","50%");
      socket.emit('Rest');    
}
if(key == 73){ // i
      $("#idle").css("background-color","#81CFE0","opacity","50%");
      $("#rest").css("background-color","#3498DB","opacity","50%");
      $("#walking").css("background-color","#3498DB","opacity","50%");
         socket.emit('Idle');
}
if(key == 87){ // w 
    $("#d-up").css("background-color","#404d4d","opacity","50%"); // hover effect 
    $("#walking").css("background-color","#81CFE0","opacity","50%");
    hoveroff();
        socket.emit('F');
    }
if(key == 65){ // a 
    $("#d-left").css("background-color","#404d4d","opacity","50%");
    $("#walking").css("background-color","#81CFE0","opacity","50%");
    hoveroff();
      socket.emit('L');
    }
if(key == 68){ // d 
    $("#d-right").css("background-color","#404d4d","opacity","50%");
    $("#walking").css("background-color","#81CFE0","opacity","50%");
    hoveroff();
      socket.emit('R');
    }
if(key == 83){ // s 
    $("#d-down").css("background-color","#404d4d","opacity","50%");
    $("#walking").css("background-color","#81CFE0","opacity","50%");
    hoveroff();
      socket.emit('B');
    }
if(key == 38){//up key
    socket.emit('MF');
    }
if(key == 40){//down key
    socket.emit('MB');
    }
if(key == 39){//right key
    socket.emit('MR');
    }
if(key == 37){//left key
    socket.emit('ML');
    }           
if(key == 89){//down key
    socket.emit('DR');
    }        
});

$(document).keyup(function(e){  
    $("#d-up").css("background-color"," #1d2323");
    $("#d-down").css("background-color"," #1d2323");
    $("#d-left").css("background-color"," #1d2323");
    $("#d-right").css("background-color"," #1d2323");
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