import "style.css";

import { TrainClass } from "components";

function App() {
  return (
    <div className="flex bg-gray-200">
      <div className="mt-10 ml-10">
        <TrainClass />
        <TrainClass />
        <TrainClass />
        <TrainClass />
      </div>
    </div>
  );
}

export default App;
