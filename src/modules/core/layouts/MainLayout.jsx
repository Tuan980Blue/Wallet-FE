import Footer from "../system-component/Footer.jsx";
import { Outlet } from "react-router-dom";
import Navbar from "../system-component/Navbar.jsx";

export function MainLayout() {
  return (
    <div className={"w-full"}>
      <Navbar />

      <div className={"mt-24"}>
        <div className={"w-full"}></div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
