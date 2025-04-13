import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import './RedesSociales.css';

const RedesSociales = () => {
  return (
    <div className="redes-sociales">
      <a
        href="https://www.facebook.com/tu_pagina"
        target="_blank"
        rel="noopener noreferrer"
        className="red-social-link facebook"
      >
        <FaFacebook style={{ marginRight: '8px' }} />
        Facebook
      </a>
      <a
        href="https://www.instagram.com/tu_perfil"
        target="_blank"
        rel="noopener noreferrer"
        className="red-social-link instagram"
      >
        <FaInstagram style={{ marginRight: '8px' }} />
        Instagram
      </a>
    </div>
  );
};

export default RedesSociales;
