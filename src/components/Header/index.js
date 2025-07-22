import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';

import { Nav } from './styled';

export default function Header() {
  const botaoClicado = useSelector((state) => state.botaoLoginClicado.botaoLoginClicado);

  return (
    <Nav>
      <Link to='/' className=''>
        <FaHome size={20} />
      </Link>
      <Link to='/user' className=''>
        <FaUserAlt size={20} />
      </Link>
      <Link to='/login' className=''>
        <FaSignInAlt size={20} />
      </Link>
      {botaoClicado ? (
        <span className='botao-ativo' style={{ color: 'white' }}>
          Botão Ativo
        </span>
      ) : (
        <span className='botao-inativo' style={{ color: 'white' }}>
          Botão Inativo
        </span>
      )}
    </Nav>
  );
}
