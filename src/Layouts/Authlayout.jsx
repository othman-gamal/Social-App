import { Outlet } from "react-router";
import AuthBg from "../assets/AuthBG.png";

export default function Authlayout() {
  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="grid-span-1">
        <img src={AuthBg} alt="background" className="w-full h-full" />
      </div>
      <div className="col-span-2  flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
