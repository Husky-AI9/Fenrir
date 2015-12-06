var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , url= require('url')
  , fs = require('fs')

app.listen(5000);

var PololuMaestro = require("pololu-maestro");
var maestro = new PololuMaestro("/dev/ttyACM0");
var yaw = 1200;
var pitch = 1800;
//wait until connection is ready
maestro.on("ready", function() {
 console.log("connection made");
 maestro.setSpeed(0, 60);
 maestro.setSpeed(1, 60);
 maestro.setSpeed(2, 60);
 maestro.setSpeed(3, 60);
 maestro.setSpeed(4, 60);
 maestro.setSpeed(5, 60);
 maestro.setSpeed(6, 60);
 maestro.setSpeed(7, 60);
 maestro.setSpeed(8, 60);
 maestro.setSpeed(9, 60);
 maestro.setSpeed(10, 60);
 maestro.setSpeed(11, 60);
 maestro.setSpeed(12, 60);
 maestro.setSpeed(13, 60);
 maestro.setTarget(12, 1200); 
 maestro.setTarget(13, 1800);
});


// Http handler function
function handler (req, res) {

    // Using URL to parse the requested URL
    var path = url.parse(req.url).pathname;

    // Managing the root route
    if (path == '/') {
        index = fs.readFile(__dirname+'/public/index.html', 
            function(error,data) {

                if (error) {
                    res.writeHead(500);
                    return res.end("Error: unable to load index.html");
                }

                res.writeHead(200,{'Content-Type': 'text/html'});
                res.end(data);
            });
    // Managing the route for the javascript files
    } else if( /\.(js)$/.test(path) ) {
        index = fs.readFile(__dirname+'/public'+path, 
            function(error,data) {

                if (error) {
                    res.writeHead(500);
                    return res.end("Error: unable to load " + path);
                }

                res.writeHead(200,{'Content-Type': 'text/plain'});
                res.end(data);
            });
    } else {
        res.writeHead(404);
        res.end("Error: 404 - File not found.");
    }
}
function CameraRight(){
    yaw = yaw+100;
    maestro.setTarget(12, yaw); 

}
function CameraLeft(){
    yaw = yaw-100;
    maestro.setTarget(12, yaw); 

}
function CameraUp(){
    pitch = pitch+100;
    maestro.setTarget(13, pitch); 

}
function CameraDown(){
    pitch = pitch-100;
    maestro.setTarget(13, pitch); 

}

function Rest(){
    //Bot Rest postion
    maestro.setTarget(0, 1900);
    maestro.setTarget(1, 700); 
    maestro.setTarget(2, 800);

    maestro.setTarget(3, 1350); 
    maestro.setTarget(4, 2300); 
    maestro.setTarget(5, 2250);

    maestro.setTarget(6, 1300);  
    maestro.setTarget(7, 1800); 
    maestro.setTarget(8, 2300);

    maestro.setTarget(9, 1700);
    maestro.setTarget(10, 1200); 
    maestro.setTarget(11, 1300);
}     
    
function Idle(){
   //Bot Standing Idle
    maestro.setTarget(0, 1900);
    maestro.setTarget(1, 1750); 
    maestro.setTarget(2, 880);

    maestro.setTarget(3, 1350); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);

    maestro.setTarget(6, 1300);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2200);

    maestro.setTarget(9, 1700);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1400); 
    
}

function Forward(){
  //Forward
    maestro.setTarget(0, 2100);
    maestro.setTarget(1, 1750); 
    maestro.setTarget(2, 900);
    maestro.setTarget(3, 1200); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1600);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1500);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
setTimeout(function(){
    maestro.setTarget(0, 1900);
    maestro.setTarget(1, 1300); 
    maestro.setTarget(2, 900);
    maestro.setTarget(3, 1400); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1600);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1500);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 300);

setTimeout(function(){
    maestro.setTarget(0, 1700);
    maestro.setTarget(1, 1750); 
    maestro.setTarget(2, 900);
    maestro.setTarget(3, 1600); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1200);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1700);
    maestro.setTarget(10, 1500); 
    maestro.setTarget(11, 1300);
  }, 600);
setTimeout(function(){
    maestro.setTarget(0, 1700);
    maestro.setTarget(1, 1750); 
    maestro.setTarget(2, 900);
    maestro.setTarget(3, 1600); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1200);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1800);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 900);
setTimeout(function(){
    maestro.setTarget(0, 1800);
    maestro.setTarget(1, 1750); 
    maestro.setTarget(2, 900);
    maestro.setTarget(3, 1600); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1400);  
    maestro.setTarget(7, 1300); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1800);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 1200);
