function TrainOptions({ option, setOption, onSubmit, loading }) {
  return (
    <div className="m-4 bg-white rounded-md p-2 w-48">
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
        disabled={loading}
        className="cursor-pointer w-full bg-blue-500 hover:bg-blue-700 text-white p-1 px-16 rounded"
        children={
          loading ? (
            <div className="flex justify-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            "Start"
          )
        }
        onClick={onSubmit}
      />
    </div>
  );
}

export default TrainOptions;
