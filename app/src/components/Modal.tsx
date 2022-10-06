import { useEffect, useRef, useState } from "react";
import { writetoDB, reasonExists } from "../tools/firebase";
import { toast, ToastOptions } from "react-toastify";
import placeholders from "../tools/placeholders";

const Modal = () => {
  const reason = useRef<HTMLInputElement>(null);

  const getRandomPlaceholder = () => {
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  };

  const [place, setPlace] = useState(getRandomPlaceholder());

  useEffect(() => {
    const interval = setInterval(() => {
      const newPlace = getRandomPlaceholder();
      if (newPlace !== place) {
        setPlace(getRandomPlaceholder());
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toastProps: ToastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  };

  const handleClick = async () => {
    if (reason.current !== null) {
      if (await reasonExists(reason.current.value)) {
        toast.error("Reason already exists", toastProps);
      } else if (reason.current.value.trim() === "") {
        toast.error(
          "Really? You can't think of a reason? Think harder",
          toastProps
        );
      } else {
        writetoDB(reason.current.value)
          .then(() => toast.success("Reason added", toastProps))
          .catch((e) => toast.error("Couldn't add reason"));
      }
    }
  };

  return (
    <div className="bg-white shadow-xl rounded my-auto mx-10 px-8 pt-8 pb-8 w-screen h-min">
      <label className="block text-gray-600 text-center text-xl font-bold mb-2">
        Why do you hate PHP?
      </label>
      <input

        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder={"PHP... " + place}
        ref={reason}
      />
      <div className="text-center mt-5">
        <button
          className="bg-purple-500 hover:bg-purple-700 transition-colors text-white font-bold, py-2 px-4 rounded "
          onClick={handleClick}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Modal;
