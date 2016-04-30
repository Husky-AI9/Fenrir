var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , url= require('url')
  , fs = require('fs')

app.listen(5000); // Use local port 5000

var PythonShell = require('python-shell');

var PololuMaestro = require("node-pololumaestro");
var maestro = new PololuMaestro("/dev/ttyACM0");
var yaw = 1200;
var pitch = 1800;
//wait until connection is ready
maestro.on("ready", function() { // Set servo speed and some servo position 
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
/*--------------------------------------------------Servo Position Mapping -----------------------------------------------------------------*/
  var ForwardServo1  = [5193, 6877, 7790, 6877, 6877, 6877, 6877, 6877, 5033];
  var ForwardServo2  = [3862, 5859, 3588, 3588, 3588, 3588, 3588, 3588, 3588];
  var ForwardServo3  = [9086, 9165, 9007, 9007, 9007, 9007, 9007, 9007, 9007]; 
  var ForwardServo4  = [7356, 7356, 5633, 5633, 5633, 5633, 5633, 7636, 7636];
  var ForwardServo5  = [3293, 3293, 3293, 3293, 3293, 3293, 3293, 3293, 3293];
  var ForwardServo6  = [6721, 6721, 6721, 6721, 6721, 6721, 6721, 4282, 7307];
  var ForwardServo7  = [5906, 5906, 5906, 5906, 6644, 5051, 5051, 5051, 5051];
  var ForwardServo8  = [8624, 8624, 8624, 8624, 8624, 6527, 8741, 8741, 8741];
  var ForwardServo9  = [5051, 5051, 5051, 5051, 5051, 5051, 5051, 5051, 5051];
  var ForwardServo10 = [6411, 6411, 6411, 5284, 5284, 5284, 7831, 7831, 7831];
  var ForwardServo11 = [6217, 6217, 6217, 8081, 5984, 5984, 6056, 5984, 5984];
  var ForwardServo12 = [9323, 9323, 9323, 9323, 9323, 9323, 9323, 9323, 9323];


/*-----------------------------------------------------------------Servo Function----------------------------------------------------------------*/

function Forward(){
  var Delay = 500;
  var Count = 0;
  for (var i=0;i<=8;i++){
    setTimeout(function(){
      maestro.setTarget(0,  (ForwardServo1[Count]/4.02));
      maestro.setTarget(1,  (ForwardServo2[Count]/4.02)); 
      maestro.setTarget(2,  (ForwardServo3[Count]/4.02));
      maestro.setTarget(3,  (ForwardServo4[Count]/4.02)); 
      maestro.setTarget(4,  (ForwardServo5[Count]/4.02)); 
      maestro.setTarget(5,  (ForwardServo6[Count]/4.02));
      maestro.setTarget(6,  (ForwardServo7[Count]/4.02));  
      maestro.setTarget(7,  (ForwardServo8[Count]/4.02)); 
      maestro.setTarget(8,  (ForwardServo9[Count]/4.02));
      maestro.setTarget(9,  (ForwardServo10[Count]/4.02));
      maestro.setTarget(10, (ForwardServo11[Count]/4.02)); 
      maestro.setTarget(11, (ForwardServo12[Count]/4.02));
      Count++;
    }, i*Delay);
  }    
}



/*-------------------------------------------------------------------Handling Request----------------------------------------------------------------*/
// Web Socket Connection
io.sockets.on('connection', function (socket) {
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
  

/* setInterval(function(){
    //console.log("sending compass info");
    compass();
    socket.emit('compass', bearing);   
  },500); */
});