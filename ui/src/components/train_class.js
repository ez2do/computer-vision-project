import { useState, useEffect, useRef } from "react";

import WebcamButton from "components/webcam_button";
import UploadButton from "components/upload_button";
import CloseButton from "components/close_button";

import { useInterval } from "hooks";

export default function TrainClass({ name = "" }) {
  const [mode, setMode] = useState("none");

  return (
    <div className="bg-white mb-10 rounded-md" style={{ width: 590 }}>
      <div className="border-b-2 border-solid border-gray-400 p-2 text-lg font-bold">
        Class 1
      </div>
      {mode === "none" && (
        <div className="p-2">
          <div className="text-sm">Add Image Samples:</div>
          <div className="flex my-2 space-x-2">
            <WebcamButton onClick={() => setMode("webcam")} />
            <UploadButton onClick={() => setMode("upload")} />
          </div>
        </div>
      )}

      {mode === "webcam" && (
        <TakeImageFromWebcam onClose={() => setMode("none")} />
      )}
      {mode === "upload" && (
        <TakeImageFromUpload onClose={() => setMode("none")} />
      )}
    </div>
  );
}

function TakeImageFromWebcam({ onClose }) {
  const videoRef = useRef();
  const [images, setImages] = useState([]);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    let tracks = [];

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: { width: 400, height: 400, frameRate: 24, facingMode: "user" },
        })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          tracks = stream.getTracks();
        });
    }

    return () => {
      tracks.forEach((track) => track.stop());
    };
  }, []);

  useInterval(() => {
    if (capturing) {
      const vw = videoRef.current.videoWidth;
      const vh = videoRef.current.videoHeight;
      const canvas = document.createElement("canvas");
      canvas.setAttribute("width", vw);
      canvas.setAttribute("height", vh);
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0, vw, vh);

      const image = canvas.toDataURL("image/jpeg", 1);
      setImages([...images, image]);
    }
  }, 100);

  return (
    <div className="flex">
      <div style={{ width: 295, height: 430 }} className="bg-blue-100">
        <div className="p-2 flex justify-between items-center">
          <span className="text-sm">Webcam</span>
          <CloseButton onClick={onClose} />
        </div>
        <video
          ref={videoRef}
          width="400px"
          height="400px"
          className="rounded"
          autoPlay={true}
        />
        <div className="p-2 text-center">
          <button
            onMouseDown={() => setCapturing(true)}
            onMouseUp={() => setCapturing(false)}
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white p-1 px-16 rounded"
            children="Hold to Record"
          />
        </div>
      </div>
      <div style={{ width: 295, height: 430 }}>
        <div className="p-2">Image Samples: {images.length}</div>
        <div
          className="w-auto overflow-y-croll overflow-x-hidden"
          style={{ height: 380 }}
        >
          {images.map((image, index) => (
            <img
              key={`index-${index}`}
              alt=""
              src={image}
              className="rounded-lg m-1 inline-block"
              width="58px"
              height="58px"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TakeImageFromUpload() {
  return <div></div>;
}
