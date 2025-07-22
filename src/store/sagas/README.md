# ⚡ Redux Sagas

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Sagas Implementados](#-sagas-implementados)
3. [Anatomia de um Saga](#-anatomia-de-um-saga)
4. [Effects do Redux Saga](#-effects-do-redux-saga)
5. [Padrões de Implementação](#-padrões-de-implementação)
6. [Como Criar Novos Sagas](#-como-criar-novos-sagas)
7. [Testing Sagas](#-testing-sagas)

---

## 🎯 Visão Geral

**Redux Saga** é um middleware que utiliza **ES6 Generators** para gerenciar efeitos colaterais (side effects) de forma declarativa e testável. Os sagas interceptam actions do Redux e executam lógica assíncrona como chamadas de API, navegação, delays, etc.

### Vantagens do Redux Saga:

- 🔄 **Async Flow Control**: Controle avançado de fluxos assíncronos
- 🧪 **Testability**: Facilita testes de código assíncrono
- ⚡ **Cancellation**: Cancelamento automático de operações
- 🔀 **Racing**: Execução concorrente com controle
- 📊 **Background Tasks**: Tarefas que rodam em background
- 🎯 **Declarative**: Código mais legível e declarativo

### Quando Usar Sagas:

- ✅ Requisições complexas para APIs
- ✅ Fluxos de autenticação
- ✅ Operações com múltiplas etapas
- ✅ Background sync
- ✅ Navegação programática
- ✅ Delays e timeouts

---

## 📂 Sagas Implementados

### 1. 🎯 Root Saga (`sagas/index.js`)

#### Propósito:

**Centralizador** que combina todos os sagas da aplicação e os executa em paralelo.

#### Implementação:

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

#### Características:

- **`all`**: Executa todos os sagas em paralelo
- **`fork`**: Executa sagas em background (não-bloqueante)
- **Extensível**: Fácil adição de novos sagas
- **Centralized**: Ponto único de configuração

### 2. 🔘 Botão Saga (`sagas/botaoSaga.js`)

#### Propósito:

Saga **demonstrativo** que processa cliques de botão, simula requisições assíncronas e atualiza o estado via Redux.

#### Actions Interceptadas:

- `iniciarRequisicao`: Action que inicia o fluxo assíncrono

#### Implementação Completa:

```javascript
import { takeEvery, put, call, delay, select } from 'redux-saga/effects';
import { iniciarRequisicao, requisicaoSucesso, requisicaoErro } from '../slices/botaoClicadoSlice';
import api from '../../services/axios';

// Worker saga - executa a lógica de negócio
function* handleBotaoClick(action) {
  try {
    console.log('🔄 Saga: Processando clique do botão');
    console.log('📦 Payload recebido:', action.payload);

    // Simula delay de requisição de API
    yield delay(2000);

    // Exemplo de chamada real de API (descomente quando necessário)
    // const response = yield call(api.post, '/api/button-click', action.payload);

    // Simula resposta da API
    const simulatedResponse = {
      success: true,
      message: 'Botão processado com sucesso!',
      timestamp: new Date().toISOString(),
      data: action.payload,
    };

    // Acessa estado atual (demonstração)
    const currentState = yield select((state) => state.botaoLoginClicado);
    console.log('📊 Estado atual antes da atualização:', currentState);

    // Dispara action de sucesso
    yield put(requisicaoSucesso(simulatedResponse));

    console.log('✅ Saga: Requisição processada com sucesso');
  } catch (error) {
    console.error('❌ Saga: Erro na requisição:', error);

    // Dispara action de erro
    yield put(requisicaoErro(error.message));
  }
}

// Watcher saga - monitora actions específicas
function* watchBotaoClick() {
  console.log('👀 Saga: Iniciando monitoramento de cliques do botão');
  yield takeEvery(iniciarRequisicao.type, handleBotaoClick);
}

export default watchBotaoClick;
```

#### Fluxo de Execução:

```
1. User clicks button
2. Component dispatches `iniciarRequisicao`
3. Watcher saga intercepts action
4. Worker saga executes async logic
5. Worker saga dispatches success/error action
6. Reducer updates state
7. UI re-renders with new state
```

---

## 🧬 Anatomia de um Saga

### Estrutura Base:

```javascript
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { myAction, myActionSuccess, myActionError } from '../slices/mySlice';

// Worker Saga - executa a lógica
function* handleMyAction(action) {
  try {
    // 1. Opcional: Dispara loading state
    yield put(setLoading(true));

    // 2. Executa operação assíncrona
    const response = yield call(apiFunction, action.payload);

    // 3. Acessa estado atual (opcional)
    const currentState = yield select((state) => state.mySlice);

    // 4. Dispara action de sucesso
    yield put(myActionSuccess(response.data));
  } catch (error) {
    // 5. Trata erros
    yield put(myActionError(error.message));
  } finally {
    // 6. Cleanup (opcional)
    yield put(setLoading(false));
  }
}

// Watcher Saga - monitora actions
function* watchMyAction() {
  yield takeEvery(myAction.type, handleMyAction);
}

export default watchMyAction;
```

### Componentes de um Saga:

#### 1. **Worker Saga** (Generator Function):

- Executa a lógica de negócio
- Gerencia operações assíncronas
- Trata erros e sucesso
- Atualiza estado via actions

#### 2. **Watcher Saga** (Generator Function):

- Monitora actions específicas
- Decide quando executar workers
- Define estratégia de execução (every, latest, leading)

#### 3. **Effects** (Saga Instructions):

- `yield` statements que controlam o fluxo
- Instruções declarativas para o middleware
- Facilita testes e debugging

---

## ⚡ Effects do Redux Saga

### 1. **`call`** - Chamadas de Função

```javascript
// Chama função e aguarda resultado
const result = yield call(myFunction, arg1, arg2);

// Chama método de objeto
const result = yield call([object, 'method'], arg);

// Exemplos práticos
const response = yield call(api.get, '/users');
const data = yield call(localStorage.getItem, 'token');
const result = yield call([window.navigator, 'geolocation.getCurrentPosition']);
```

### 2. **`put`** - Dispatch de Actions

```javascript
// Dispara action simples
yield put(setLoading(true));

// Dispara action com payload
yield put(setData(responseData));

// Dispara múltiplas actions
yield put(setUser(user));
yield put(setPermissions(permissions));
```

### 3. **`take`** - Aguarda Actions

```javascript
// Aguarda action específica
const action = yield take('USER_LOGOUT');

// Aguarda uma de várias actions
const action = yield take(['LOGIN_SUCCESS', 'LOGIN_FAILURE']);

// Pattern matching
const action = yield take((action) => action.type.startsWith('API_'));
```

### 4. **`takeEvery`** - Processa Todas as Ocorrências

```javascript
// Executa saga para cada action
yield takeEvery('FETCH_USERS', fetchUsersSaga);

// Com pattern
yield takeEvery('API_*', apiSaga);

// Com função
yield takeEvery(
  (action) => action.type.includes('ASYNC'),
  asyncSaga
);
```

### 5. **`takeLatest`** - Cancela Anteriores

```javascript
// Cancela requests anteriores, executa apenas o último
yield takeLatest('SEARCH_USERS', searchUsersSaga);

// Útil para autocomplete/search
function* searchSaga(action) {
  const results = yield call(api.search, action.payload.query);
  yield put(setSearchResults(results));
}
```

### 6. **`select`** - Acessa Estado

```javascript
// Seleciona todo o estado
const state = yield select();

// Seleciona parte específica
const user = yield select((state) => state.auth.user);

// Seleciona com função
const isLoggedIn = yield select((state) =>
  state.auth.user && state.auth.token
);
```

### 7. **`fork`** - Execução Não-Bloqueante

```javascript
// Executa em background
const task = yield fork(backgroundTask);

// Múltiplas tarefas paralelas
yield fork(task1);
yield fork(task2);
yield fork(task3);

// Retorna controle da task
const task = yield fork(longRunningTask);
// ... fazer outras coisas
yield cancel(task); // Cancela se necessário
```

### 8. **`all`** - Execução Paralela

```javascript
// Aguarda todas as operações
const [users, posts, comments] = yield all([
  call(api.getUsers),
  call(api.getPosts),
  call(api.getComments),
]);

// Com objetos
const { users, posts } = yield all({
  users: call(api.getUsers),
  posts: call(api.getPosts),
});
```

### 9. **`race`** - Primeira que Completar

```javascript
// Primeira operação que completar vence
const { response, timeout } = yield race({
  response: call(api.getData),
  timeout: delay(5000),
});

if (timeout) {
  console.log('Request timed out');
}
```

### 10. **`delay`** - Aguarda Tempo

```javascript
// Aguarda tempo específico
yield delay(1000); // 1 segundo

// Delay com cancelamento
yield delay(5000);
```

---

## 📋 Padrões de Implementação

### 1. **Padrão de API Request**:

```javascript
function* fetchDataSaga(action) {
  try {
    yield put(setLoading(true));
    yield put(clearError());

    const response = yield call(api.get, '/data', {
      params: action.payload,
    });

    yield put(fetchDataSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(fetchDataError(errorMessage));
  } finally {
    yield put(setLoading(false));
  }
}
```

### 2. **Padrão de Login com Redirect**:

```javascript
import { push } from 'redux-first-history';

function* loginSaga(action) {
  try {
    yield put(setLoginLoading(true));

    const response = yield call(api.post, '/auth/login', action.payload);
    const { user, token } = response.data;

    // Armazena token
    yield call(localStorage.setItem, 'token', token);

    // Atualiza estado
    yield put(loginSuccess({ user, token }));

    // Redireciona
    const redirectPath = yield select(
      (state) => state.router.location.state?.from?.pathname || '/dashboard'
    );
    yield put(push(redirectPath));
  } catch (error) {
    yield put(loginError(error.response?.data?.message || 'Erro no login'));
  } finally {
    yield put(setLoginLoading(false));
  }
}
```

### 3. **Padrão de Background Sync**:

```javascript
function* backgroundSyncSaga() {
  while (true) {
    try {
      const isOnline = yield select((state) => state.app.isOnline);
      const pendingData = yield select((state) => state.sync.pendingData);

      if (isOnline && pendingData.length > 0) {
        yield call(syncDataSaga, { payload: pendingData });
      }

      yield delay(30000); // Sync a cada 30 segundos
    } catch (error) {
      console.error('Background sync error:', error);
      yield delay(60000); // Tenta novamente em 1 minuto
    }
  }
}

// Inicia background sync
function* rootSaga() {
  yield all([
    fork(backgroundSyncSaga),
    // outros sagas...
  ]);
}
```

### 4. **Padrão de Retry com Backoff**:

```javascript
function* retryApiCallSaga(action) {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = yield call(api.request, action.payload);
      yield put(apiCallSuccess(response.data));
      return; // Sucesso, sai do loop
    } catch (error) {
      attempt++;

      if (attempt >= maxRetries) {
        yield put(apiCallError('Máximo de tentativas excedido'));
        return;
      }

      // Exponential backoff
      const delayTime = Math.pow(2, attempt) * 1000;
      console.log(`Tentativa ${attempt} falhou, tentando novamente em ${delayTime}ms`);
      yield delay(delayTime);
    }
  }
}
```

### 5. **Padrão de File Upload com Progress**:

```javascript
function* uploadFileSaga(action) {
  try {
    yield put(setUploadProgress(0));

    const response = yield call(api.post, '/upload', action.payload.formData, {
      onUploadProgress: function* (progressEvent) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        yield put(setUploadProgress(progress));
      },
    });

    yield put(uploadSuccess(response.data));
  } catch (error) {
    yield put(uploadError(error.message));
  }
}
```

---

## 🚀 Como Criar Novos Sagas

### Passo 1: Criar o Arquivo

```bash
cd src/store/sagas
touch meuNovoSaga.js
```

### Passo 2: Implementar o Saga

```javascript
// src/store/sagas/meuNovoSaga.js
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { minhaAction, minhaActionSuccess, minhaActionError, setLoading } from '../slices/meuSlice';
import api from '../../services/axios';

// Worker saga
function* handleMinhaAction(action) {
  try {
    console.log('🔄 Processando minha action:', action.payload);

    yield put(setLoading(true));

    // Sua lógica aqui
    const response = yield call(api.get, '/minha-api', {
      params: action.payload,
    });

    yield put(minhaActionSuccess(response.data));
  } catch (error) {
    console.error('❌ Erro na minha action:', error);
    yield put(minhaActionError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Watcher saga
function* watchMinhaAction() {
  yield takeEvery(minhaAction.type, handleMinhaAction);
}

export default watchMinhaAction;
```

### Passo 3: Adicionar ao Root Saga

```javascript
// src/store/sagas/index.js
import { all, fork } from 'redux-saga/effects';
import watchBotaoClick from './botaoSaga';
import watchMinhaAction from './meuNovoSaga'; // Importa novo saga

export default function* rootSaga() {
  yield all([
    fork(watchBotaoClick),
    fork(watchMinhaAction), // Adiciona ao root saga
  ]);
}
```

### Passo 4: Usar no Componente

```javascript
// Em um componente
import { useDispatch } from 'react-redux';
import { minhaAction } from '../store/slices/meuSlice';

export default function MeuComponente() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      minhaAction({
        param1: 'valor1',
        param2: 'valor2',
      })
    );
  };

  return <button onClick={handleClick}>Executar Saga</button>;
}
```

---

## 🧪 Testing Sagas

### Teste com `redux-saga-test-plan`:

```javascript
// meuSaga.test.js
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { handleMinhaAction } from './meuSaga';
import { minhaActionSuccess } from '../slices/meuSlice';
import api from '../../services/axios';

describe('meuSaga', () => {
  test('deve processar action com sucesso', () => {
    const action = { payload: { id: 1 } };
    const mockResponse = { data: { success: true } };

    return expectSaga(handleMinhaAction, action)
      .provide([[call(api.get, '/minha-api', { params: action.payload }), mockResponse]])
      .put(minhaActionSuccess(mockResponse.data))
      .run();
  });

  test('deve tratar erros corretamente', () => {
    const action = { payload: { id: 1 } };
    const error = new Error('API Error');

    return expectSaga(handleMinhaAction, action)
      .provide([[call(api.get, '/minha-api', { params: action.payload }), Promise.reject(error)]])
      .put(minhaActionError(error.message))
      .run();
  });
});
```

### Teste Manual com Generators:

```javascript
import { runSaga } from 'redux-saga';
import { handleMinhaAction } from './meuSaga';

test('saga integration test', async () => {
  const dispatched = [];
  const mockStore = {
    dispatch: (action) => dispatched.push(action),
    getState: () => ({
      /* mock state */
    }),
  };

  const action = { payload: { id: 1 } };

  await runSaga(mockStore, handleMinhaAction, action).toPromise();

  expect(dispatched).toContainEqual(
    expect.objectContaining({ type: 'meuSlice/minhaActionSuccess' })
  );
});
```

---

## 🔧 Debugging Sagas

### Redux-Saga DevTools:

```javascript
// Para desenvolvimento
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-saga-logger';

const sagaMiddleware = createSagaMiddleware({
  logger: process.env.NODE_ENV === 'development' ? logger : undefined,
  onError: (error, { sagaStack }) => {
    console.error('Saga Error:', error);
    console.error('Saga Stack:', sagaStack);
  },
});
```

### Console Logging:

```javascript
function* mySaga(action) {
  console.group(`🔄 Saga: ${action.type}`);
  console.log('Payload:', action.payload);

  try {
    const result = yield call(myAsyncFunction);
    console.log('Result:', result);

    yield put(successAction(result));
    console.log('✅ Saga completed successfully');
  } catch (error) {
    console.error('❌ Saga error:', error);
    yield put(errorAction(error.message));
  } finally {
    console.groupEnd();
  }
}
```

---

## 📚 Recursos Avançados

### 1. **Channels para Comunicação**:

```javascript
import { eventChannel } from 'redux-saga';

function* websocketSaga() {
  const channel = yield call(createWebSocketChannel);

  try {
    while (true) {
      const message = yield take(channel);
      yield put(messageReceived(message));
    }
  } finally {
    channel.close();
  }
}

function createWebSocketChannel() {
  return eventChannel((emit) => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      emit(JSON.parse(event.data));
    };

    return () => ws.close();
  });
}
```

### 2. **Task Management**:

```javascript
function* rootSaga() {
  const task = yield fork(backgroundTask);

  // Cancela task em caso de logout
  yield takeEvery('LOGOUT', function* () {
    yield cancel(task);
  });
}

function* backgroundTask() {
  try {
    while (true) {
      yield call(performBackgroundWork);
      yield delay(10000);
    }
  } finally {
    if (yield cancelled()) {
      console.log('Background task cancelled');
    }
  }
}
```

---

**⚡ Redux Saga oferece controle poderoso sobre fluxos assíncronos. Use-o para operações complexas que vão além do que actions e reducers simples podem handle. Mantenha seus sagas focados, testáveis e bem documentados.**
