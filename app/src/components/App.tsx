import Footer from "./Footer";
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 ">
        <div className="flex min-h-screen">
          <Router />
          <Footer />
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </div>
    </div>
  );
}

export default App;
