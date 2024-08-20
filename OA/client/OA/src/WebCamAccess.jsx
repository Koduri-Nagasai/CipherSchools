import React, { useState, useEffect, useRef } from 'react';
import MCQTest from './Mcqs/test';
import './WebCamAccess.css';


function WebcamAccess() {
  const [hasAccess, setHasAccess] = useState(null);
  const streamRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setHasAccess(true);
        streamRef.current = stream;
        const videoElement = document.querySelector('video');
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      })
      .catch((error) => {
        setHasAccess(false);
        console.error('Webcam access denied or an error occurred:', error);
      });
  }, []);

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null; 
    }
  };

  return (
    <div>
      {hasAccess === null && <p>Requesting Webcam and Microphone access...</p>}
      <video autoPlay className={hasAccess ? 'has' : 'nohas'}></video>
      <div className="testdiv">
        {hasAccess === true && <MCQTest onSubmit={stopWebcam} />}
      </div>
      {hasAccess === false && <p>Webcam and Microphone access denied. Please enable access to continue.</p>}
    </div>
  );
}

export default WebcamAccess;
