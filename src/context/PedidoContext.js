import React, { createContext, useState, useEffect } from 'react';

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [metodoPago, setMetodoPago] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ubicacion, setUbicacion] = useState(null);
  const [nombreCliente, setNombreCliente] = useState('');
  const [tipoEntrega, setTipoEntrega] = useState('Retiro'); // <--- Agregado

  // Cargar desde localStorage
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    const direccionGuardada = localStorage.getItem('direccion');
    const metodoPagoGuardado = localStorage.getItem('metodoPago');
    const nombreClienteGuardado = localStorage.getItem('nombreCliente');
    const tipoEntregaGuardado = localStorage.getItem('tipoEntrega'); // <--- Agregado

    if (carritoGuardado) setCarrito(JSON.parse(carritoGuardado));
    if (direccionGuardada) setDireccion(direccionGuardada);
    if (metodoPagoGuardado) setMetodoPago(metodoPagoGuardado);
    if (nombreClienteGuardado) setNombreCliente(nombreClienteGuardado);
    if (tipoEntregaGuardado) setTipoEntrega(tipoEntregaGuardado); // <--- Agregado
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('direccion', direccion);
    localStorage.setItem('metodoPago', metodoPago);
    localStorage.setItem('nombreCliente', nombreCliente);
    localStorage.setItem('tipoEntrega', tipoEntrega); // <--- Agregado
  }, [carrito, direccion, metodoPago, nombreCliente, tipoEntrega]);

  const agregarAlCarrito = (producto) => {
    const existente = carrito.find(item => item.nombre === producto.nombre);
    if (existente) {
      const nuevoCarrito = carrito.map(item =>
        item.nombre === producto.nombre
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <PedidoContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarAlCarrito,
        vaciarCarrito,
        metodoPago,
        setMetodoPago,
        direccion,
        setDireccion,
        ubicacion,
        setUbicacion,
        nombreCliente,
        setNombreCliente,
        tipoEntrega,         // <--- Agregado
        setTipoEntrega       // <--- Agregado
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
