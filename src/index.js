import React, { useState } from "react";
import ReactDOM from "react-dom";
import Webcam from "react-webcam";

import "./styles.css";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

function App() {
    const webcamRef = React.useRef(null);
    const [image, setImage] = useState(undefined);
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        console.log(imageSrc);
    }, [webcamRef]);
    return (
        <div>
            {!image ? (
                <div>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </div>
            ) : (
                <img src={image} alt="webcam test" />
            )}
            <br />
            <button onClick={() => (!image ? capture() : setImage(undefined))}>
                {!image ? "Capture photo" : "take photo"}
            </button>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