setTimeout(function(){
    maestro.setTarget(0, 2100);
    maestro.setTarget(1, 1750); 
    maestro.setTarget(2, 900);
    maestro.setTarget(3, 1600); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1600);  
    maestro.setTarget(7, 700); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1800);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 1500);
setTimeout(function(){
    maestro.setTarget(0, 2100);
    maestro.setTarget(1, 1750); 
    maestro.setTarget(2, 900);
    maestro.setTarget(3, 1400); 
    maestro.setTarget(4, 2200); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1600);  
    maestro.setTarget(7, 700); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1600);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 1800);
  setTimeout(function(){
    maestro.setTarget(0, 2100);
    maestro.setTarget(1, 1750); 
    maestro.setTarget(2, 900);
    maestro.setTarget(3, 1200); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1600);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1500);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 2100);      
}

function Reverse(){
  //Forward
    maestro.setTarget(0, 1900);//1
    maestro.setTarget(1, 1750); 
    maestro.setTarget(2, 900);
    maestro.setTarget(3, 1350); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1300);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1700);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);

setTimeout(function(){
    maestro.setTarget(0, 1500);//2
    maestro.setTarget(1, 1200); 
    maestro.setTarget(2, 900);
    maestro.setTarget(3, 1350); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1600);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1700);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 300);

setTimeout(function(){
    maestro.setTarget(0, 1500);//3
    maestro.setTarget(1, 1700); 
    maestro.setTarget(2, 800);
    maestro.setTarget(3, 1350); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1600);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1700);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 600);
setTimeout(function(){
    maestro.setTarget(0, 1500);//4
    maestro.setTarget(1, 1700); 
    maestro.setTarget(2, 800);
    maestro.setTarget(3, 1350); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1200);  
    maestro.setTarget(7, 1400); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1700);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 900);
setTimeout(function(){
    maestro.setTarget(0, 1500);//5
    maestro.setTarget(1, 1700); 
    maestro.setTarget(2, 800);
    maestro.setTarget(3, 1350); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1000);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2300);
    maestro.setTarget(9, 1700);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 1200);
setTimeout(function(){
    maestro.setTarget(0, 1500);//6
    maestro.setTarget(1, 1700); 
    maestro.setTarget(2, 800);
    maestro.setTarget(3, 1350); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1000);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2300);
    maestro.setTarget(9, 1400);
    maestro.setTarget(10, 1400); 
    maestro.setTarget(11, 1300);
  }, 1500);
setTimeout(function(){
    maestro.setTarget(0, 1500);//7
    maestro.setTarget(1, 1700); 
    maestro.setTarget(2, 800);
    maestro.setTarget(3, 1350); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1000);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1200);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 1800);
  setTimeout(function(){
    maestro.setTarget(0, 1500);//8
    maestro.setTarget(1, 1700); 
    maestro.setTarget(2, 800);
    maestro.setTarget(3, 800); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1000);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1200);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 2100); 
  setTimeout(function(){
    maestro.setTarget(0, 1900);//9
    maestro.setTarget(1, 1750); 
    maestro.setTarget(2, 900);
    maestro.setTarget(3, 1350); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1300);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1700);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 2600);     
}

