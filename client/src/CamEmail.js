import React, { useState, useEffect } from 'react';
import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo';
import axios from 'axios';
import jsPDF from 'jspdf';


const CamEmail = () => {
    const [cameraPhoto, setCameraPhoto] = useState(null);
    var cameraPhotoObj = null;
    var videoRef = React.createRef();

    useEffect(() => {
        // Start camera when component is first mounted inside useEffect hook
       startCamera(); 
    });

    const startCamera = () => {
        //for first time we set state and later reuse state variable
        if(cameraPhoto == null){
            cameraPhotoObj = new CameraPhoto(videoRef.current);
            setCameraPhoto(cameraPhotoObj); //set state variable
        } else {
            cameraPhotoObj = cameraPhoto;
        }

        // camera configuration
        let facingMode = FACING_MODES.ENVIRONMENT;
        let idealResolution = { width: 800, height: 1400 };
        
        cameraPhotoObj.startCamera(facingMode, idealResolution)
            .then(() => {
                console.log('camera is started !');
            })
            .catch((error) => {
                console.error('Camera not started!', error);
            });
    }

    const takePhoto = () => {
        // disable camera button to avoid multiple clicks
        document.getElementById("takePhotoBtn").setAttribute("disabled", "disabled");
        
        const config = {
            sizeFactor: 1,
            imageType: IMAGE_TYPES.JPG,
            imageCompression: 0.3
        };
        let dataUri = cameraPhoto.getDataUri(config);

        //show image preview
        let previewImg = document.getElementById("previewImg");
        previewImg.style.display = "block";
        previewImg.src = dataUri;

        //generate pdf with image
        const pdf = new jsPDF();
        pdf.text('MieterEngel coding challenge', 10, 10)
        pdf.addImage(dataUri, 'JPG', 0, 0, 0, 0, '', 'FAST');
        //pdf.save("download.pdf");

        //stop camera while email processing
        document.getElementById("CamContainer").style.display = "none";
        stopCamera();
        
        //Send email using node backend
        axios({
            method: "POST",
            url: "http://localhost:3000/send",
            data: {
                name: 'OS',
                email: 'coding-challenge@mieterengel.de',
                subject: 'Page Image',
                messageHtml: 'Email with Picture PDF.',
                attachments: [
                    {   
                        filename: 'Picture.pdf',
                        content: btoa(pdf.output()),
                        type: "application/pdf;base64",
                        encoding: 'base64',
                    }
                ]
            }
        }).then((response) => {
            if (response.data.msg === 'success') {
                alert("The email has been sent");
            } else if (response.data.msg === 'fail') {
                alert("Oops, something went wrong. Try again")
            }
        });
        
        //turn on camera after email is sent, roughly 8 secconds delay
        setTimeout(() => {
            document.getElementById("takePhotoBtn").removeAttribute("disabled");
            previewImg.style.display = "none";
            document.getElementById("CamContainer").style.display = "block";
            startCamera();
            }, 8000);
        console.log('photo taken');
    }


    const stopCamera = () => {
        cameraPhoto.stopCamera()
            .then(() => {
                console.log('Camera stoped!');
            })
            .catch((error) => {
                console.log('No camera to stop!:', error);
            });
            document.getElementById("takePhotoBtn").setAttribute("disabled", "disabled");
    }

    return (
        <div>
            <div id="CamContainer" className="CamContainer">
                <video ref={videoRef} autoPlay={true} />
            </div>

            <div id="containerCircles" >
                <button className="leftLink" onClick={() => { stopCamera(); }}>Abbruch</button>
                <button id="takePhotoBtn" onClick={() => {
                    if(!document.getElementById('takePhotoBtn').disabled) {takePhoto(); }
                     }}>
                    <div id="outerCircle">
                        <div id="innerCircle"></div>
                    </div>
                </button>
                <button  className="rightLink" onClick={() => { }}>Fertig</button>
            </div>

            <img alt="imgCamera" id="previewImg" style={{display: 'none'}} />  

        </div>
    );
}

export default CamEmail;