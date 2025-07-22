import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Paragrafo, Title } from './styled';
import { Container } from '../../styles/GlobalStyles';

// importando as action do redux
import { iniciarRequisicao } from '../../store/slices/botaoClicadoSlice';
import { buttonClicked } from '../../store/slices/exampleSlice'; // Importando o exemplo

export default function Login() {
  // hook do Redux para despachar ações
  const dispatch = useDispatch();

  // seleciona os estados do redux
  const { botaoLoginClicado, contadorCliques, loading, error, dados } = useSelector(
    (state) => state.botaoLoginClicado
  );

  function handleClick(event) {
    event.preventDefault();

    // Agora disparamos a ação que inicia a requisição via Saga
    dispatch(
      iniciarRequisicao({
        timestamp: new Date().toISOString(),
        buttonId: 'loginButton',
      })
    );

    // Dispara a ação do exemploSlice
    dispatch(buttonClicked());
  }

  return (
    <Container>
      <Title isRed={true}>
        Login Page
        <br />
        <small>Faça seu login</small>
      </Title>
      <Paragrafo>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque deleniti veritatis quia
        cumque aperiam recusandae. Debitis eius quidem fugiat molestiae velit hic distinctio, quas
        maiores necessitatibus facilis obcaecati quaerat tempora.
      </Paragrafo>
      <button type='button' onClick={handleClick} disabled={loading}>
        {loading ? 'Carregando...' : 'Botao de teste'}
      </button>

      {/* Informações de estado para debug */}
      <div>
        <p>Botão clicado: {botaoLoginClicado ? 'Sim' : 'Não'}</p>
        <p>Contador de cliques: {contadorCliques}</p>
        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
        {dados && <p>Dados carregados: {dados.length} alunos</p>}
      </div>
    </Container>
  );
}
