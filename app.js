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

  var ReverseServo1  = [6001, 8024, 8024, 8024, 8024, 8024, 8024, 8024, 8024, 8024, 8024, 6001];
  var ReverseServo2  = [3862, 6030, 3772, 3772, 3772, 3772, 3772, 3772, 3772, 3772, 3772, 3862];
  var ReverseServo3  = [9086, 9086, 9086, 9086, 9086, 9086, 9086, 9086, 9086, 9086, 9086, 9086];
  var ReverseServo4  = [6561, 6561, 6561, 6561, 6561, 6561, 6561, 6561, 6561, 9479, 9479, 6561];
  var ReverseServo5  = [3293, 3293, 3293, 3293, 3293, 3293, 3293, 3293, 3293, 3293, 3293, 3293];
  var ReverseServo6  = [6721, 6721, 6721, 6721, 6721, 6754, 6754, 6754, 6754, 6754, 6754, 6721];
  var ReverseServo7  = [6144, 6144, 6144, 6144, 6144, 6144, 6144, 8442, 8442, 8442, 8442, 6144];
  var ReverseServo8  = [8624, 8624, 8624, 8624, 8624, 8624, 8624, 6202, 9227, 9227, 9227, 8624];
  var ReverseServo9  = [5051, 5051, 5051, 5051, 5051, 5051, 5051, 5051, 5096, 5096, 5096, 5051];
  var ReverseServo10 = [6173, 6173, 6173, 6173, 6173, 7744, 7744, 7744, 7744, 7744, 7744, 6173];
  var ReverseServo11 = [6217, 6217, 6217, 6217, 6217, 8005, 5707, 5707, 5707, 5707, 5707, 6217];
  var ReverseServo12 = [9323, 9323, 9323, 9323, 9323, 9323, 9323, 9323, 9323, 9323, 9323, 9323];

  var UnverseServo1  = [5193, 5193, 5193, 5193, 5193, 5193, 5193, 3039, 5193];
  var UnverseServo2  = [3862, 3862, 3862, 3862, 3862, 3862, 3862, 3862, 3862];
  var UnverseServo3  = [9086, 9165, 9007, 9007, 9007, 9007, 9007, 9007, 9007];
  var UnverseServo4  = [7356, 5148, 4441, 4441, 4441, 4441, 4441, 4441, 7356];
  var UnverseServo5  = [3293, 3293, 2933, 2933, 2933, 2933, 2933, 2933, 3293];
  var UnverseServo6  = [6721, 3904, 6929, 6929, 6929, 6929, 6929, 6929, 6721];
  var UnverseServo7  = [5906, 5906, 5906, 5906, 5906, 4660, 4660, 4660, 5906];
  var UnverseServo8  = [8624, 8624, 8624, 8624, 8624, 5794, 8907, 8907, 8624];
  var UnverseServo9  = [5051, 5051, 5051, 5051, 5051, 5051, 5051, 5051, 5051];
  var UnverseServo10 = [6411, 6411, 6411, 5184, 4194, 4194, 4194, 4194, 6411];
  var UnverseServo11 = [6217, 6217, 6217, 7802, 5736, 5736, 5736, 5736, 6217];
  var UnverseServo12 = [9323, 9323, 9323, 9323, 9323, 9323, 9323, 9323, 9323];

  var ServoTransform1  = [8933, 8933, 8933, 8933, 8933, 8933, 8933, 8933, 8933];  
  var ServoTransform2  = [3508, 1984, 0,0,0,0,0,0,0];
  var ServoTransform3  = [8858, 10944,0,0,0,0,0,0,0];
  var ServoTransform4  = [3704, 3704, 3704, 3704, 3704, 3704, 3704, 3704, 3704];
  var ServoTransform5  = [3218, 3218, 3218, 3218, 3218, 3218, 3218, 2047, 0];
  var ServoTransform6  = [6580, 6580, 6580, 6580, 6580, 6580, 6580, 8296, 0];
  var ServoTransform7  = [3467, 3467, 3467, 3467, 3467, 3467, 3467, 3467, 3467];
  var ServoTransform8  = [8921, 8921, 8921, 8921, 8921, 10816, 10816, 10816,0];
  var ServoTransform9  = [5154, 5154, 5154, 5154, 5154, 4398, 4078, 4078,0];
  var ServoTransform10 = [8878, 8878, 8878, 8878, 8878, 8878, 8878, 8878,0];
  var ServoTransform11 = [6202, 6202, 6202, 3380,0,0,0,0,0];
  var ServoTransform12 = [9055, 9055, 9055, 11200,0,0,0,0,0]; 



