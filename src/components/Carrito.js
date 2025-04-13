import React, { useContext } from 'react';
import { PedidoContext } from '../context/PedidoContext';
import './Carrito.css';

const COSTO_DELIVERY = 500;

const Carrito = () => {
  const {
    carrito,
    setCarrito,
    metodoPago
  } = useContext(PedidoContext);

  const aumentarCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad += 1;
    setCarrito(nuevoCarrito);
  };

  const disminuirCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    if (nuevoCarrito[index].cantidad > 1) {
      nuevoCarrito[index].cantidad -= 1;
      setCarrito(nuevoCarrito);
    }
  };

  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  const calcularTotal = () => {
    const subtotal = carrito.reduce(
      (total, item) =>
        total +
        item.cantidad * (item.precio + (item.extras?.reduce((acc, extra) => acc + extra.precio, 0) || 0)),
      0
    );
    const costoDelivery = metodoPago === 'Delivery' ? COSTO_DELIVERY : 0;
    return subtotal + costoDelivery;
  };

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">🛒 Tu Pedido</h2>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          {carrito.map((item, index) => (
            <div className="carrito-item" key={index}>
              <div className="carrito-nombre">{item.nombre}</div>

              {item.extras?.length > 0 && (
                <div className="carrito-extras">
                  <p>Extras:</p>
                  <ul>
                    {item.extras.map((extra, i) => (
                      <li key={i}>
                        {extra.nombre} (+${extra.precio})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="carrito-controles">
                <button className="carrito-boton" onClick={() => disminuirCantidad(index)}>-</button>
                <span className="carrito-cantidad">{item.cantidad}</span>
                <button className="carrito-boton" onClick={() => aumentarCantidad(index)}>+</button>
              </div>

              <div className="carrito-precio">
                ${(
                  (item.precio + (item.extras?.reduce((acc, e) => acc + e.precio, 0) || 0))
                  * item.cantidad
                ).toLocaleString()}
              </div>

              <button className="carrito-eliminar" onClick={() => eliminarProducto(index)}>
                🗑️
              </button>
            </div>
          ))}

          {metodoPago === 'Delivery' && (
            <div className="carrito-envio">
              Envío (Delivery): ${COSTO_DELIVERY.toLocaleString()}
            </div>
          )}

          <div className="carrito-total">
            Total: ${calcularTotal().toLocaleString()}
          </div>

          <div className="carrito-botones-finales">
            <button className="carrito-accion vaciar" onClick={() => setCarrito([])}>
              🗑️ Vaciar carrito
            </button>
          </div>
        </>
      )}

      <footer>
        © {new Date().getFullYear()} Todos los derechos reservados - Dino Burgos 2025
      </footer>
    </div>
  );
};

export default Carrito;
