/**
 * MyRoute Component
 * é uma rota personalizada que verifica se o usuário está logado
 * e redireciona para a página de login se necessário.
 *
 * Se a página não for fechada (isClosed=false), o componente renderiza o elemento passado.
 * Se a página for fechada (isClosed=true) e o usuário não estiver logado,
 * ele redireciona para a página de login, mantendo o caminho anterior na localização.
 */

import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MyRoute({ element, isClosed }) {
  const isLoggedIn = false; // estará presente dentro do estado do redux
  const location = useLocation();

  if (isClosed && !isLoggedIn) {
    return (
      <Navigate
        to='/login'
        state={{
          prevPath: location.pathname,
        }}
        replace
      />
    );
  }

  return element;
}

// valor padrão da props isClosed
MyRoute.defaultProps = {
  isClosed: false,
};

MyRoute.propTypes = {
  element: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isClosed: PropTypes.bool,
};
