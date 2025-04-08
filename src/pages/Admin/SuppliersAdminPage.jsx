import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import api from "../../config/api";

export const SuppliersAdminPage = () => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal


  
  const fetchProveedores = async () => {
    try {
      const response = await api.get("/proveedor");
      setProveedores(response.data.data);
    } catch (error) {
      console.error("Error al obtener proveedores", error);
    }
  };

  useEffect(() => {
    fetchProveedores(); 
  }, []);


  const handleCrearProveedor = async (e) => {
    e.preventDefault();
    const proveedorData = { nombre, telefono, correo, direccion };

    try {
      await api.post("/proveedor", proveedorData);
      alert("Proveedor creado con éxito!");
      fetchProveedores(); // Refrescar la lista de proveedores
      setNombre("");
      setTelefono("");
      setCorreo("");
      setDireccion("");
      setIsModalOpen(false); 
    } catch (error) {
      alert("Error al crear el proveedor");
      console.error(error);
    }
  };

  
  const handleEliminarProveedor = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar este proveedor?"
    );
    if (!confirmacion) return;

    try {
      const response = await api.delete(`/proveedor/${id}`);
      console.log("Proveedor eliminado:", response.data);
      if (response.data && response.data.status) {
      alert("Proveedor eliminado con éxito!");
      await fetchProveedores();
      } else {
        alert(response.data?.message || "Error al eliminar la proveedores");
      }
      fetchProveedores(); // Actualizar la lista después de eliminar
    } catch (error) {
      alert("Error al eliminar el proveedor");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden overflow-y-auto">
        <Header />
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-4">Administrar Proveedores</h2>

          {/* Botón para abrir el modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-6 p-3 bg-[#EC75D6] hover:bg-[#fa6fe0] font-bold  text-white  rounded-md"
          >
            Crear Proveedor
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-1/3">
                <h3 className="text-lg font-semibold mb-4">Crear Proveedor</h3>
                <form onSubmit={handleCrearProveedor} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Teléfono"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Correo"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Dirección"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      type="submit"
                      className="w-full p-3 bg-blue-400 hover:bg-blue-500 text-white rounded-md"
                    >
                      Crear Proveedor
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="ml-4 text-gray-500 hover:text-gray-800"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Lista de proveedores */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Lista de Proveedores</h3>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Nombre</th>
                  <th className="border p-3 text-left">Teléfono</th>
                  <th className="border p-3 text-left">Correo</th>
                  <th className="border p-3 text-left">Dirección</th>
                  <th className="border p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.length > 0 ? (
                  proveedores.map((proveedor) => (
                    <tr key={proveedor.id} className="hover:bg-gray-50">
                      <td className="border p-3">{proveedor.nombre}</td>
                      <td className="border p-3">{proveedor.telefono}</td>
                      <td className="border p-3">{proveedor.correo}</td>
                      <td className="border p-3">{proveedor.direccion}</td>
                      <td className="border p-3 text-center">
                        <button
                          onClick={() => handleEliminarProveedor(proveedor.id)}
                          className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800 hover:bg-red-200 items-center mr-2 inline-flex"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="border p-3 text-center">
                      No hay proveedores registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};



