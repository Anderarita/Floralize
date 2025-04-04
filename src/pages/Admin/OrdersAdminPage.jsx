import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const API_URL = "https://localhost:7227/api/pedido"; // URL de la API de pedidos
const API_URL2 = "https://localhost:7227/api/Detalle/"; // URL de la API de detalles de pedidos

export const OrdersAdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        
        const [pedidosResponse, detallesResponse] = await Promise.all([
          axios.get(API_URL),
          axios.get(API_URL2)
        ]);

        if (pedidosResponse.data.status && detallesResponse.data.status) {
          const pedidos = pedidosResponse.data.data;
          const detalles = detallesResponse.data.data;

          // Combinar pedidos con detalles usando el pedidoId
          const pedidosCompletos = pedidos.map((pedido) => {
            const detallesPedido = detalles.filter(detalle => detalle.pedidoId === pedido.id);
            return { ...pedido, detalles: detallesPedido };
          });

          setOrders(pedidosCompletos);
        } else {
          setError("No se pudieron obtener los pedidos o detalles");
        }
      } catch (error) {
        setError("Error al cargar los pedidos");
      } finally {
        setLoading(false);
      }
      console.log(orders);
      console.log(error);
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Lista de Pedidos</h2>

          {loading ? (
            <p>Cargando pedidos...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : orders.length === 0 ? (
            <p>No hay detalles de pedidos disponibles</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Pedido ID</th>
                  <th className="border border-gray-300 px-4 py-2">Nombre Usuario</th>
                  <th className="border border-gray-300 px-4 py-2">Fecha de Pedido</th>  
                  <th className="border border-gray-300 px-4 py-2">Estado</th>
                  <th className="border border-gray-300 px-4 py-2">Detalles</th>
                  <th className="border border-gray-300 px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="text-center">
                    {order.detalles.map((detalle) => (
                        <td key={detalle.id} className="border border-gray-300 px-4 py-2">{detalle.productoNombre}</td>
                    ))}
                    <td className="border border-gray-300 px-4 py-2">{order.clienteNombre}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(order.fechaPedido).toLocaleString()}</td>
                    <td className="border border-gray-300 px-4 py-2">{order.estado}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.detalles.length > 0 ? (
                        <ul className="pl-4">
                          {order.detalles.map((detalle) => (
                            <li key={detalle.id}>
                              {detalle.productoNombre} - {detalle.cantidad} x {detalle.precioUnitario} LPS
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "Sin productos"
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.detalles.reduce((total, detalle) => total + detalle.total, 0)} LPS
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
