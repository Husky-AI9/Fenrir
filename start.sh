"use strict";

var Neuron = require('../Neuron');
var Model = require('../Model');

//Absolute constraint for yaw servo
const YAW_MIN = -630;
const YAW_MAX = 630;
//Safe constraint for yaw servo
const YAW_MIN_IDEAL = -540;        
const YAW_MAX_IDEAL = 540;
//Absolute constraint for pitch servo
const PITCH_MIN = -90;
const PITCH_MAX = 90;

//Length of pulse in uSeconds
const PWM_YAW_ZERO = 1500;
const PWM_YAW_MIN = 600;
const PWM_YAW_MAX = 2400;
const PWM_PITCH_ZERO = 1500;
const PWM_PITCH_MIN = 500;
const PWM_PITCH_MAX = 2500;

class Tracker extends Neuron {
    constructor(name, feedback, color_log, idle_timeout, I2C, model) {
        super(name, feedback, color_log, idle_timeout);
        this.name = name;
        this.feedback = feedback;
        this.log = color_log;
        this.idle_time = idle_timeout;
        this.I2C = I2C;
        this.model = model;
        // Construct Class here

        /*this.Recalibrate();
        this.DefaultConfig();
        this.moveAngleLocal();
        this.Compass();*/

		this.gimbalPosition = [0, 0];
		this.DefaultPosition = [0,0];
		this.lidarMeasurement = 0;

        this.model.registerMemory('LIDAR');
        this.model.registerMemory('CAMERA GIMBAL');
    }
    react(input) {
        this.log.output(`REACTING ${this.name}: `, input);
        this.feedback(`REACTING ${this.name}: `, input);
		if(input.command == "moveAngleLocal") {
			this.moveAngleLocal([input.value.yaw, input.value.pitch], this.gimbalPosition);

		} else if(input.command == "moveInterval") {
			this.moveInterval([input.value.yaw, input.value.pitch], this.gimbalPosition, 
				[input.value.stabilizeYaw, input.value.stabilizePitch]);

		} else if(input.command == "defaultConfig") {
			this.defaultConfig([input.value.yaw, input.value.pitch]);

		} else if(input.command == "Recalibrate") {
			this.Recalibrate();

		}
	}
    halt() {
        this.log.output(`HALTING ${this.name}`);
        this.feedback(`HALTING ${this.name}`);
        
    }
    resume() {
        this.log.output(`RESUMING ${this.name}`);
        this.feedback(`RESUMING ${this.name}`);
        this.Recalibrate();
    }
    idle() {
        this.log.output(`IDLING ${this.name}`);
        this.feedback(`IDLING ${this.name}`);
        
    }
    Recalibrate() {
    	this.log.output("Moving gimbal to default position");
    	//Write DefaultPosition using I2C
    	return this.DefaultPosition;
    }
    DefaultConfig() {
    	try {
    	 /*Write Default setting for various device*/
    	 this.log.output("Write Default Position Sucessful");
    	}
    	catch(err){
    		this.log.output("Fail to write Default Position");
    		return false
    	}	
    }
    moveAngleLocal(value, position) {
    	var targetAngle = [0,0];
    	var value = [0,0]; //remove this whe we can communicate with client side 
    	position = [0,0];
    	//Constrains Pitch to bounds
    	if(value[1]>PITCH_MAX) {
    		targetAngle[1] = PITCH_MAX;
    	} else if(value[1] < PITCH_MIN) {
    		targetAngle[1] = PITCH_MIN;
    	} else {
    		targetAngle[1] = value[1];
    	}

    	//Determine whether going clockwise or anticlockwise is closer
    	targetAngle[0] = Math.floor((position[0])/360) * 360 + value[0];
    	if(((position[0]) - targetAngle[0]) > (position[0]) - (targetAngle[0] - 360)) {
    		targetAngle[0] = targetAngle[0] - 360;
    	}

    	//Prevents gimbal from exceeding the ideal bounds
    	if(targetAngle[0] <= YAW_MIN_IDEAL ) {
    		targetAngle[0] = targetAngle[0] + 360;
    	} else if(targetAngle[0] >= YAW_MAX_IDEAL) {
    		targetAngle[0] = targetAngle[0] - 360;
    	}    	
    	return targetAngle;	
    }
    Compass(){ //Function strictly for reference for communicating with i2C 
        var ADDRESSS = 0x1e;
        var buffer = new Uint8Array(6);
        this.I2C.writeByteSync(ADDRESSS, 0x00, 0x70); 
        this.I2C.writeByteSync(ADDRESSS, 0x01, 0xA0);
        this.I2C.writeByteSync(ADDRESSS, 0x02, 0x00);

        this.I2C.readI2cBlockSync(ADDRESSS, 0x03, 6, buffer);

        var X = new Int16Array([buffer[0] << 8 | buffer[1]])[0];

        this.log.output("First: " + X);
    }
   
}

module.exports = Tracker;