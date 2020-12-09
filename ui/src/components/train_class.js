import { useState, useEffect, useRef } from "react";

import WebcamButton from "components/webcam_button";
import UploadButton from "components/upload_button";
import CloseButton from "components/close_button";

export default function TrainClass({ canvasRef }) {
  const [mode, setMode] = useState("none");

  return (
    <div className="bg-white mb-10 rounded-md">
      <div className="border-b-2 border-solid border-gray-400 p-2 text-lg font-bold">
        Source
      </div>
      {mode === "none" && (
        <div className="p-2">
          <div className="flex my-2 space-x-2">
            <WebcamButton onClick={() => setMode("webcam")} />
            <UploadButton onClick={() => setMode("upload")} />
          </div>
        </div>
      )}

      {mode === "webcam" && (
        <TakeImageFromWebcam
          onClose={() => setMode("none")}
          canvasRef={canvasRef}
        />
      )}
      {mode === "upload" && (
        <TakeImageFromUpload onClose={() => setMode("none")} />
      )}
    </div>
  );
}

function TakeImageFromWebcam({ onClose, canvasRef }) {
  const videoRef = useRef();

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

  function onCapture() {
    const vw = videoRef.current.videoWidth;
    const vh = videoRef.current.videoHeight;
    canvasRef.current.setAttribute("width", vw);
    canvasRef.current.setAttribute("height", vh);
    canvasRef.current
      .getContext("2d")
      .drawImage(videoRef.current, 0, 0, vw, vh);
    onClose();
  }

  return (
    <div className="bg-blue-100">
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
          onClick={onCapture}
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white p-1 px-16 rounded"
          children="Capture"
        />
      </div>
    </div>
  );
}

function TakeImageFromUpload() {
  return <div></div>;
}
