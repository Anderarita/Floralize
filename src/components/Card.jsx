import React from "react";

const Card = ({ nombre, precio, imagenUrl, onClick }) => {
  return (
    <div
      className="rounded-3xl w-64 flex-col flex items-center justify-center bg-gray-300"
      onClick={onClick}
      >
      <img
        src={imagenUrl}
        className="rounded-1xl"
        onError={(e) => (e.target.src = "/placeholder.jpg")}
      />
      <p className="mt-2 text-lg font-semibold text-gray-800 w-full text-center p-2 rounded-md">Nombre: {nombre}</p>
      <p className="text-lg font-semibold text-gray-800">Precio: {precio}L.</p>
    </div>
  );
};

export default Card;
