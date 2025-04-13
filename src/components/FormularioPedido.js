import React, { useContext, useEffect, useState } from 'react';
import { PedidoContext } from '../context/PedidoContext';
import EnviarPedido from './EnviarPedido';
import './FormularioPedido.css';

const FormularioPedido = () => {
  const {
    metodoPago,
    setMetodoPago,
    direccion,
    setDireccion,
    setUbicacion,
    carrito,
    nombreCliente,
    setNombreCliente,
    ubicacion,
    tipoEntrega,
    setTipoEntrega
  } = useContext(PedidoContext);

  const [comentario, setComentario] = useState('');
  const [confirmado, setConfirmado] = useState(false);

  useEffect(() => {
    const nombreGuardado = localStorage.getItem('nombreCliente');
    const direccionGuardada = localStorage.getItem('direccion');
    const ubicacionGuardada = localStorage.getItem('ubicacion');
    const entregaGuardada = localStorage.getItem('tipoEntrega');

    if (nombreGuardado) setNombreCliente(nombreGuardado);
    if (direccionGuardada) setDireccion(direccionGuardada);
    if (ubicacionGuardada) setUbicacion(JSON.parse(ubicacionGuardada));
    if (entregaGuardada) setTipoEntrega(entregaGuardada);
  }, []);

  useEffect(() => {
    localStorage.setItem('nombreCliente', nombreCliente);
  }, [nombreCliente]);

  useEffect(() => {
    localStorage.setItem('direccion', direccion);
  }, [direccion]);

  useEffect(() => {
    if (ubicacion) {
      localStorage.setItem('ubicacion', JSON.stringify(ubicacion));
    }
  }, [ubicacion]);

  useEffect(() => {
    localStorage.setItem('tipoEntrega', tipoEntrega);
  }, [tipoEntrega]);

  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      alert('Geolocalización no es soportada por tu navegador');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUbicacion({ lat: latitude, lng: longitude });
        alert('Ubicación compartida correctamente');
      },
      (error) => {
        alert('Error al obtener la ubicación');
        console.error(error);
      }
    );
  };

  const calcularSubtotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const costoEnvio = tipoEntrega === 'Delivery' ? 500 : 0;
  const totalFinal = calcularSubtotal() + costoEnvio;

  if (carrito.length === 0) return null;

  return (
    <div className="formulario-container">
      <h3>Nombre y Apellido</h3>
      <input
        type="text"
        placeholder="Ej: Juan Pérez"
        value={nombreCliente}
        onChange={(e) => setNombreCliente(e.target.value)}
        className="formulario-input"
      />

      <h3>Tipo de entrega</h3>
      <select
        value={tipoEntrega}
        onChange={(e) => setTipoEntrega(e.target.value)}
        className="formulario-input"
      >
        <option value="">Seleccionar</option>
        <option value="Retiro">🚶 Retiro en local</option>
        <option value="Delivery">🛵 Envío a domicilio ($500)</option>
      </select>

      {tipoEntrega === 'Delivery' && (
        <>
          <h3>Dirección</h3>
          <input
            type="text"
            placeholder="Escribí tu dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="formulario-input"
          />

          <button
            onClick={obtenerUbicacion}
            className="formulario-boton formulario-boton-ubicacion"
          >
            📍 Compartir ubicación
          </button>

          {ubicacion && (
            <div style={{ marginTop: '10px', color: '#ccc' }}>
              <strong>Ubicación compartida:</strong>{' '}
              <a
                href={`https://www.google.com/maps?q=${ubicacion.lat},${ubicacion.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1abc9c' }}
              >
                Ver en Google Maps
              </a>
            </div>
          )}
        </>
      )}

      <h3 style={{ marginTop: '20px' }}>Método de pago</h3>
      <select
        value={metodoPago}
        onChange={(e) => setMetodoPago(e.target.value)}
        className="formulario-input"
      >
        <option value="">Seleccionar</option>
        <option value="Efectivo">Efectivo</option>
        <option value="Al retirar">Al retirar</option>
        <option value="Transferencia">Transferencia</option>
      </select>

      {metodoPago === 'Transferencia' && (
        <div
          style={{
            marginTop: '10px',
            background: '#222',
            padding: '10px',
            borderRadius: '8px',
            color: 'white'
          }}
        >
          <p><strong>CBU:</strong> 0000003100012345678901</p>
          <p><strong>Alias:</strong> burger.queen.mp</p>
          <p><strong>Titular:</strong> BURGER QUEEN SRL</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText('0000003100012345678901');
              alert('CBU copiado al portapapeles');
            }}
            className="formulario-boton formulario-boton-cbu"
          >
            📋 Copiar CBU
          </button>
        </div>
      )}

      <h3 style={{ marginTop: '20px' }}>🧾 Resumen del pedido</h3>
      <ul style={{ background: '#111', padding: '10px', borderRadius: '8px', color: '#eee' }}>
        {carrito.map((item, index) => (
          <li key={index} style={{ marginBottom: '5px' }}>
            {item.nombre} x{item.cantidad} = ${item.precio * item.cantidad}
          </li>
        ))}
        <li style={{ marginTop: '10px' }}>Subtotal: ${calcularSubtotal()}</li>
        {tipoEntrega === 'Delivery' && <li>Costo de envío: ${costoEnvio}</li>}
        <li style={{ marginTop: '10px', fontWeight: 'bold' }}>
          Total final: ${totalFinal}
        </li>
      </ul>



      {!confirmado ? (
        <button
          onClick={() => {
            const respuesta = window.confirm('¿Estás seguro de enviar el pedido?');
            if (respuesta) {
              setConfirmado(true);
            }
          }}
          className="formulario-boton"
        >
          ✅ Confirmar y enviar pedido
        </button>
      ) : (
        <EnviarPedido comentario={comentario} />
      )}

      <button
        onClick={() => {
          localStorage.removeItem('nombreCliente');
          localStorage.removeItem('direccion');
          localStorage.removeItem('ubicacion');
          localStorage.removeItem('tipoEntrega');
          setNombreCliente('');
          setDireccion('');
          setUbicacion(null);
          setTipoEntrega('');
          setComentario('');
          setConfirmado(false);
          alert('Datos del formulario eliminados.');
        }}
        className="formulario-boton formulario-boton-limpiar"
      >
        🗑️ Limpiar datos del formulario
      </button>

      <p style={{ textAlign: 'center', marginTop: '30px', color: '#999', fontSize: '14px' }}>
        Todos los derechos reservados Dino Burgos 2025
      </p>
    </div>
  );
};

export default FormularioPedido;
