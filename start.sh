 # start node server
 node app.js &
 
 # start camera 
 $ uv4l --driver raspicam --auto-video_nr --width 640 --height 480 --encoding h264 --framerate 20 --vflip yes --hflip yes