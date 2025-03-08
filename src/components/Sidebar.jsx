/*import { GoArrowLeft } from "react-icons/go";
import { GoCalendar, GoPerson, GoFile } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { RiFlowerFill } from "react-icons/ri";

export const NavItem = ({ icon, title, onClick, open }) => (
  <li
    className="text-white text-sm flex items-center cursor-pointer p-2 hover:bg-[#EBA9D6] rounded-md mt-2 transition-all duration-300 z-50"
    onClick={onClick}
  >
    <span
      className={`text-2xl transition-transform duration-300 ${
        open ? "opacity-100 scale-100" : "opacity-100 scale-90"
      }`}
    >
      {icon}
    </span>
    <span
      className={`ml-4 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-lg">{title}</span>
    </span>
  </li>
);

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex">
      <div
        className={`bg-[#9a5ea7] p-5 pt-8 fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out ${
          open ? "w-56" : "w-20"
        } flex flex-col`}
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
      >
        <GoArrowLeft
          className={`bg-[#9a5ea7] text-white text-2xl rounded-full absolute -right-3 top-9 border border-blue-light cursor-pointer transition-transform duration-300 ease-in-out ${
            !open ? "rotate-180" : "rotate-0"
          }`}
          onClick={() => setOpen(!open)}
        />

        <div className="inline-flex mb-6 items-center gap-x-2">
          <RiFlowerFill className="text-white text-3xl" />
          {open && (
            <span className="text-white font-bold text-3xl">Menu</span>
          )}
        </div>

        <nav className="flex-grow mt-20">
          <ul>
            <NavItem
              icon={<IoHomeOutline />}
              onClick={() => navigate("/HomePage")}
              open={open}
              title={"Inicio"}
            />
            <NavItem
              icon={<GoFile />}
              onClick={() => navigate("/Inventory")}
              open={open}
              title={"Inventario"}
            />
            <NavItem
              icon={<GoCalendar />}
              onClick={() => navigate("/calendarizacion")}
              open={open}
              title={"Pedidos"}
            />
            <NavItem
              icon={<GoPerson />}
              onClick={() => navigate("/User")}
              open={open}
              title={"Usuarios"}
            />
            
          </ul>
        </nav>

        <ul className="mt-auto">
          <NavItem
            icon={<CiLogout />}
            onClick={handleLogout}
            open={open}
            title={"Cerrar Sesión"}
          />
        </ul>
      </div>

      <div
        className={`flex-grow transition-all duration-300 ease-in-out ${
          open ? "ml-56" : "ml-20"
        } mt-16`}
      >
        
      </div>
    </div>
  );
};

export default Sidebar;*/

import { GoArrowLeft } from "react-icons/go";
import { GoCalendar, GoPerson, GoFile } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { RiFlowerFill } from "react-icons/ri";

export const NavItem = ({ icon, title, onClick, open }) => (
  <li
    className="text-white text-sm flex items-center cursor-pointer p-2 hover:bg-[#EBA9D6] rounded-md mt-2 transition-all duration-300 z-50"
    onClick={onClick}
  >
    <span
      className={`text-2xl transition-transform duration-300 ${
        open ? "opacity-100 scale-100" : "opacity-100 scale-90"
      }`}
    >
      {icon}
    </span>
    <span
      className={`ml-4 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-lg">{title}</span>
    </span>
  </li>
);

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex">
      <div
        className={`bg-[#9a5ea7] p-5 pt-8 fixed top-2 left-2 bottom-2 z-50 rounded-lg transition-all duration-300 ease-in-out shadow-lg ${
          open ? "w-56" : "w-20"
        } flex flex-col`}
      >
        <GoArrowLeft
          className={`bg-[#9a5ea7] text-white text-2xl rounded-full absolute -right-3 top-9 border border-blue-light cursor-pointer transition-transform duration-300 ease-in-out ${
            !open ? "rotate-180" : "rotate-0"
          }`}
          onClick={() => setOpen(!open)}
        />

        <div className="inline-flex mb-6 items-center gap-x-2">
          <RiFlowerFill className="text-white text-3xl" />
          {open && (
            <span className="text-white font-bold text-3xl">Menu</span>
          )}
        </div>

        <nav className="flex-grow mt-20">
          <ul>
            <NavItem
              icon={<IoHomeOutline />}
              onClick={() => navigate("/HomePage")}
              open={open}
              title={"Inicio"}
            />
            <NavItem
              icon={<GoFile />}
              onClick={() => navigate("/Inventory")}
              open={open}
              title={"Inventario"}
            />
            <NavItem
              icon={<GoCalendar />}
              onClick={() => navigate("/Orders")}
              open={open}
              title={"Pedidos"}
            />
            <NavItem
              icon={<GoPerson />}
              onClick={() => navigate("/Users")}
              open={open}
              title={"Usuarios"}
            />
          </ul>
        </nav>

        <ul className="mt-auto">
          <NavItem
            icon={<CiLogout />}
            onClick={handleLogout}
            open={open}
            title={"Cerrar Sesión"}
          />
        </ul>
      </div>

      <div
        className={`flex-grow transition-all duration-300 ease-in-out ${
          open ? "ml-[15rem]" : "ml-[5rem]"
        } mt-16`}
      >
        
      </div>
    </div>
  );
};

export default Sidebar;
