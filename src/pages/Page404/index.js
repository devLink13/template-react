import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Title, SubTitle, TextBox, Button } from './styled';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Page404() {
  return (
    <Container>
      <Title
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'red',
        }}
      >
        <FaExclamationTriangle style={{ color: 'red', marginRight: '10px' }} />
        404
      </Title>
      <SubTitle>Desculpe, não conseguimos encontrar a página que você está procurando.</SubTitle>
      <TextBox>A página que você está procurando não existe.</TextBox>
      <Button>
        <Link
          to='/'
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'white',
          }}
        >
          <FaHome color='white' />
          <small>Voltar à página inicial</small>
        </Link>
      </Button>
    </Container>
  );
}
