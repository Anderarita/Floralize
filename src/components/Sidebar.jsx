import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft, GoCalendar, GoPerson, GoFile } from "react-icons/go";
<<<<<<< HEAD
import { FaHandshake } from "react-icons/fa";
=======
>>>>>>> df7ea71c90c0769c48ea175eb5d7bf9678bcc01e
import { IoHomeOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { RiFlowerFill } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";

export const NavItem = ({ icon, title, onClick, open }) => (
  <li
    className="text-white text-sm flex items-center cursor-pointer p-2 hover:bg-[#EBA9D6] rounded-md mt-2 transition-all duration-300"
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
  const { user, hasRole, logout } = useAuth();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
<<<<<<< HEAD
  const isAdmin = hasRole("Admin"); 
  const isUser = hasRole("User"); 
=======
  const isAdmin = hasRole("Admin"); // Verifica si el usuario tiene rol de admin
>>>>>>> df7ea71c90c0769c48ea175eb5d7bf9678bcc01e

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth < 768) {
      setOpen(false); // Cierra el sidebar en dispositivos móviles
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 768);
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
          {open && <span className="text-white font-bold text-3xl">Menu</span>}
        </div>

        <nav className="flex-grow mt-20">
          <ul>
            <NavItem
              icon={<IoHomeOutline />}
<<<<<<< HEAD
              onClick={() => handleNavigate("/adminHome")}
              open={open}
              title={"Inicio"}
            />
            {! isAdmin && (
            <NavItem
              icon={<GoCalendar />}
              onClick={() => handleNavigate("/orders")}
              open={open}
              title={"Pedidos"}
            />
            )}
            {! isUser &&(
            <NavItem
                icon={<GoCalendar />}
                onClick={() => handleNavigate("/OrdersAdmin")}
                open={open}
                title={"Pedidos"}
            />
            )}

            {/* Mostrar el elemento de inventario solo si el usuario tiene el rol de Admin o Inventario */}
=======
              onClick={() => handleNavigate("/")}
              open={open}
              title={"Inicio"}
            />

>>>>>>> df7ea71c90c0769c48ea175eb5d7bf9678bcc01e
            {(hasRole("Admin") || hasRole("Inventario")) && (
              <NavItem
                icon={<GoFile />}
                onClick={() => handleNavigate("/inventory")}
                open={open}
                title={"Inventario"}
              />
            )}
<<<<<<< HEAD

            {!isAdmin && (
              <NavItem
                icon={<GoPerson />}
                onClick={() => handleNavigate("/ordersCustomers")}
                open={open}
                title={"Personalizados"}
              />
            )}
=======
            <NavItem
              icon={<GoCalendar />}
              onClick={() => handleNavigate("/Orders")}
              open={open}
              title={"Pedidos"}
            />
>>>>>>> df7ea71c90c0769c48ea175eb5d7bf9678bcc01e
            {isAdmin && (
              <>
                <NavItem
                  icon={<GoPerson />}
                  onClick={() => handleNavigate("/admin/users")}
                  open={open}
                  title={"Usuarios"}
                />
              </>
            )}
<<<<<<< HEAD
            {isAdmin && (
              <NavItem
                icon={<FaHandshake />}
                onClick={() => handleNavigate("/Suppliers")}
                open={open}
                title={"Proveedores"}
              />
            )}
=======
>>>>>>> df7ea71c90c0769c48ea175eb5d7bf9678bcc01e
          </ul>
        </nav>

        <ul className="mt-auto">
          <NavItem
            icon={<CiLogout />}
            onClick={logout}
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
        {/* Contenido principal de la página */}
      </div>
    </div>
  );
};

export default Sidebar;
