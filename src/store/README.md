# 🗄️ Store (Redux)

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Arquitetura Redux](#-arquitetura-redux)
3. [Estrutura da Store](#-estrutura-da-store)
4. [Redux Slices](#-redux-slices)
5. [Redux Saga](#-redux-saga)
6. [Redux Persist](#-redux-persist)
7. [Como Usar o Redux](#-como-usar-o-redux)
8. [Debugging e DevTools](#-debugging-e-devtools)

---

## 🎯 Visão Geral

A pasta `store` contém toda a **arquitetura de gerenciamento de estado** da aplicação usando **Redux Toolkit**, **Redux Saga** e **Redux Persist**. Esta implementação oferece um estado global previsível, persistência automática e gerenciamento avançado de efeitos colaterais.

### Tecnologias Utilizadas:

- 🛠️ **Redux Toolkit**: Implementação moderna e simplificada do Redux
- ⚡ **Redux Saga**: Middleware para gerenciamento de efeitos colaterais
- 💾 **Redux Persist**: Persistência automática do estado no localStorage
- 🔧 **RTK**: Reducers e actions simplificados com createSlice
- 🧪 **DevTools**: Integração completa com Redux DevTools

### Fluxo de Dados:

```
UI → Action → Saga (se async) → Reducer → State → UI
```

---

## 🏗️ Arquitetura Redux

### Estrutura Organizacional:

```
store/
├── index.js              # Configuração principal da store
├── reduxPersist/         # Configuração de persistência
│   └── index.js
├── sagas/                # Redux Saga para efeitos colaterais
│   ├── index.js          # Root saga
│   └── botaoSaga.js      # Saga específica
└── slices/               # Redux Toolkit slices
    ├── exampleSlice.js   # Slice de exemplo
    └── botaoClicadoSlice.js
```

### Fluxo Arquitetural:

```
1. Component dispatch action
2. Saga intercepts action (if configured)
3. Saga performs side effects (API calls, etc.)
4. Saga dispatches success/error actions
5. Reducer updates state
6. Component re-renders with new state
7. Redux Persist saves state to localStorage
```

### Princípios Seguidos:

- **Single Source of Truth**: Todo estado da aplicação em uma store
- **State is Read-Only**: Apenas actions podem modificar o estado
- **Pure Functions**: Reducers são funções puras
- **Immutability**: Estado sempre imutável (Immer integrado)
  
---

## 🗂️ Estrutura da Store

### Arquivo Principal: `src/store/index.js`

#### Configuração Completa:

```javascript
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { createPersistedReducer } from './reduxPersist';

// Importa reducers dos slices
import exampleReducer from './slices/exampleSlice';
import botaoClicadoReducer from './slices/botaoClicadoSlice';
import rootSaga from './sagas';

// 1. Cria middleware do Saga
const sagaMiddleware = createSagaMiddleware();

// 2. Combina todos os reducers
const rootReducer = combineReducers({
  example: exampleReducer,
  botaoLoginClicado: botaoClicadoReducer,
  // Adicione novos reducers aqui
});

// 3. Cria reducer persistido
const persistedReducer = createPersistedReducer(rootReducer);

// 4. Configura a store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Desabilita thunk (usando saga)
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware),
});

// 5. Executa o root saga
sagaMiddleware.run(rootSaga);

// 6. Cria persistor para gerenciar persistência
export const persistor = persistStore(store);

export default store;
```

### Estado Global Estrutura:

```javascript
// Estrutura do estado global
{
  example: {
    clickCount: 0
  },
  botaoLoginClicado: {
    botaoLoginClicado: false,
    contadorCliques: 0,
    loading: false,
    error: null,
    dados: null
  },
  _persist: {
    version: -1,
    rehydrated: true
  }
}
```

---

## 🔧 Redux Slices

Os slices são a forma moderna de definir reducers e actions no Redux Toolkit. Cada slice representa uma parte específica do estado.

### 1. Example Slice (`exampleSlice.js`):

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
      console.log('🚀 Action disparada:', action.type);
      console.log('📦 Payload:', action.payload);
      console.log('🔢 Click anterior:', state.clickCount);

      state.clickCount += 1; // Immer permite mutação "direta"

      console.log('🔢 Novo click count:', state.clickCount);
    },
  },
});

export const { buttonClicked } = exampleSlice.actions;
export default exampleSlice.reducer;
```

#### Características:

- **Estado Inicial**: Define valores padrão
- **Reducers**: Funções que modificam o estado
- **Actions**: Criadas automaticamente
- **Immer Integration**: Permite código "mutável" que é imutável por baixo
- **TypeScript Ready**: Tipos automáticos (quando usando TS)

### 2. Botão Clicado Slice (`botaoClicadoSlice.js`):

#### Implementação Completa:

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
    // Action que inicia requisição (interceptada por saga)
    iniciarRequisicao: (state, action) => {
      state.loading = true;
      state.error = null;
      console.log('🚀 Iniciando requisição:', action.payload);
    },

    // Actions de resultado (disparadas por sagas)
    requisicaoSucesso: (state, action) => {
      state.loading = false;
      state.botaoLoginClicado = true;
      state.contadorCliques += 1;
      state.dados = action.payload;
      state.error = null;
    },

    requisicaoErro: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Ações locais (não interceptadas por saga)
    resetarEstado: (state) => {
      state.botaoLoginClicado = false;
      state.contadorCliques = 0;
      state.loading = false;
      state.error = null;
      state.dados = null;
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

#### Padrões de Estado:

- **Loading States**: `loading`, `error`, `success`
- **Data States**: `data`, `items`, `currentItem`
- **UI States**: `isOpen`, `selectedId`, `activeTab`
- **User States**: `user`, `isLoggedIn`, `permissions`

---

## ⚡ Redux Saga

Redux Saga é um middleware que gerencia efeitos colaterais (API calls, navegação, etc.) usando generators.

### Root Saga (`sagas/index.js`):

```javascript
import { all, fork } from 'redux-saga/effects';
import watchBotaoClick from './botaoSaga';

export default function* rootSaga() {
  yield all([
    fork(watchBotaoClick),
    // Adicione outros watchers aqui
    // fork(watchUserActions),
    // fork(watchApiActions),
  ]);
}
```

### Botão Saga (`sagas/botaoSaga.js`):

#### Implementação Completa:

```javascript
import { takeEvery, put, call, delay, select } from 'redux-saga/effects';
import { iniciarRequisicao, requisicaoSucesso, requisicaoErro } from '../slices/botaoClicadoSlice';
import api from '../../services/axios';

// Worker saga - executa a lógica
function* handleBotaoClick(action) {
  try {
    console.log('🔄 Saga: Processando clique do botão');
    console.log('📦 Payload recebido:', action.payload);

    // Simula delay de requisição
    yield delay(2000);

    // Exemplo de chamada de API (descomente quando tiver endpoint)
    // const response = yield call(api.post, '/api/button-click', action.payload);

    // Simula resposta da API
    const simulatedResponse = {
      success: true,
      message: 'Botão processado com sucesso!',
      timestamp: new Date().toISOString(),
      data: action.payload,
    };

    // Acessa estado atual (exemplo)
    const currentState = yield select((state) => state.botaoLoginClicado);
    console.log('📊 Estado atual:', currentState);

    // Dispara action de sucesso
    yield put(requisicaoSucesso(simulatedResponse));

    console.log('✅ Saga: Requisição processada com sucesso');
  } catch (error) {
    console.error('❌ Saga: Erro na requisição:', error);

    // Dispara action de erro
    yield put(requisicaoErro(error.message));
  }
}

// Watcher saga - monitora actions
function* watchBotaoClick() {
  console.log('👀 Saga: Monitorando cliques do botão');
  yield takeEvery(iniciarRequisicao.type, handleBotaoClick);
}

export default watchBotaoClick;
```

#### Efeitos do Saga:

- **`call`**: Executa funções (API calls, etc.)
- **`put`**: Dispara actions
- **`take`**: Aguarda por actions específicas
- **`takeEvery`**: Monitora todas as ocorrências de uma action
- **`takeLatest`**: Cancela requests anteriores e processa só o último
- **`select`**: Acessa o estado atual
- **`fork`**: Executa tarefas em paralelo
- **`delay`**: Adiciona delays

### Exemplo de Saga para API Real:

```javascript
function* loginSaga(action) {
  try {
    yield put(setLoading(true));

    // Chama API de login
    const response = yield call(api.post, '/auth/login', action.payload);

    // Armazena token
    yield call(setTokenToStorage, response.data.token);

    // Atualiza estado
    yield put(loginSuccess(response.data.user));

    // Navega para dashboard
    yield put(navigate('/dashboard'));

    // Mostra toast de sucesso
    yield call(showToast, 'Login realizado com sucesso!');
  } catch (error) {
    yield put(loginError(error.response?.data?.message || 'Erro no login'));
    yield call(showToast, 'Erro ao fazer login', 'error');
  } finally {
    yield put(setLoading(false));
  }
}
```

---

## 💾 Redux Persist

Redux Persist mantém o estado da aplicação persistido no localStorage automaticamente.

### Configuração (`reduxPersist/index.js`):

```javascript
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage

const persistConfig = {
  key: 'root',
  storage,
  // Whitelist - apenas estes serão persistidos
  whitelist: ['botaoLoginClicado', 'user', 'settings'],

  // Blacklist - estes NÃO serão persistidos
  // blacklist: ['example', 'temporaryData'],

  version: 1,
  migrate: (state) => {
    // Migração de versões se necessário
    return Promise.resolve(state);
  },
};

export const createPersistedReducer = (rootReducer) => {
  return persistReducer(persistConfig, rootReducer);
};
```

#### Configurações de Persistência:

- **`key`**: Chave no localStorage
- **`storage`**: Tipo de armazenamento (localStorage, sessionStorage, etc.)
- **`whitelist`**: Estados que SERÃO persistidos
- **`blacklist`**: Estados que NÃO serão persistidos
- **`version`**: Versão para migrações
- **`migrate`**: Função para migrar entre versões

### Estados que Devem ser Persistidos:

- ✅ **User data**: Informações do usuário logado
- ✅ **Auth tokens**: Tokens de autenticação
- ✅ **User preferences**: Configurações do usuário
- ✅ **Shopping cart**: Carrinho de compras
- ✅ **Form drafts**: Rascunhos de formulários

### Estados que NÃO Devem ser Persistidos:

- ❌ **Loading states**: Estados temporários de carregamento
- ❌ **Error messages**: Mensagens de erro temporárias
- ❌ **UI states**: Estados temporários da interface
- ❌ **Sensitive data**: Dados sensíveis que expiram

---

## 🚀 Como Usar o Redux

### 1. **Em Componentes React**:

#### Acessando Estado:

```javascript
import { useSelector } from 'react-redux';

export default function MeuComponente() {
  // Seleciona estado específico
  const clickCount = useSelector((state) => state.example.clickCount);

  // Seleciona múltiplos estados
  const { loading, error, dados } = useSelector((state) => state.botaoLoginClicado);

  // Seletor com lógica
  const isButtonActive = useSelector(
    (state) => state.botaoLoginClicado.botaoLoginClicado && !state.botaoLoginClicado.loading
  );

  return (
    <div>
      <p>Clicks: {clickCount}</p>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
    </div>
  );
}
```

#### Disparando Actions:

```javascript
import { useDispatch } from 'react-redux';
import { buttonClicked } from '../store/slices/exampleSlice';
import { iniciarRequisicao } from '../store/slices/botaoClicadoSlice';

export default function MeuComponente() {
  const dispatch = useDispatch();

  const handleSimpleClick = () => {
    // Action síncrona simples
    dispatch(buttonClicked());
  };

  const handleAsyncClick = () => {
    // Action que será interceptada por saga
    dispatch(
      iniciarRequisicao({
        timestamp: new Date().toISOString(),
        buttonId: 'myButton',
        extra: 'dados extras',
      })
    );
  };

  const handleComplexAction = () => {
    // Múltiplas actions
    dispatch(buttonClicked());
    dispatch(iniciarRequisicao({ id: 'complex' }));
  };

  return (
    <div>
      <button onClick={handleSimpleClick}>Click Simple</button>
      <button onClick={handleAsyncClick}>Click Async (Saga)</button>
    </div>
  );
}
```

### 2. **Padrões de Loading**:

```javascript
export default function DataComponent() {
  const { data, loading, error } = useSelector((state) => state.myData);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!data) {
    return <EmptyState />;
  }

  return <DataDisplay data={data} />;
}
```

### 3. **Custom Hooks para Redux**:

```javascript
// hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/slices/authSlice';

export function useAuth() {
  const { user, isLoggedIn, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = (credentials) => {
    dispatch(login(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isLoggedIn,
    loading,
    login: handleLogin,
    logout: handleLogout,
  };
}

// Uso no componente
export default function MyComponent() {
  const { user, isLoggedIn, login, logout } = useAuth();

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Bem-vindo, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login({ email: 'test', password: 'test' })}>Login</button>
      )}
    </div>
  );
}
```

---

## 🐛 Debugging e DevTools

### Redux DevTools:

```javascript
// Configuração automática no configureStore
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  // DevTools habilitado automaticamente em desenvolvimento
});
```

### Como Usar DevTools:

1. **Instalar extensão**: Redux DevTools no navegador
2. **Time Travel**: Voltar e avançar entre actions
3. **State Inspector**: Visualizar estado completo
4. **Action Logger**: Ver todas as actions disparadas
5. **Performance**: Monitorar performance dos reducers

### Logging em Desenvolvimento:

```javascript
// Em slices
reducers: {
  myAction: (state, action) => {
    if (process.env.NODE_ENV === 'development') {
      console.group('🔧 Redux Action:', action.type);
      console.log('Previous State:', current(state));
      console.log('Action Payload:', action.payload);
    }

    // lógica do reducer

    if (process.env.NODE_ENV === 'development') {
      console.log('New State:', current(state));
      console.groupEnd();
    }
  };
}
```

### Middleware de Logging:

```javascript
const loggerMiddleware = (store) => (next) => (action) => {
  console.group(`Action: ${action.type}`);
  console.log('Dispatching:', action);
  console.log('Current State:', store.getState());

  const result = next(action);

  console.log('Next State:', store.getState());
  console.groupEnd();

  return result;
};