function Unverse(){

 maestro.setTarget(0, 1500);
 maestro.setTarget(1, 1750);
 maestro.setTarget(2, 900);
 maestro.setTarget(3, 1350);
 maestro.setTarget(4, 1500);
 maestro.setTarget(5, 2250);
 maestro.setTarget(6, 1300);
 maestro.setTarget(7, 800);
 maestro.setTarget(8, 2200);
 maestro.setTarget(9, 1700);
 maestro.setTarget(10, 2200);
 maestro.setTarget(11, 1300);

setTimeout(function(){
    maestro.setTarget(0, 1500);//3
    maestro.setTarget(1, 1750); 
    maestro.setTarget(2, 800);
    maestro.setTarget(3, 1350); 
    maestro.setTarget(4, 1500); 
    maestro.setTarget(5, 2250);
    maestro.setTarget(6, 1300);  
    maestro.setTarget(7, 800); 
    maestro.setTarget(8, 2200);
    maestro.setTarget(9, 1700);
    maestro.setTarget(10, 2200); 
    maestro.setTarget(11, 1300);
  }, 600);
//Set 3
setTimeout(function(){
 maestro.setTarget(0, 1500);
 maestro.setTarget(1, 1750);
 maestro.setTarget(2, 900);
 maestro.setTarget(3, 1350);
 maestro.setTarget(4, 1500);
 maestro.setTarget(5, 2250);
 maestro.setTarget(6, 1600);
 maestro.setTarget(7, 1500);
 maestro.setTarget(8, 2200);
 maestro.setTarget(9, 1700);
 maestro.setTarget(10, 2200);
 maestro.setTarget(11, 1300);
}, 1000);
//Set 4
setTimeout(function(){
maestro.setTarget(0, 1500);
 maestro.setTarget(1, 1750);
 maestro.setTarget(2, 900);
 maestro.setTarget(3, 1350);
 maestro.setTarget(4, 1500);
 maestro.setTarget(5, 2250);
 maestro.setTarget(6, 1700);
 maestro.setTarget(7, 800);
 maestro.setTarget(8, 2200);
 maestro.setTarget(9, 1700);
 maestro.setTarget(10, 2200);
 maestro.setTarget(11, 1300);
}, 1500);
setTimeout(function(){
 maestro.setTarget(0, 2000);
 maestro.setTarget(1, 1000);
 maestro.setTarget(2, 900);
 maestro.setTarget(3, 1350);
 maestro.setTarget(4, 1500);
 maestro.setTarget(5, 2250);
 maestro.setTarget(6, 1700);
 maestro.setTarget(7, 800);
 maestro.setTarget(8, 2200);
 maestro.setTarget(9, 1700);
 maestro.setTarget(10, 2200);
 maestro.setTarget(11, 1300);
}, 2000);
setTimeout(function(){
 maestro.setTarget(0, 2200);
 maestro.setTarget(1, 1750);
 maestro.setTarget(2, 900);
 maestro.setTarget(3, 1350);
 maestro.setTarget(4, 1500);
 maestro.setTarget(5, 2250);
 maestro.setTarget(6, 1700);
 maestro.setTarget(7, 800);
 maestro.setTarget(8, 2200);
 maestro.setTarget(9, 1700);
 maestro.setTarget(10, 2200);
 maestro.setTarget(11, 1300);
}, 2500);
setTimeout(function(){
maestro.setTarget(0, 2200);
 maestro.setTarget(1, 1750);
 maestro.setTarget(2, 900);
 maestro.setTarget(3, 1900);
 maestro.setTarget(4, 1500);
 maestro.setTarget(5, 2250);
 maestro.setTarget(6, 1700);
 maestro.setTarget(7, 800);
 maestro.setTarget(8, 2200);
 maestro.setTarget(9, 1700);
 maestro.setTarget(10, 2200);
 maestro.setTarget(11, 1300);
}, 3000);
setTimeout(function(){
 maestro.setTarget(0, 2200);
 maestro.setTarget(1, 1750);
 maestro.setTarget(2, 900);
 maestro.setTarget(3, 1900);
 maestro.setTarget(4, 1500);
 maestro.setTarget(5, 2250);
 maestro.setTarget(6, 1700);
 maestro.setTarget(7, 800);
 maestro.setTarget(8, 2200);
 maestro.setTarget(9, 2100);
 maestro.setTarget(10, 2200);
 maestro.setTarget(11, 1300);
 }, 3500);

setTimeout(function(){
 maestro.setTarget(0, 1500);
 maestro.setTarget(1, 1750);
 maestro.setTarget(2, 900);
 maestro.setTarget(3, 1350);
 maestro.setTarget(4, 1500);
 maestro.setTarget(5, 2250);
 maestro.setTarget(6, 1300);
 maestro.setTarget(7, 800);
 maestro.setTarget(8, 2200);
 maestro.setTarget(9, 1700);
 maestro.setTarget(10, 2200);
 maestro.setTarget(11, 1300);
 }, 4000);

}


// Web Socket Connection
io.sockets.on('connection', function (socket) {

  // If we recieved a command from a client to start watering lets do so

   socket.on('Rest', function(data) {
      console.log("Rest Position");
      Rest();
      setTimeout(function(){
          socket.emit("Rest");
      }, 1000);
  });

  socket.on('Idle', function(data) {
      console.log("Idle Position");
      Idle();
      setTimeout(function(){
          socket.emit("Idle");
      }, 1000);
  });

  socket.on('F', function(data) {
      console.log("Forward");
      Forward();
      setTimeout(function(){
          socket.emit("F");
      }, 1000);
  });

  socket.on('B', function(data) {
      console.log("Backward");
      setTimeout(function(){
          socket.emit("B");
      }, 1000);
  });

  socket.on('L', function(data) {
      console.log("Left");
      Unverse();
      setTimeout(function(){
          socket.emit("L");
      }, 1000);
  });

  socket.on('R', function(data) {
      console.log("Right");
      Reverse();
      setTimeout(function(){
          socket.emit("R");
      }, 1000);
  });

  socket.on('CR', function(data) {
      console.log("CameraRight");
      CameraRight();   
  });

   socket.on('CL', function(data) {
      console.log("CameraLeft");
      CameraLeft();   
  });

    socket.on('CU', function(data) {
      console.log("CameraUp");
      CameraUp();   
  });

     socket.on('CD', function(data) {
      console.log("CameraDown");
      CameraDown();   
  });
  
});