import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useState } from "react";

// Función para crear datos de la tabla
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// Datos de ejemplo para la tabla
const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
  createData("Gingerbread", 356, 16.0),
];

export const InventoryAdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar con ancho fijo */}
      {/* <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      > */}
      <Sidebar
      // isOpen={isSidebarOpen}
      // toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col">
        {/* Header ajustado */}
        <Header />

        {/* Contenido */}
        <div className="p-4">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-2xl font-bold text-[#8e44ad] text-center">
              Productos en existencia
            </h1>
          </div>

          {/* Tabla de Productos en existencia */}
          <TableContainer component={Paper} className="shadow-lg mb-8">
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="tabla de productos"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center">Ubicación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="flex justify-center items-center mb-4">
            <h1 className="text-2xl font-bold text-[#8e44ad] text-center">
              Productos recién añadidos
            </h1>
          </div>

          {/* Tabla de Productos recién añadidos */}
          <TableContainer component={Paper} className="shadow-lg">
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="productos añadidos"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Ubicación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};
