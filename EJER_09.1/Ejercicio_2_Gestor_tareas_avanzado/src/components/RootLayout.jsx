import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const RootLayout = () => (
  <div className="main-content">
    <Navbar /> 
    <div className="page-container">
      <Outlet />
    </div>
  </div>
);

export default RootLayout;
