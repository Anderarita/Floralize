import { GoPerson } from "react-icons/go";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, hasRole } = useAuth();

  const isAdmin = hasRole("Admin");

  return (
    <header className="bg-[#9a5ea7] p-4 flex items-center justify-between w-full mx-2 mt-2 rounded-lg shadow-lg">
      <h1 className="text-white text-5xl font-bold text-center font-dancing">
        Floralize
      </h1>
      <div className="flex items-center">
        {user ? (
          // Si el usuario está autenticado, muestra su nombre y el enlace a su perfil
          <div className="flex items-center space-x-4">
            <span className="text-white font-semibold">
              {user.name}
              {isAdmin && (
                <span className="ml-1 text-xs text-yellow-500 font-bold">
                  (Admin)
                </span>
              )}
            </span>
            <Link to="/profile">
              <GoPerson className="text-white text-4xl transition-colors duration-300 hover:text-[#fbc02d] cursor-pointer" />
            </Link>
          </div>
        ) : (
          // Si el usuario no está autenticado, solo muestra el ícono de perfil
          <Link to="/login">
            <GoPerson className="text-white text-4xl transition-colors duration-300 hover:text-[#fbc02d] cursor-pointer" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
