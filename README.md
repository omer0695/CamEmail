# CamEmail
A simple app which is used to take picture from mobile phone/ laptop, 
and then send the picture as a pdf attachment in the email.
The project consists on Node and Express backend and React.js based frontend.

## The backend
Backend is created using node and express and it uses port 5000
Use command 'npm install' and then 'node server.js' inside root folder to start the server.

## The fronted
The frontend is inside client folder of the application and it uses port 3000
Use command 'npm install' and then 'npm start' inside client folder to start client

On laptop, the application can be tested on http://localhost:3000/

Following dependencies have been used:
jslib-html5-camera-photo for camera
axios for sending emails
jspdf for generating pdf files

## Email configuration
Use your Gmail id and password in config.js file to provide smtp server

## Mobile testing
https has been enabled in package.json to enable the app usage on mobile phones.
Please make sure to turn off your system firewall and then use your system IP and port to run the app

Example format: https://192.168.10.5:3000/

