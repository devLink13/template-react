// configurar o redux-persist

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// configfuração do persist
const persistConfig = {
  key: 'root',
  storage,
  /**
   * na whitelist colocamos os estados que queremos persistir,
   * ou seja, que queremos salvar no localStorage, devemos colocar no array o nome
   * dos reducers criados em src/store/index.js no combineReducers
   *
   * ou seja, na whitelist colocamos os nomes dos slices registrados no combineReducers
   */
  whitelist: ['botaoLoginClicado', 'example'], // apenas o estado do botão de login será persistido
  // blacklist: [], // o estado do exemplo não será persistido
};

// Função para criar reducer persistido
export const createPersistedReducer = (rootReducer) => {
  return persistReducer(persistConfig, rootReducer);
};

export default persistConfig;
