import "style.css";
import { useRef, useState } from "react";

import { TrainClass, TrainOptions } from "components";

function App() {
  const image = useRef();
  const result = useRef();
  const [option, setOption] = useState(1);

  async function onSubmit() {
    const dataURL = image.current.toDataURL("image/jpeg", 1.0);
    const blobBin = atob(dataURL.split(",")[1]);
    const array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    const file = new Blob([new Uint8Array(array)], { type: "image/jpeg" });

    const form = new FormData();
    form.append("file", file, 'upload.jpeg');
    const response = await fetch("http://157.230.241.244:8000/convert?to=monet", {
      method: "POST",
      body: form,
    });

    const blob = await response.blob();
    const ctx = result.current.getContext("2d");
    result.current.setAttribute("width", 400);
    result.current.setAttribute("height", 400);
    const img = new Image();

    img.onload = function () {
      ctx.drawImage(img, 0, 0, 400, 400);
    };

    img.src = URL.createObjectURL(blob);
  }

  return (
    <div className="h-screen bg-gray-200">
      <div className="flex items-center">
        <div className="mt-10 ml-10">
          <TrainClass canvasRef={image} />
        </div>
        <div className="m-4 bg-white rounded-md p-2">
          <div className="border-b-2 border-solid border-gray-400 p-2 text-lg font-bold">
            Image
          </div>
          <canvas ref={image} style={{ width: 300, height: 300 }} />
        </div>
        <TrainOptions
          option={option}
          setOption={setOption}
          onSubmit={onSubmit}
        />
        <div className="m-4 bg-white rounded-md p-2">
          <div className="border-b-2 border-solid border-gray-400 p-2 text-lg font-bold">
            Result
          </div>
          <canvas ref={result} style={{ width: 300, height: 300 }} />
        </div>
      </div>
    </div>
  );
}

export default App;
