import React from "react";
import Webcam from "react-webcam";

function WebCam(handleExit) {
  const constraints = {
    width: 1280,
    height: 720,
    facingMode: 'environment'
  };
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <button onClick={() => handleExit}>x</button>
      <Webcam
        width={1280}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={constraints}      
      />
      <button onClick={capture}>capture</button>
    </div>
  );
};

export default WebCam;