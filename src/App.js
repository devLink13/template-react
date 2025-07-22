import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importa o BrowserRouter para gerenciar as rotas
import { ToastContainer } from 'react-toastify'; // Importa o ToastContainer para exibir notificações
import { Provider } from 'react-redux'; // Importa o Provider do Redux para conectar a store ao React
import { PersistGate } from 'redux-persist/integration/react'; //  Importa o PersistGate para lidar com a persistência do estado
import store, { persistor } from './store'; // Importa a store e o persistor configurados

// IMPPORTAÇÕES PRÓPRIAS
import GlobalStyles from './styles/GlobalStyles'; // Importa os estilos globais
import Header from './components/Header'; // Importa o componente Header
import AppRoutes from './routes'; // Importa as rotas da aplicação

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Carregando estado...</div>} persistor={persistor}>
        <BrowserRouter>
          <Header />
          <AppRoutes />
          <GlobalStyles />
          <ToastContainer autoClose={3000} className='toast-container' />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
