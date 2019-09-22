# Solution by Omer Saleem

## The backend
Backend is created using node and express and it uses port 5000
we need to use command 'node server.js' inside root folder to start the server

## The fronted
The frontend is inside client folder of the application and it uses port 3000
we need to use command 'npm start' inside client folder to start client

On laptop, the application can be tested on http://localhost:3000/

## Mobile testing
To test the app on a mobile phone, we need to run it on https which is required by getUserMedia
in order to make camera work on mobile phone. For this purpose, I have used ngrok which maps our 
localhost to https. Other steps are mentioned below

1. Download and execute ngrok and enter following command inside it:
ngrok http 5000 -host-header="localhost:5000" 
this will map our localhost to a remote url with https which can be opened using mobile devices
2. we need to paste that generated url in file client\src\CamEmail.js near line 68 and replace existing localhost URL
3. Use 'npm run build' command inside client folder to generate compiled source code for react app
4. Paste build folder on root with server.js. Then single server will host backend and frontend
5. Run command 'node server.js' inside root folder to start server and full application should be 
seen on http://localhost:5000/ as well we https URL provided by ngrok



# MieterEngel coding challenge

Welcome to the MieterEngel coding challenge! Your mission, should
you accept it, is to build a page that our customers can use
to take a picture of a page with their mobile phone and send the picture
to us via email.
For the frontend part of this work please use React, every other decision
about which frameworks you use is up to you. The choice will only
matter for the evaluation insofar as e. g. adding buggy external
dependencies will also affect the stability of your code.

## The fronted
A layout idea for the frontend can be found [here](https://marvelapp.com/project/3366817/).

## The backend
The backend should send an email with the picture attached as a PDF to `coding-challenge@mieterengel.de`.

## What we will look for

We will check for the following when evaluating the coding challenge:
* __Functionality:__ The code should work and send out the email
* __Code organization:__ The code should be organized in files,
classes, functions, etc., based on the inherent structure of the
features
* __Code style:__ The code could should be easily readable
* __Git commit structure:__ Whether git commits are named and
structured meaningfully
* __Stability:__ The software should not break if mistreated by
customers
* __Security:__ The code should be secured against common attacks

There will be bonus points based on:
* __Improvement ideas:__ For a list of things you would propose to
add in the code if you had more time. This doesn't mean features, but
e. g. documentation and tests.
* __Documentation:__ If there is non-self-explanatory code, it
should be documented
* __Tests:__ If the code or parts that make sense are automatically
tested.
