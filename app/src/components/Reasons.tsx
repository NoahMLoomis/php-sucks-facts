import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { getReasons } from "../tools/firebase";

const Reasons = () => {
  const [reasons, setReasons] = useState<IReasons>([]);
  useEffect(() => {
    const asyncWrapper = async () => {
      setReasons(await getReasons());
    };
    asyncWrapper();
  }, []);

  if (reasons.length <= 0) {
    return (
      <div className="content-area">
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              className="border border-blue-300 shadow rounded-md p-4 w-full mx-auto my-2"
            >
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="h-2 bg-slate-700 rounded "></div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="content-area ">
      <div className="grid grid-cols-2 gap-2">
        {reasons.map((reason) => (
          <div
            key={reason.id}
            className="border border-blue-300 shadow rounded-md p-4
             text-center  mx-auto w-full"
          >
            <div className="text-lg">{reason.fact}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reasons;
