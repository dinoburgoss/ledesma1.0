import React from 'react';

const horarios = {
  lunes: { abierto: false },
  martes: { abierto: true, desde: 19, hasta: 23 },
  miercoles: { abierto: true, desde: 19, hasta: 23 },
  jueves: { abierto: true, desde: 19, hasta: 23 },
  viernes: { abierto: true, desde: 19, hasta: 1 },
  sabado: { abierto: true, desde: 12, hasta: 1 },
  domingo: { abierto: true, desde: 12, hasta: 23 },
};

const diasSemana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

const EstadoLocal = () => {
  const ahora = new Date();
  const dia = diasSemana[ahora.getDay()];
  const hora = ahora.getHours();

  const horarioHoy = horarios[dia];

  let mensaje = '🔴 Cerrado por el momento';
  let color = 'red';

  if (horarioHoy.abierto) {
    let desde = horarioHoy.desde;
    let hasta = horarioHoy.hasta;

    if (hasta <= desde && (hora >= desde || hora < hasta)) {
      mensaje = '🟢 ¡Estamos abiertos!';
      color = 'limegreen';
    } else if (hora >= desde && hora < hasta) {
      mensaje = '🟢 ¡Estamos abiertos!';
      color = 'limegreen';
    }
  }

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold', color }}>{mensaje}</div>
      <div
        style={{
          fontSize: '14px',
          color: '#aaa',
          marginTop: '5px',
          padding: '0 10px',
          lineHeight: '1.5',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          wordWrap: 'break-word'
        }}
      >
        Horarios de atención:<br />
        Mar a Jue de 19 a 23 hs · Vie y Sáb de 19 a 01 hs<br />
        Dom de 12 a 23 hs
      </div>
    </div>
  );
};

export default EstadoLocal;