/*-----------------------------------------------------------------Servo Function----------------------------------------------------------------*/
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
    maestro.setTarget(0, 1611);
    maestro.setTarget(1, 950); 
    maestro.setTarget(2, 2300);
    maestro.setTarget(3, 1552); 
    maestro.setTarget(4, 800); 
    maestro.setTarget(5, 1700);
    maestro.setTarget(6, 1500);  
    maestro.setTarget(7, 2150); 
    maestro.setTarget(8, 1300);
    maestro.setTarget(9, 1622);
    maestro.setTarget(10, 1570); 
    maestro.setTarget(11, 2280); 
}
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
function Reverse(){
  var Delay = 500;
  var Count = 0;
  for (var i=0;i<=11;i++){
    setTimeout(function(){
      maestro.setTarget(0,  (ReverseServo1[Count]/4.02));
      maestro.setTarget(1,  (ReverseServo2[Count]/4.02)); 
      maestro.setTarget(2,  (ReverseServo3[Count]/4.02));
      maestro.setTarget(3,  (ReverseServo4[Count]/4.02)); 
      maestro.setTarget(4,  (ReverseServo5[Count]/4.02)); 
      maestro.setTarget(5,  (ReverseServo6[Count]/4.02));
      maestro.setTarget(6,  (ReverseServo7[Count]/4.02));  
      maestro.setTarget(7,  (ReverseServo8[Count]/4.02)); 
      maestro.setTarget(8,  (ReverseServo9[Count]/4.02));
      maestro.setTarget(9,  (ReverseServo10[Count]/4.02));
      maestro.setTarget(10, (ReverseServo11[Count]/4.02)); 
      maestro.setTarget(11, (ReverseServo12[Count]/4.02));
      Count++;
    }, i*Delay);
  }    
}
function Unverse(){
  var Delay = 500;
  var Count = 0;
  for (var i=0;i<=8;i++){
    setTimeout(function(){
      maestro.setTarget(0,  (UnverseServo1[Count]/4.02));
      maestro.setTarget(1,  (UnverseServo2[Count]/4.02)); 
      maestro.setTarget(2,  (UnverseServo3[Count]/4.02));
      maestro.setTarget(3,  (UnverseServo4[Count]/4.02)); 
      maestro.setTarget(4,  (UnverseServo5[Count]/4.02)); 
      maestro.setTarget(5,  (UnverseServo6[Count]/4.02));
      maestro.setTarget(6,  (UnverseServo7[Count]/4.02));  
      maestro.setTarget(7,  (UnverseServo8[Count]/4.02)); 
      maestro.setTarget(8,  (UnverseServo9[Count]/4.02));
      maestro.setTarget(9,  (UnverseServo10[Count]/4.02));
      maestro.setTarget(10, (UnverseServo11[Count]/4.02)); 
      maestro.setTarget(11, (UnverseServo12[Count]/4.02));
      Count++;
    }, i*Delay);
  }    
}

function Transfrom(){
  var Delay = 500;
  var Count = 0;
  for (var i=0;i<=8;i++){
    setTimeout(function(){
      maestro.setTarget(0,  (ServoTransform1[Count]/4.02));
      maestro.setTarget(1,  (ServoTransform2[Count]/4.02)); 
      maestro.setTarget(2,  (ServoTransform3[Count]/4.02));
      maestro.setTarget(3,  (ServoTransform4[Count]/4.02)); 
      maestro.setTarget(4,  (ServoTransform5[Count]/4.02)); 
      maestro.setTarget(5,  (ServoTransform6[Count]/4.02));
      maestro.setTarget(6,  (ServoTransform7[Count]/4.02));  
      maestro.setTarget(7,  (ServoTransform8[Count]/4.02)); 
      maestro.setTarget(8,  (ServoTransform9[Count]/4.02));
      maestro.setTarget(9,  (ServoTransform10[Count]/4.02));
      maestro.setTarget(10, (ServoTransform11[Count]/4.02)); 
      maestro.setTarget(11, (ServoTransform12[Count]/4.02));
      Count++;
    }, i*Delay);
  }    
}

/*------------------------------------------------------------------Motor Function ------------------------------------------------------------------*/
function MotorForward(){
   PythonShell.run('MotorForward.py', function (err) {
  if (err) throw err;
  console.log('finished');
  });
}
function MotorBackward(){
   PythonShell.run('MotorBackward.py', function (err) {
  if (err) throw err;
  console.log('finished');
  });
}
function MotorRight(){
   PythonShell.run('MotorRight.py', function (err) {
  if (err) throw err;
  console.log('finished');
  });
}
function MotorLeft(){
   PythonShell.run('MotorLeft.py', function (err) {
  if (err) throw err;
  console.log('finished');
  });
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
  socket.on('MF', function(data) {
      console.log("MotorForward");
      MotorForward();
  });
  socket.on('MB', function(data) {
      console.log("CameraDown");
      MotorBackward();  
  });

   socket.on('MR', function(data) {
      console.log("MotorRight");
      MotorRight();  
  });
    socket.on('ML', function(data) {
      console.log("MotorLeft");
      MotorLeft();  
  });  

   socket.on('DR', function(data) {
      console.log("CameraDown");
      Transfrom();  
  });

/* setInterval(function(){
    //console.log("sending compass info");
    compass();
    socket.emit('compass', bearing);   
  },500); */
});