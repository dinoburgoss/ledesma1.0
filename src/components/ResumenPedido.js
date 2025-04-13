import React, { useContext } from 'react';
import { PedidoContext } from '../context/PedidoContext';
import './ResumenPedido.css';

const ResumenPedido = () => {
  const {
    carrito,
    nombreCliente,
    direccion,
    metodoPago,
    tipoEntrega
  } = useContext(PedidoContext);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="resumen-container">
      <h3>🧾 Resumen del Pedido</h3>
      
      <p><strong>Cliente:</strong> {nombreCliente || 'No ingresado'}</p>
      <p><strong>Tipo de entrega:</strong> {tipoEntrega || 'No seleccionado'}</p>
      {tipoEntrega === 'Delivery' && (
        <p><strong>Dirección:</strong> {direccion || 'No ingresada'}</p>
      )}
      <p><strong>Método de pago:</strong> {metodoPago || 'No seleccionado'}</p>

      <hr />
      <ul>
        {carrito.map((item, index) => (
          <li key={index}>
            {item.cantidad} x {item.nombre} = ${item.precio * item.cantidad}
          </li>
        ))}
      </ul>
      <hr />
      <p><strong>Total:</strong> ${total}</p>
    </div>
  );
};

export default ResumenPedido;
