import './App.css';
import React, { useEffect, useState } from 'react';
import { PedidoProvider } from './context/PedidoContext';
import Menu from './components/Menu';
import Carrito from './components/Carrito';
import FormularioPedido from './components/FormularioPedido';
import EstadoLocal from './components/EstadoLocal';

function App() {
  const [mostrarIconos, setMostrarIconos] = useState(true);
  const [ultimaPosicionScroll, setUltimaPosicionScroll] = useState(0);
  const [esEscritorio, setEsEscritorio] = useState(window.innerWidth > 768);

  useEffect(() => {
    const manejarScroll = () => {
      const posicionActual = window.scrollY;
      setMostrarIconos(posicionActual < ultimaPosicionScroll);
      setUltimaPosicionScroll(posicionActual);
    };

    const manejarResize = () => {
      setEsEscritorio(window.innerWidth > 768);
    };

    window.addEventListener('scroll', manejarScroll);
    window.addEventListener('resize', manejarResize);

    return () => {
      window.removeEventListener('scroll', manejarScroll);
      window.removeEventListener('resize', manejarResize);
    };
  }, [ultimaPosicionScroll]);

  return (
    <PedidoProvider>
      {/* ÍCONOS flotantes en escritorio */}
      {esEscritorio && (
        <div className={`iconos-flotantes ${mostrarIconos ? 'visible' : 'ocultos'}`}>
          <a href="tel:+540000000000" className="icono-red llamada" title="Llamar" aria-label="Llamar">
            <i className="fas fa-phone-alt"></i>
          </a>
          <a href="https://wa.me/540000000000" target="_blank" rel="noopener noreferrer" className="icono-red whatsapp" title="Enviar mensaje por WhatsApp" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="contenido-app">
        <h1 className="titulo-principal"></h1>

        <EstadoLocal />
        <Menu />
        <Carrito />
        <FormularioPedido />

        {/* REDES + Iconos móviles */}
        <div className="redes-sociales">
          <p>Síguenos en nuestras redes:</p>
          <div className="iconos-redes">
            <a href="https://www.facebook.com/tu_pagina" target="_blank" rel="noopener noreferrer" className="facebook" aria-label="Facebook">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="https://www.instagram.com/tu_pagina" target="_blank" rel="noopener noreferrer" className="instagram" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>

          {/* Íconos móviles */}
          {!esEscritorio && (
            <div className="iconos-moviles">
              <a href="tel:+540000000000" className="icono-red llamada" title="Llamar" aria-label="Llamar">
                <i className="fas fa-phone-alt"></i>
              </a>
              <a href="https://wa.me/540000000000" target="_blank" rel="noopener noreferrer" className="icono-red whatsapp" title="Enviar mensaje por WhatsApp" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          )}
        </div>
      </div>
    </PedidoProvider>
  );
}

export default App;
