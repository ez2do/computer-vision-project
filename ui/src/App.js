import "style.css";
import { useRef, useState } from "react";

import { TrainClass, TrainOptions } from "components";

function App() {
  const image = useRef();
  const [option, setOption] = useState(1);

  function onSubmit() {
    console.log("okok", option);
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
      </div>
    </div>
  );
}

export default App;
