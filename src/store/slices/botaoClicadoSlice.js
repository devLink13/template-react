import { createSlice } from '@reduxjs/toolkit';

// slice de clique do botão no componente Login
const botaoClicadoSlice = createSlice({
  name: 'botaoLoginClicado',
  initialState: {
    botaoLoginClicado: false,
    contadorCliques: 0,
    loading: false,
    error: null,
    dados: null,
  },
  reducers: {
    // ação que inicia a requisição
    iniciarRequisicao: (state) => {
      state.loading = true;
      state.error = null;
      console.log('Iniciando requisição...');
    },

    // Ação disparada quando a requisição tem sucesso
    botaoClicado: (state, action) => {
      console.log('Estado anterior do botão:', state.botaoLoginClicado);
      console.log('Contador de cliques anterior:', state.contadorCliques);

      state.botaoLoginClicado = !state.botaoLoginClicado;
      state.contadorCliques += 1;
      state.loading = false;
      state.error = null;
      state.dados = action.payload.dados;

      console.log('Estado atual do botão:', state.botaoLoginClicado);
      console.log('Contador de cliques:', state.contadorCliques);
      console.log('Dados da API:', action.payload.dados);
      console.log('--------------------');
    },

    // ação disparada quando a requisição falha
    requisicaoFalhou: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.error('Erro na requisição:', action.payload);
    },
  },
});

// Exporta as actions
export const { botaoClicado, iniciarRequisicao, requisicaoFalhou } = botaoClicadoSlice.actions;
export default botaoClicadoSlice.reducer;
