function TrainOptions({ option, setOption, onSubmit }) {
  return (
    <div className="m-4 bg-white rounded-md p-2">
      <div className="border-b-2 border-solid border-gray-400 p-2 text-lg font-bold">
        Training Options
      </div>
      <div className="border-b-2 border-solid border-gray-400 mb-2">
        <div className="mt-2">
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4"
                name="options"
                defaultChecked={option === 1}
                onClick={() => setOption(1)}
              />
              <span className="ml-2">Real to Monet</span>
            </label>
          </div>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4"
                name="options"
                defaultChecked={option === 2}
                onClick={() => setOption(2)}
              />
              <span className="ml-2">Sumer to Winter</span>
            </label>
          </div>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4"
                name="options"
                defaultChecked={option === 3}
                onClick={() => setOption(3)}
              />
              <span className="ml-2">Winter to Summer</span>
            </label>
          </div>
        </div>
      </div>
      <button
        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white p-1 px-16 rounded"
        children="Capture"
        onClick={onSubmit}
      />
    </div>
  );
}

export default TrainOptions;
