import { useRef, useState, useEffect } from 'react';

const WebcamCapture = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: {width: 1920, height: 1080 }})
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    return (
        <div>
            <div className='camera'>
                <video ref={videoRef}></video>
                <button className='green-button'>capture</button>
            </div>
            <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas ref={photoRef}></canvas>
            </div>
        </div>
    )
};

export default WebcamCapture;