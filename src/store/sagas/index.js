import { all, fork } from 'redux-saga/effects';
import watchBotaoClick from './botaoSaga';

// Root saga que combina todos os sagas
export default function* rootSaga() {
  yield all([
    fork(watchBotaoClick),
    // Adicione outros sagas aqui conforme necessário
  ]);
}
