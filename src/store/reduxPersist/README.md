# 💾 Redux Persist

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Configuração Atual](#-configuração-atual)
3. [Como Funciona](#-como-funciona)
4. [Configurações Avançadas](#-configurações-avançadas)
5. [Estratégias de Persistência](#-estratégias-de-persistência)
6. [Migrações de Estado](#-migrações-de-estado)
7. [Debugging e Troubleshooting](#-debugging-e-troubleshooting)

---

## 🎯 Visão Geral

**Redux Persist** é uma biblioteca que automatiza a **persistência do estado Redux** no armazenamento local do navegador (localStorage, sessionStorage, etc.). Isso permite que o estado da aplicação seja mantido entre recarregamentos de página e sessões do usuário.

### Vantagens do Redux Persist:

- 💾 **Persistência Automática**: Estado salvo automaticamente
- 🔄 **Hydration**: Restauração automática do estado
- 🎛️ **Configuração Flexível**: Controle granular sobre o que persistir
- 🚀 **Performance**: Operações assíncronas não bloqueantes
- 🔒 **Segurança**: Opções de criptografia e transformações
- 📱 **Multi-Platform**: Funciona em web, React Native, etc.

### Casos de Uso Comuns:

- ✅ **Dados do usuário logado**
- ✅ **Configurações de preferências**
- ✅ **Carrinho de compras**
- ✅ **Progresso de formulários**
- ✅ **Estados de UI persistentes**
- ❌ **Estados de loading temporários**
- ❌ **Dados sensíveis que expiram**

---

## ⚙️ Configuração Atual

### Arquivo: `src/store/reduxPersist/index.js`

#### Implementação Base:

```javascript
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage

const persistConfig = {
  key: 'root',
  storage,
  // Configurações básicas - pode ser expandido conforme necessário
};

export const createPersistedReducer = (rootReducer) => {
  return persistReducer(persistConfig, rootReducer);
};
```

#### Integração na Store:

```javascript
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { createPersistedReducer } from './reduxPersist';

// 1. Combina reducers normalmente
const rootReducer = combineReducers({
  example: exampleReducer,
  botaoLoginClicado: botaoClicadoReducer,
});

// 2. Cria reducer persistido
const persistedReducer = createPersistedReducer(rootReducer);

// 3. Configura store com reducer persistido
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware),
});

// 4. Cria persistor
export const persistor = persistStore(store);
```

#### Integração no App:

```javascript
// src/App.js
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Carregando estado...</div>} persistor={persistor}>
        <BrowserRouter>{/* Resto da aplicação */}</BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
```

---

## 🔧 Como Funciona

### Fluxo de Persistência:

#### 1. **Primeira Inicialização**:

```
App Start → Store Creation → Initial State → No Persisted Data → Normal Flow
```

#### 2. **Estado Sendo Persistido**:

```
Redux Action → Reducer Updates State → Persist Middleware → localStorage Write
```

#### 3. **Rehydration (Restauração)**:

```
App Restart → Store Creation → Persist Read localStorage → Rehydrate State → App Ready
```

### Estados do Ciclo de Vida:

```javascript
// Estados durante hydration
{
  _persist: {
    version: -1,
    rehydrated: false  // Durante carregamento
  }
}

// Estado após hydration completa
{
  _persist: {
    version: -1,
    rehydrated: true   // Pronto para uso
  }
}
```

### PersistGate Behavior:

```javascript
<PersistGate
  loading={<LoadingComponent />} // Mostra enquanto rehydrata
  persistor={persistor}
>
  <App /> {/* Renderiza apenas após rehydration */}
</PersistGate>
```

---

## 🛠️ Configurações Avançadas

### 1. **Whitelist/Blacklist Strategy**:

```javascript
const persistConfig = {
  key: 'root',
  storage,

  // Whitelist - APENAS estes serão persistidos
  whitelist: ['auth', 'user', 'cart', 'settings'],

  // OU Blacklist - todos EXCETO estes serão persistidos
  // blacklist: ['loading', 'errors', 'ui'],
};
```

### 2. **Configuração por Slice**:

```javascript
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';

// Configurações específicas por reducer
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'permissions'], // Apenas estes campos
};

const uiPersistConfig = {
  key: 'ui',
  storage: sessionStorage, // Session storage para dados temporários
  whitelist: ['theme', 'sidebarOpen'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  ui: persistReducer(uiPersistConfig, uiReducer),
  api: apiReducer, // Não persistido
});

export const createPersistedReducer = () => rootReducer;
```

### 3. **Transformações de Dados**:

```javascript
import { createTransform } from 'redux-persist';

// Transform para criptografar dados sensíveis
const encryptTransform = createTransform(
  // Serialize (when persisting)
  (inboundState, key) => {
    if (key === 'auth' && inboundState.token) {
      return {
        ...inboundState,
        token: btoa(inboundState.token), // Codifica base64
      };
    }
    return inboundState;
  },
  // Deserialize (when rehydrating)
  (outboundState, key) => {
    if (key === 'auth' && outboundState.token) {
      return {
        ...outboundState,
        token: atob(outboundState.token), // Decodifica base64
      };
    }
    return outboundState;
  },
  { whitelist: ['auth'] }
);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptTransform],
};
```

### 4. **Debounce de Escritas**:

```javascript
import { debounce } from 'lodash';

const persistConfig = {
  key: 'root',
  storage,
  writeTransforms: [
    // Debounce writes para performance
    debounce((state) => state, 1000),
  ],
};
```

---

## 📋 Estratégias de Persistência

### 1. **Por Tipo de Dado**:

#### Dados do Usuário (localStorage):

```javascript
const userPersistConfig = {
  key: 'user',
  storage, // localStorage por padrão
  whitelist: ['profile', 'preferences', 'settings'],
  blacklist: ['temporaryData'],
};
```

#### Dados de Sessão (sessionStorage):

```javascript
import sessionStorage from 'redux-persist/lib/storage/session';

const sessionPersistConfig = {
  key: 'session',
  storage: sessionStorage,
  whitelist: ['currentPage', 'formDrafts', 'searchHistory'],
};
```

#### Dados Temporários (não persistir):

```javascript
// Para dados que NÃO devem ser persistidos
const tempSlice = createSlice({
  name: 'temp',
  initialState: {
    loading: false,
    errors: {},
    notifications: [],
  },
  // ... reducers
});

// Não incluir no persistConfig
```

### 2. **Por Duração**:

#### Dados Permanentes:

- Configurações do usuário
- Dados de autenticação
- Preferências de tema
- Histórico importante

#### Dados de Sessão:

- Estado de formulários
- Filtros de busca
- Estado de UI temporário
- Cache de curto prazo

#### Dados Voláteis:

- Estados de loading
- Mensagens de erro
- Notificações temporárias
- WebSocket connections

---

## 🔄 Migrações de Estado

### Configuração de Migração:

```javascript
const persistConfig = {
  key: 'root',
  storage,
  version: 2, // Incrementa quando estrutura muda
  migrate: (state) => {
    // Migração customizada
    return new Promise((resolve) => {
      if (state._persist.version < 2) {
        // Migra de versão 1 para 2
        const migratedState = {
          ...state,
          // Renomeia campo
          user: {
            ...state.user,
            fullName: state.user.name, // name → fullName
          },
        };
        delete migratedState.user.name;
        resolve(migratedState);
      } else {
        resolve(state);
      }
    });
  },
};
```

### Migrations Complexas:

```javascript
const migrations = {
  1: (state) => {
    // Migração para versão 1
    return {
      ...state,
      auth: {
        ...state.auth,
        isLoggedIn: !!state.auth.token,
      },
    };
  },
  2: (state) => {
    // Migração para versão 2
    return {
      ...state,
      user: {
        ...state.user,
        preferences: state.user.settings || {},
      },
    };
  },
};

const persistConfig = {
  key: 'root',
  storage,
  version: 2,
  migrate: (state) => {
    const currentVersion = state._persist.version;
    let migratedState = state;

    // Aplica migrações sequencialmente
    for (let version = currentVersion + 1; version <= 2; version++) {
      if (migrations[version]) {
        migratedState = migrations[version](migratedState);
      }
    }

    return Promise.resolve(migratedState);
  },
};
```

---

## 🧪 Testing com Redux Persist

### Mock para Testes:

```javascript
// testUtils.js
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Mock storage para testes
const mockStorage = {
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
};

export const createTestStore = (reducer, initialState) => {
  const persistConfig = {
    key: 'test',
    storage: mockStorage,
  };

  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, initialState);
  const persistor = persistStore(store);

  return { store, persistor };
};
```

### Testes de Persistência:

```javascript
describe('Redux Persist', () => {
  test('deve persistir estado no localStorage', async () => {
    const { store } = createTestStore(myReducer);

    // Dispatch action que muda o estado
    store.dispatch(updateUser({ name: 'João' }));

    // Aguarda persistência
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Verifica se foi salvo
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      'persist:test',
      expect.stringContaining('João')
    );
  });

  test('deve rehydratar estado corretamente', async () => {
    const persistedData = JSON.stringify({
      user: { name: 'Maria' },
      _persist: { version: -1, rehydrated: true },
    });

    mockStorage.getItem.mockResolvedValue(persistedData);

    const { store } = createTestStore(myReducer);

    // Aguarda rehydration
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(store.getState().user.name).toBe('Maria');
  });
});
```
  
---

## 🐛 Debugging e Troubleshooting

### Redux DevTools com Persist:

```javascript
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora actions do persist para evitar warnings
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          'persist/PURGE',
          'persist/FLUSH',
          'persist/PAUSE',
        ],
        ignoredActionsPaths: ['register', 'rehydrate'],
        ignoredPaths: ['_persist'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});
```

### Logging de Persist:

```javascript
const persistConfig = {
  key: 'root',
  storage,
  debug: process.env.NODE_ENV === 'development',

  // Transform para logging
  transforms: [
    createTransform(
      (inboundState, key) => {
        console.log(`💾 Persistindo ${key}:`, inboundState);
        return inboundState;
      },
      (outboundState, key) => {
        console.log(`🔄 Rehydratando ${key}:`, outboundState);
        return outboundState;
      }
    ),
  ],
};
```

### Limpeza Manual do Storage:

```javascript
// Utility para limpar persistência
export const clearPersistedState = async () => {
  try {
    await storage.removeItem('persist:root');
    console.log('Estado persistido removido');
    window.location.reload(); // Recarrega para estado limpo
  } catch (error) {
    console.error('Erro ao limpar estado:', error);
  }
};

// Hook para usar em desenvolvimento
export const useClearState = () => {
  return clearPersistedState;
};
```

### Debug Component:

```javascript
// Componente para debug em desenvolvimento
export function PersistDebugger() {
  const [persistedData, setPersistedData] = useState(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      storage.getItem('persist:root').then((data) => {
        setPersistedData(JSON.parse(data || '{}'));
      });
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <details
      style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        background: 'white',
        padding: 10,
        zIndex: 9999,
      }}
    >
      <summary>🐛 Persist Debug</summary>
      <pre style={{ fontSize: '10px', maxWidth: 300, overflow: 'auto' }}>
        {JSON.stringify(persistedData, null, 2)}
      </pre>
      <button onClick={clearPersistedState}>Clear Persisted State</button>
    </details>
  );
}
```

---

## 🔧 Configuração de Produção

### Configuração Otimizada:

```javascript
const persistConfig = {
  key: 'root',
  storage,
  version: 1,

  // Produção: apenas dados essenciais
  whitelist: ['auth', 'user', 'settings'],

  // Throttle writes em produção
  throttle: 1000,

  // Desabilita debug em produção
  debug: false,

  // Transform para compressão (opcional)
  transforms:
    process.env.NODE_ENV === 'production'
      ? [
          createTransform(
            (inboundState) => {
              // Comprime dados grandes
              if (JSON.stringify(inboundState).length > 1000) {
                return LZString.compress(JSON.stringify(inboundState));
              }
              return inboundState;
            },
            (outboundState) => {
              // Descomprime se necessário
              if (typeof outboundState === 'string') {
                try {
                  return JSON.parse(LZString.decompress(outboundState));
                } catch {
                  return outboundState;
                }
              }
              return outboundState;
            }
          ),
        ]
      : [],
};
```

---

## 📋 Best Practices

### ✅ Faça:

- **Whitelist Específico**: Persista apenas dados essenciais
- **Versionamento**: Use versões para migrações
- **Testes**: Teste persistência e rehydration
- **Error Handling**: Trate erros de storage
- **Performance**: Use transforms para otimizar
- **Segurança**: Evite dados sensíveis no localStorage

### ❌ Evite:

- **Over-Persistence**: Persistir tudo por padrão
- **Dados Grandes**: Objetos muito grandes no localStorage
- **Dados Sensitivos**: Senhas, tokens sem proteção
- **Estados Temporários**: Loading, errors, etc.
- **Circular References**: Objetos com referências circulares
- **Ignore Migrations**: Não considerar mudanças de estrutura

### 🔒 Considerações de Segurança:

```javascript
// ❌ Não faça isto
const authSlice = {
  user: user,
  password: plainTextPassword, // NUNCA persista senhas
  creditCard: cardDetails, // NUNCA persista dados de cartão
};

// ✅ Faça isto
const authSlice = {
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    // Apenas dados não-sensíveis
  },
  token: encryptedToken, // Se persistir token, criptografe
  preferences: userPreferences,
};
```

---

**💾 Redux Persist é uma ferramenta poderosa para melhorar a experiência do usuário. Use-o sabiamente, persistindo apenas dados essenciais e sempre considerando performance, segurança e experiência do usuário.**
