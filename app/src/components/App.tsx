import { useState } from "react";

function App() {
  return (
    <div className=" flex h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-white shadow-xl rounded mx-8 my-8 px-8 pt-6 pb-8 w-screen h-min">
        <label className="block text-gray-600 text-center text-xl font-bold mb-2">
          Why do you hate PHP?
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="reason"
        />
        <div className="text-center mt-5">
          <button className="bg-purple-500 hover:bg-purple-700 transition-colors text-white font-bold, py-2 px-4 rounded w-1/6">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
