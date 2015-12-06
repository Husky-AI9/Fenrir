

/*var socket = io.connect('http:raspberrypi.local:5000');

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
*/

function hoveroff(){
     $("#idle").css("background-color","#3498DB","opacity","50%");
     $("#rest").css("background-color","#3498DB","opacity","50%");
     $("#tank").css("background-color","#3498DB","opacity","50%");
}

$(document).keypress(function(e){ // pressing key 
if(e.keyCode == 111){ // r
        socket.emit('CU');
    }
if(e.keyCode == 108){ // r
        socket.emit('CD');
    }
if(e.keyCode == 107){ // r
        socket.emit('CR');
    }
if(e.keyCode == 59){ // r
        socket.emit('CL');
    }

 if(e.keyCode == 114){ // r
      $("#rest").css("background-color","#81CFE0","opacity","50%");
      $("#idle").css("background-color","#3498DB","opacity","50%");
      $("#walking").css("background-color","#3498DB","opacity","50%");
      socket.emit('Rest');
     
}

if(e.keyCode == 114){ // r
      $("#rest").css("background-color","#81CFE0","opacity","50%");
      $("#idle").css("background-color","#3498DB","opacity","50%");
      $("#walking").css("background-color","#3498DB","opacity","50%");
      socket.emit('Rest');
     
}

if(e.keyCode == 105){ // i
      $("#idle").css("background-color","#81CFE0","opacity","50%");
      $("#rest").css("background-color","#3498DB","opacity","50%");
      $("#walking").css("background-color","#3498DB","opacity","50%");
         socket.emit('Idle');
}

  if(e.keyCode == 119){ // w 
    $("#d-up").css("background-color","#404d4d","opacity","50%"); // hover effect 
    $("#walking").css("background-color","#81CFE0","opacity","50%");
    hoveroff();
        socket.emit('F');
    }
   if(e.keyCode == 97){ // a 
    $("#d-left").css("background-color","#404d4d","opacity","50%");
    $("#walking").css("background-color","#81CFE0","opacity","50%");
    hoveroff();
      socket.emit('L');
    }
    if(e.keyCode == 100){ // d 
    $("#d-right").css("background-color","#404d4d","opacity","50%");
    $("#walking").css("background-color","#81CFE0","opacity","50%");
    hoveroff();
      socket.emit('R');
    }
    if(e.keyCode == 115){ // s 
    $("#d-down").css("background-color","#404d4d","opacity","50%");
    $("#walking").css("background-color","#81CFE0","opacity","50%");
    hoveroff();
      socket.emit('B');
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