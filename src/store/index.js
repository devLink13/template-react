import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { createPersistedReducer } from './reduxPersist'; // Importa a função para criar o reducer persistido

import exampleReducer from './slices/exampleSlice';
import botaoClicadoReducer from './slices/botaoClicadoSlice';
import rootSaga from './sagas';

// cria o middleware do saga que interceptará as ações
const sagaMiddleware = createSagaMiddleware();

// PRIMEIRO: Combine os reducers usando combineReducers
const rootReducer = combineReducers({
  example: exampleReducer,
  botaoLoginClicado: botaoClicadoReducer,
});

// DEPOIS: Cria o reducer persistido
const persistedReducer = createPersistedReducer(rootReducer);

// configura a store com o reducer persistido e o middleware do saga
const store = configureStore({
  reducer: persistedReducer, // usa o reducer persistido
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Desabilita thunk já que estamos usando saga
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignora ações do redux-persist
      },
    }).concat(sagaMiddleware), // adiciona o middleware do saga
});

// executa o rootSaga
sagaMiddleware.run(rootSaga);

// cria o persistor
export const persistor = persistStore(store);

// exporta a store configurada
export default store;
