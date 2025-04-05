import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import api from "../../config/api";


export const OrdersAdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomOrder, setSelectedCustomOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [activeTab, setActiveTab] = useState("regular");

  // Función para formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  // Función para formatear fecha con manejo de errores
  const formatDate = (dateString) => {
    if (!dateString) return "Fecha no disponible";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Fecha inválida";
      }
      return format(date, "PPPpp", { locale: es });
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return "Error en fecha";
    }
  };

  // Función para cambiar el estado del pedido regular
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await api.put(`/pedido/${orderId}/estado`, {
        estado: newStatus,
      });

      if (response.data.status) {
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, estado: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      setError("Error al actualizar el estado del pedido");
    }
  };

  // Función para cambiar el estado del pedido personalizado - Versión corregida
  const handleCustomStatusChange = async (orderId, newStatus) => {
    try {
      // Actualización optimista
      setCustomOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, estado: newStatus } : order
        )
      );

      // Cambiar la URL a la correcta
      const response = await api.put(
        `/personalido/${orderId}/estado`,
        newStatus, // Enviar solo el string del estado
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.status) {
        throw new Error(response.data.message || "Error al actualizar estado");
      }

      setError(null);
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      setError(error.message);

      // Revertir cambio si falla
      setCustomOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, estado: order.estado || "Pendiente" }
            : order
        )
      );
    }
  };

  // Función para ver detalles del pedido regular
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Función para ver detalles del pedido personalizado
  const viewCustomOrderDetails = (order) => {
    setSelectedCustomOrder(order);
    setShowCustomModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch regular orders
        const [ordersResponse, detailsResponse, customOrdersResponse] =
          await Promise.all([
            api.get(`/pedido/?includeDetails=true`),
            api.get("/Detalle"),
            api.get("/personalido"),
            api.get("/producto")
          ]);

        // Verificar y limpiar datos de pedidos regulares
        const regularOrdersData = ordersResponse.data.status
          ? ordersResponse.data.data.map((order) => ({
              ...order,
              fechaPedido: order.fechaPedido || new Date().toISOString(),
              estado: order.estado || "Pendiente",
            }))
          : [];

        // Verificar y limpiar datos de detalles
        const detailsData = detailsResponse.data.status
          ? detailsResponse.data.data
          : [];

        // Combinar pedidos con sus detalles
        const pedidosCompletos = regularOrdersData.map((pedido) => {
          const detallesPedido = detailsData.filter(
            (detalle) => detalle.pedidoId === pedido.id
          );
          return { ...pedido, detalles: detallesPedido };
        });

        setOrders(pedidosCompletos);

        // Verificar y limpiar datos de pedidos personalizados
        const customOrdersData = customOrdersResponse.data.status
          ? customOrdersResponse.data.data.map((order) => ({
              ...order,
              fechaPedido: order.fechaPedido || new Date().toISOString(),
              estado: order.estado || "Pendiente",
            }))
          : [];

        setCustomOrders(customOrdersData);
      } catch (error) {
        setError("Error al cargar los pedidos");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Administración de Pedidos
              </h1>
            </div>

            {/* Tabs para cambiar entre tipos de pedidos */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("regular")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "regular"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Pedidos Regulares
                </button>
                <button
                  onClick={() => setActiveTab("custom")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "custom"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Pedidos Personalizados
                </button>
              </nav>
            </div>

            {/* Panel de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-gray-500 text-sm font-medium">
                  Total Pedidos
                </h3>
                <p className="text-2xl font-bold">
                  {activeTab === "regular"
                    ? orders.length
                    : customOrders.length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-gray-500 text-sm font-medium">
                  Pendientes
                </h3>
                <p className="text-2xl font-bold text-yellow-600">
                  {activeTab === "regular"
                    ? orders.filter((o) => o.estado === "Pendiente").length
                    : customOrders.filter((o) => o.estado === "Pendiente")
                        .length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-gray-500 text-sm font-medium">
                  En Proceso
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {activeTab === "regular"
                    ? orders.filter((o) => o.estado === "EnProceso").length
                    : customOrders.filter((o) => o.estado === "EnProceso")
                        .length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-gray-500 text-sm font-medium">
                  Completados
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {activeTab === "regular"
                    ? orders.filter((o) => o.estado === "Completado").length
                    : customOrders.filter((o) => o.estado === "Completado")
                        .length}
                </p>
              </div>
            </div>

            {/* Tabla de pedidos */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                  <p>{error}</p>
                </div>
              ) : activeTab === "regular" && orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">
                    No hay pedidos regulares disponibles
                  </p>
                </div>
              ) : activeTab === "custom" && customOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">
                    No hay pedidos personalizados disponibles
                  </p>
                </div>
              ) : activeTab === "regular" ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(order.fechaPedido)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.clienteNombre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={order.estado}
                              onChange={(e) =>
                                handleStatusChange(order.id, e.target.value)
                              }
                              className={`block w-full px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${
                                order.estado === "Completado"
                                  ? "bg-green-100 text-green-800"
                                  : order.estado === "EnProceso"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              <option value="Pendiente">Pendiente</option>
                              <option value="EnProceso">En Proceso</option>
                              <option value="Completado">Completado</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => viewOrderDetails(order)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              Ver detalles
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tipo de Flor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cantidad
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {customOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                            {order.tipoFlor || "No especificado"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.cantidad}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={order.estado || "Pendiente"}
                              onChange={(e) =>
                                handleCustomStatusChange(
                                  order.id,
                                  e.target.value
                                )
                              }
                              className={`block w-full px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${
                                order.estado === "Completado"
                                  ? "bg-green-100 text-green-800"
                                  : order.estado === "EnProceso"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              <option value="Pendiente">Pendiente</option>
                              <option value="EnProceso">En Proceso</option>
                              <option value="Completado">Completado</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => viewCustomOrderDetails(order)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              Ver detalles
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Modal de detalles del pedido regular */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">
                    Detalles del Pedido
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Cerrar</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Información del Cliente
                    </h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedOrder.clienteNombre}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Direccion
                    </h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedOrder.direccion}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Fecha del Pedido
                    </h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(selectedOrder.fechaPedido)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Estado Actual
                    </h4>
                    <p className="mt-1 text-sm text-gray-900 capitalize">
                      {selectedOrder.estado.toLowerCase()}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Total</h4>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {formatCurrency(selectedOrder.total)}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Productos
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {selectedOrder.detalles.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {selectedOrder.detalles.map((detalle) => (
                          <li key={detalle.id} className="py-3">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {detalle.productoNombre ||
                                    "Producto no especificado"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Cantidad: {detalle.cantidad}
                                </p>
                              </div>
                              <p className="text-sm font-semibold text-gray-900">
                                {formatCurrency(
                                  detalle.precio * detalle.cantidad
                                )}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        No hay productos en este pedido
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de detalles del pedido personalizado */}
        {showCustomModal && selectedCustomOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">
                    Pedido Personalizado
                  </h3>
                  <button
                    onClick={() => setShowCustomModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Cerrar</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-2 gap-6">
                  {/* Información básica */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Cliente
                      </h4>
                      <p className="mt-1 text-sm text-gray-900 font-mono">
                        {selectedCustomOrder.nombreCliente}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Direccion
                      </h4>
                      <p className="mt-1 text-sm text-gray-900 font-mono">
                        {selectedCustomOrder.direccion}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Telefono
                      </h4>
                      <p className="mt-1 text-sm text-gray-900 font-mono">
                        {selectedCustomOrder.telefono}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Tipo de Flor
                      </h4>
                      <p className="mt-1 text-sm text-gray-900 capitalize">
                        {selectedCustomOrder.tipoFlor || "No especificado"}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Cantidad
                      </h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedCustomOrder.cantidad || "No especificado"}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Incluir Presente
                      </h4>
                      <p className="mt-1 text-sm text-gray-900 capitalize">
                        {selectedCustomOrder.incluirPresente ||
                          "No especificado"}
                      </p>
                    </div>

                    {selectedCustomOrder.incluirPresente === "si" && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Tipo de Presente
                        </h4>
                        <p className="mt-1 text-sm text-gray-900 capitalize">
                          {selectedCustomOrder.tipoPresente ||
                            "No especificado"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Información adicional */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Incluir Base
                      </h4>
                      <p className="mt-1 text-sm text-gray-900 capitalize">
                        {selectedCustomOrder.incluirBase || "No especificado"}
                      </p>
                    </div>

                    {selectedCustomOrder.incluirBase === "si" && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Tipo de Base
                        </h4>
                        <p className="mt-1 text-sm text-gray-900 capitalize">
                          {selectedCustomOrder.tipoBase || "No especificado"}
                        </p>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Estado
                      </h4>
                      <p className="mt-1 text-sm text-gray-900 capitalize">
                        {selectedCustomOrder.estado || "Pendiente"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Imagen de referencia */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Imagen de Referencia
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 flex justify-center">
                    {selectedCustomOrder.fotoReferenciaURL ? (
                      <img
                        src={selectedCustomOrder.fotoReferenciaURL}
                        alt="Referencia del pedido personalizado"
                        className="max-h-64 rounded-md object-contain"
                      />
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        No hay imagen de referencia
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowCustomModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