// Adicionar à store em desenvolvimento
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware().concat(sagaMiddleware);

    if (process.env.NODE_ENV === 'development') {
      middlewares.push(loggerMiddleware);
    }

    return middlewares;
  },
});
```

---

## 📚 Exemplos Avançados

### 1. **Slice Completo de CRUD**:

```javascript
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    currentUser: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
  },
  reducers: {
    // Loading states
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Users list
    setUsers: (state, action) => {
      state.items = action.payload.users;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },

    // Single user
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    // CRUD operations
    addUser: (state, action) => {
      state.items.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.items.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeUser: (state, action) => {
      state.items = state.items.filter((user) => user.id !== action.payload);
    },

    // Pagination
    changePage: (state, action) => {
      state.pagination.page = action.payload;
    },
  },
});
```

### 2. **Saga Complexo com Fork**:

```javascript
function* handleUserOperations() {
  yield fork(watchUserCreate);
  yield fork(watchUserUpdate);
  yield fork(watchUserDelete);
  yield fork(watchUserFetch);
}

function* fetchUsersSaga(action) {
  try {
    yield put(setLoading(true));

    // Parallel API calls
    const [users, permissions] = yield all([
      call(api.get, '/users', { params: action.payload }),
      call(api.get, '/users/permissions'),
    ]);

    yield put(setUsers(users.data));
    yield put(setPermissions(permissions.data));
  } catch (error) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}
```

---

## 📋 Best Practices

### ✅ Faça:

- **Normalize State**: Use estruturas normalizadas para listas
- **Keep State Minimal**: Apenas dados essenciais no estado
- **Use Selectors**: Crie seletores reutilizáveis
- **Handle Loading/Error**: Sempre implemente estados de loading e erro
- **Use TypeScript**: Para type safety (quando aplicável)
- **Test Your State**: Escreva testes para reducers e sagas

### ❌ Evite:

- **Mutate State Directly**: Fora dos reducers
- **Put Everything in Redux**: Use estado local quando apropriado
- **Complex Nesting**: Mantenha estruturas simples
- **Sync All Side Effects**: Use sagas apenas quando necessário
- **Ignore DevTools**: Sempre use em desenvolvimento

---

**🗄️ O Redux é o coração do gerenciamento de estado da aplicação. Mantenha-o organizado, bem estruturado e sempre considere a performance e manutenibilidade do código.**
