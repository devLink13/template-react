import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import { botaoClicado, requisicaoFalhou } from '../slices/botaoClicadoSlice';

// funcao saga que faz a rquisição
function* handleBotaoClick(action) {
  try {
    console.log('Saga: Botão clicado, iniciando requisição');

    // faz a requisição para a API
    const response = yield call(axios.get, '/alunos');
    console.log('Saga: Requisição bem-sucedida');

    // exibe um toast de sucesso
    toast.success('Requisição bem-sucedida!');

    // se a requisição for bem-sucedida, despacha a ação de sucesso
    yield put(
      botaoClicado({
        dados: response.data,
        timestamp: new Date().toISOString(),
        buttonId: action.payload.buttonId || 'loginButton',
      })
    );
  } catch (error) {
    console.log('Saga: Erro na requisição', error);
    // exibe um toast de erro
    toast.error('Erro na requisicao com a API');

    // se houver erro, despacha a ação de falha
    yield put(requisicaoFalhou(error.message));
  }
}

// saga watcher que escuta a ação de clique do botão
export default function* watchBotaoClick() {
  yield takeEvery('botaoLoginClicado/iniciarRequisicao', handleBotaoClick);
}
