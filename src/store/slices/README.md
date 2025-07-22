# 🔧 Redux Slices

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Slices Implementados](#-slices-implementados)
3. [Anatomia de um Slice](#-anatomia-de-um-slice)
4. [Padrões de Estado](#-padrões-de-estado)
5. [Como Criar Novos Slices](#-como-criar-novos-slices)
6. [Best Practices](#-best-practices)

---

## 🎯 Visão Geral

Os **Redux Slices** são a forma moderna e simplificada de definir reducers e actions usando o **Redux Toolkit**. Cada slice representa uma fatia específica do estado global da aplicação, contendo tanto a lógica de estado quanto as actions relacionadas.

### Vantagens dos Slices:

- 🔧 **Simplicidade**: Reducers e actions definidos juntos
- 🛡️ **Imutabilidade**: Immer integrado permite código "mutável"
- ⚡ **Performance**: Otimizações automáticas
- 🎯 **Type Safety**: Suporte completo ao TypeScript
- 📦 **Bundle Size**: Código mais enxuto
- 🔄 **Auto-generated**: Actions criadas automaticamente

---

## 📂 Slices Implementados

### 1. 📊 Example Slice (`exampleSlice.js`)

#### Propósito:

Slice de **demonstração** que mostra a implementação básica de um contador de cliques.

#### Estado:

```javascript
{
  clickCount: 0; // Contador de cliques do botão
}
```

#### Actions:

- `buttonClicked()`: Incrementa o contador de cliques

#### Implementação:

```javascript
import { createSlice } from '@reduxjs/toolkit';

const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    clickCount: 0,
  },
  reducers: {
    buttonClicked: (state, action) => {
      // Logging para desenvolvimento
      console.log('🚀 Action disparada:', action.type);
      console.log('📦 Payload:', action.payload);
      console.log('🔢 Click anterior:', state.clickCount);

      // Increment usando Immer (parece mutação, mas é imutável)
      state.clickCount += 1;

      console.log('🔢 Novo click count:', state.clickCount);
      console.log('--------------------');
    },
  },
});

// Exporta actions (auto-geradas)
export const { buttonClicked } = exampleSlice.actions;

// Exporta reducer
export default exampleSlice.reducer;
```

#### Uso:

```javascript
// Em um componente
import { useSelector, useDispatch } from 'react-redux';
import { buttonClicked } from '../store/slices/exampleSlice';

export default function Counter() {
  const clickCount = useSelector((state) => state.example.clickCount);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Clicks: {clickCount}</p>
      <button onClick={() => dispatch(buttonClicked())}>Clique aqui</button>
    </div>
  );
}
```

### 2. 🔘 Botão Clicado Slice (`botaoClicadoSlice.js`)

#### Propósito:

Slice **complexo** que demonstra integração com Redux Saga, estados de loading, tratamento de erros e persistência de dados.

#### Estado:

```javascript
{
  botaoLoginClicado: false,    // Status do botão (usado pelo Header)
  contadorCliques: 0,          // Contador de cliques processados
  loading: false,              // Estado de carregamento
  error: null,                 // Mensagem de erro
  dados: null                  // Dados retornados da "API"
}
```

#### Actions:

- `iniciarRequisicao(payload)`: Inicia processo assíncrono via Saga
- `requisicaoSucesso(payload)`: Chamada quando saga completa com sucesso
- `requisicaoErro(error)`: Chamada quando saga falha
- `resetarEstado()`: Reseta o estado para valores iniciais
- `setBotaoClicado(boolean)`: Define diretamente o status do botão

#### Implementação Detalhada:

```javascript
import { createSlice } from '@reduxjs/toolkit';

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
    // Action interceptada por Saga
    iniciarRequisicao: (state, action) => {
      state.loading = true;
      state.error = null;
      console.log('🚀 Slice: Iniciando requisição com payload:', action.payload);
    },

    // Actions chamadas pelos Sagas
    requisicaoSucesso: (state, action) => {
      state.loading = false;
      state.botaoLoginClicado = true;
      state.contadorCliques += 1;
      state.dados = action.payload;
      state.error = null;
      console.log('✅ Slice: Requisição bem-sucedida');
    },

    requisicaoErro: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log('❌ Slice: Erro na requisição:', action.payload);
    },

    // Actions diretas (não interceptadas)
    resetarEstado: (state) => {
      return {
        botaoLoginClicado: false,
        contadorCliques: 0,
        loading: false,
        error: null,
        dados: null,
      };
    },

    setBotaoClicado: (state, action) => {
      state.botaoLoginClicado = action.payload;
    },
  },
});

export const {
  iniciarRequisicao,
  requisicaoSucesso,
  requisicaoErro,
  resetarEstado,
  setBotaoClicado,
} = botaoClicadoSlice.actions;

export default botaoClicadoSlice.reducer;
```

#### Integração com Saga:

```javascript
// A action `iniciarRequisicao` é interceptada pela saga
dispatch(
  iniciarRequisicao({
    timestamp: new Date().toISOString(),
    buttonId: 'loginButton',
  })
);

// Saga processa e dispara requisicaoSucesso ou requisicaoErro
```

---

## 🧬 Anatomia de um Slice

### Estrutura Base:

```javascript
import { createSlice } from '@reduxjs/toolkit';

const meuSlice = createSlice({
  // 1. Nome único do slice
  name: 'meuSlice',

  // 2. Estado inicial
  initialState: {
    data: null,
    loading: false,
    error: null,
  },

  // 3. Reducers (modificam o estado)
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },

  // 4. Extra reducers (para actions de outros slices)
  extraReducers: (builder) => {
    builder.addCase(outroSlice.actions.reset, (state) => {
      return initialState;
    });
  },
});

// Exportações obrigatórias
export const { setLoading, setData, setError } = meuSlice.actions;
export default meuSlice.reducer;
```

### Parâmetros da Action:

```javascript
reducers: {
  minhaAction: (state, action) => {
    // action.type - tipo da action (auto-gerado)
    // action.payload - dados enviados com a action
    // action.meta - metadados adicionais

    console.log('Type:', action.type);      // 'meuSlice/minhaAction'
    console.log('Payload:', action.payload); // dados enviados
  },
}

// Uso
dispatch(minhaAction({ id: 1, name: 'João' }));
```

---

## 📋 Padrões de Estado

### 1. **Padrão de Loading (Async)**:

```javascript
const asyncSlice = createSlice({
  name: 'async',
  initialState: {
    data: null,
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
```

### 2. **Padrão de Lista (CRUD)**:

```javascript
const listSlice = createSlice({
  name: 'list',
  initialState: {
    items: [],
    selectedId: null,
    filter: '',
    sortBy: 'name',
    sortOrder: 'asc',
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setSelected: (state, action) => {
      state.selectedId = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});
```

### 3. **Padrão de Formulário**:

```javascript
const formSlice = createSlice({
  name: 'form',
  initialState: {
    values: {},
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
  },
  reducers: {
    setFieldValue: (state, action) => {
      const { field, value } = action.payload;
      state.values[field] = value;
      state.touched[field] = true;
    },
    setFieldError: (state, action) => {
      const { field, error } = action.payload;
      state.errors[field] = error;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    resetForm: (state) => {
      return {
        values: {},
        errors: {},
        touched: {},
        isSubmitting: false,
        isValid: true,
      };
    },
  },
});
```

### 4. **Padrão de Autenticação**:

```javascript
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    loginLoading: false,
    permissions: [],
  },
  reducers: {
    loginStart: (state) => {
      state.loginLoading = true;
    },
    loginSuccess: (state, action) => {
      const { user, token, permissions } = action.payload;
      state.user = user;
      state.token = token;
      state.permissions = permissions;
      state.isLoggedIn = true;
      state.loginLoading = false;
    },
    loginError: (state) => {
      state.loginLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.permissions = [];
    },
  },
});
```

---

## 🚀 Como Criar Novos Slices

### Passo 1: Criar o Arquivo

```bash
# Navegue até a pasta slices
cd src/store/slices

# Crie o novo slice
touch meuNovoSlice.js
```

### Passo 2: Implementar o Slice

```javascript
// src/store/slices/meuNovoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const meuNovoSlice = createSlice({
  name: 'meuNovo',
  initialState: {
    // Defina seu estado inicial aqui
    data: [],
    loading: false,
    error: null,
    currentItem: null,
  },
  reducers: {
    // Suas actions aqui
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },

    // Adicione mais reducers conforme necessário
  },
});

// Exporta actions
export const { setLoading, setData, setError, setCurrentItem } = meuNovoSlice.actions;

// Exporta reducer
export default meuNovoSlice.reducer;
```

### Passo 3: Adicionar à Store

```javascript
// src/store/index.js
import meuNovoReducer from './slices/meuNovoSlice';

const rootReducer = combineReducers({
  example: exampleReducer,
  botaoLoginClicado: botaoClicadoReducer,
  meuNovo: meuNovoReducer, // Adicione aqui
});
```

### Passo 4: Usar no Componente

```javascript
// Em qualquer componente
import { useSelector, useDispatch } from 'react-redux';
import { setData, setLoading } from '../store/slices/meuNovoSlice';

export default function MeuComponente() {
  const { data, loading } = useSelector((state) => state.meuNovo);
  const dispatch = useDispatch();

  const handleAction = () => {
    dispatch(setLoading(true));
    // ... lógica
    dispatch(setData(newData));
  };

  return (
    <div>
      {loading ? 'Carregando...' : JSON.stringify(data)}
      <button onClick={handleAction}>Ação</button>
    </div>
  );
}
```

---

## 🧪 Testing Slices

### Teste de Reducer:

```javascript
// meuNovoSlice.test.js
import reducer, { setData, setLoading } from './meuNovoSlice';

describe('meuNovoSlice', () => {
  const initialState = {
    data: [],
    loading: false,
    error: null,
  };

  test('deve retornar estado inicial', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('deve definir loading', () => {
    const actual = reducer(initialState, setLoading(true));
    expect(actual.loading).toEqual(true);
  });

  test('deve definir dados', () => {
    const data = [{ id: 1, name: 'Test' }];
    const actual = reducer(initialState, setData(data));
    expect(actual.data).toEqual(data);
    expect(actual.loading).toEqual(false);
  });
});
```

### Teste de Integration:

```javascript
// integration.test.js
import { configureStore } from '@reduxjs/toolkit';
import meuNovoReducer, { setData } from './meuNovoSlice';

test('integração com store', () => {
  const store = configureStore({
    reducer: { meuNovo: meuNovoReducer },
  });

  const data = [{ id: 1, name: 'Test' }];
  store.dispatch(setData(data));

  const state = store.getState();
  expect(state.meuNovo.data).toEqual(data);
});
```

---

## 📚 Exemplos Avançados

### 1. **Slice com Normalize State**:

```javascript
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Entity adapter para listas normalizadas
const usersAdapter = createEntityAdapter({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {
    setUsers: usersAdapter.setAll,
    addUser: usersAdapter.addOne,
    updateUser: usersAdapter.updateOne,
    removeUser: usersAdapter.removeOne,
  },
});

// Seletores automáticos
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => state.users);
```

### 2. **Slice com Computações**:

```javascript
const shoppingCartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    discount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    applyDiscount: (state, action) => {
      state.discount = action.payload;
    },
  },
});

// Seletor computed
export const selectCartTotal = (state) => {
  const subtotal = state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  return subtotal * (1 - state.cart.discount / 100);
};
```

---

## 📋 Best Practices

### ✅ Faça:

- **Nome Descritivo**: Use nomes claros para slices e actions
- **Estado Normalizado**: Para listas, use estruturas normalizadas
- **Immer Usage**: Aproveite a mutabilidade aparente do Immer
- **Single Responsibility**: Cada slice deve ter uma responsabilidade clara
- **Consistent Naming**: Padronize nomenclatura de actions
- **Handle Edge Cases**: Considere todos os casos possíveis

### ❌ Evite:

- **Estado Complexo**: Evite nested objects muito profundos
- **Lógica de Negócio**: Não coloque lógica complexa nos reducers
- **Side Effects**: Reducers devem ser funções puras
- **Muitas Actions**: Não crie actions desnecessárias
- **Estado Duplicado**: Evite informações redundantes
- **Mutação Direta**: Fora dos reducers do RTK

### 🎯 Convenções de Nomenclatura:

```javascript
// Actions - verbos descritivos
(setData, updateUser, removeItem, resetState);

// Estado - substantivos
(data, users, items, currentUser, selectedId);

// Booleans - is/has/can
(isLoading, hasError, canEdit, isVisible);

// Loading states
(loading, fetchLoading, submitLoading);

// Error states
(error, validationErrors, fetchError);
```

---

**🔧 Os slices são os blocos de construção do seu estado Redux. Mantenha-os organizados, testados e focados em uma responsabilidade específica para facilitar a manutenção e escalabilidade.**
