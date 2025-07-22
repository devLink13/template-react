import { createSlice } from '@reduxjs/toolkit';

// Exemplo de slice
const exampleSlice = createSlice({
  name: 'example', // nome do slice
  initialState: {
    clickCount: 0, // estado inicial
  },
  reducers: {
    // reducer que será chamado quando o botão for clicado
    buttonClicked: (state, action) => {
      console.log('🚀 Action disparada:', action.type);
      console.log('📦 Payload:', action.payload);
      console.log('🔢 Click anterior:', state.clickCount);

      state.clickCount += 1; // incrementa o contador

      console.log('🔢 Novo click count:', state.clickCount);
      console.log('--------------------');
    },
  },
});

// Exporta as actions
export const { buttonClicked } = exampleSlice.actions;
export default exampleSlice.reducer;
