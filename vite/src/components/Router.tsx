import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Modal from "./Modal";
import Menu from "./Menu";
import Reasons from "./Reasons";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<Modal />} />
        <Route path="/reasons" element={<Reasons />} />
        <Route path="*" element={<Navigate to="/add" />} />
      </Routes>
      <Menu />
    </BrowserRouter>
  );
};

export default Router;
