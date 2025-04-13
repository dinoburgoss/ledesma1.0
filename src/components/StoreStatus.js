import React from 'react';

const horarios = {
  lunes: { abierto: true, desde: "10:00", hasta: "23:00" },
  martes: { abierto: true, desde: "10:00", hasta: "23:00" },
  miercoles: { abierto: true, desde: "10:00", hasta: "23:00" },
  jueves: { abierto: true, desde: "10:00", hasta: "23:00" },
  viernes: { abierto: true, desde: "10:00", hasta: "00:00" },
  sabado: { abierto: true, desde: "12:00", hasta: "00:00" },
  domingo: { abierto: false }
};

function estaAbiertoAhora() {
  const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const ahora = new Date();
  const dia = dias[ahora.getDay()];
  const horario = horarios[dia];

  if (!horario.abierto) return false;

  const horaActual = ahora.getHours() + ahora.getMinutes() / 60;
  const [horaDesde, minutoDesde] = horario.desde.split(':').map(Number);
  const [horaHasta, minutoHasta] = horario.hasta.split(':').map(Number);

  const desde = horaDesde + minutoDesde / 60;
  const hasta = horaHasta + minutoHasta / 60;

  return horaActual >= desde && horaActual <= hasta;
}

const StoreStatus = () => {
  const abierto = estaAbiertoAhora();

  return (
    <div style={{ 
      backgroundColor: abierto ? '#d4edda' : '#f8d7da', 
      color: abierto ? '#155724' : '#721c24',
      padding: '1rem',
      borderRadius: '5px',
      marginBottom: '1rem',
      fontWeight: 'bold'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        {abierto ? '🟢 El local está ABIERTO' : '🔴 El local está CERRADO'}
      </div>

      <div style={{ fontWeight: 'normal', color: '#333' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>🕒 Horarios de atención:</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Object.entries(horarios).map(([dia, datos]) => (
            <li key={dia}>
              <strong style={{ textTransform: 'capitalize' }}>{dia}:</strong>{' '}
              {datos.abierto ? `${datos.desde} a ${datos.hasta}` : 'Cerrado'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StoreStatus;
