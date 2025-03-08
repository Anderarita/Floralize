import { useNavigate } from 'react-router-dom';
import fondo from '../components/image/Imagen.jpg';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fondo})` }}
      ></div>

      {/* Formulario de inicio de sesión */}
      <div className="bg-white/80 px-10 py-8 rounded-lg max-w-sm text-center shadow-lg backdrop-blur-sm">
        <h1 className="text-gray-800 text-2xl font-bold mb-6">Inicio de Sesión</h1>

        {/* Campo Usuario */}
        <div className="mb-4 text-left">
          <label htmlFor="usuario" className="block text-gray-700 mb-1">
            Usuario:
          </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            className="w-full px-3 py-2 border-b border-purple-600 bg-transparent focus:outline-none focus:border-purple-800 transition-colors"
          />
        </div>

        {/* Campo Contraseña */}
        <div className="mb-6 text-left">
          <label htmlFor="contrasena" className="block text-gray-700 mb-1">
            Contraseña:
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            className="w-full px-3 py-2 border-b border-purple-600 bg-transparent focus:outline-none focus:border-purple-800 transition-colors"
          />
        </div>

        {/* Botón Ingresar */}
        <button
          type="button"
          className="w-full bg-purple-700 text-white py-2 rounded-md font-semibold hover:bg-purple-800 transition-colors"
          onClick={() => navigate("/HomePage")}
        >
          Ingresar
        </button>

        {/* Enlaces */}
        <div className="mt-5">
          <a href="/Recover" className="text-purple-600 text-sm hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
          <br />
          <span className="text-gray-600 text-sm">¿No tienes una cuenta? </span>
          <a href="/Register" className="text-purple-600 text-sm hover:underline">
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
};

