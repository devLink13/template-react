# 🔧 Services
  
## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Arquivos de Serviços](#-arquivos-de-serviços)
3. [Configuração do Axios](#-configuração-do-axios)
4. [Sistema de História](#-sistema-de-história)
5. [Como Usar os Serviços](#-como-usar-os-serviços)
6. [Interceptors e Middlewares](#-interceptors-e-middlewares)
7. [Error Handling](#-error-handling)

---

## 🎯 Visão Geral

A pasta `services` contém todos os **serviços externos** e **configurações de integração** da aplicação. Esta camada abstrai a comunicação com APIs, gerenciamento de histórico de navegação e outras integrações externas.

### Objetivos dos Serviços:

- 🌐 **API Communication**: Cliente HTTP configurado e reutilizável
- 🧭 **Navigation Management**: Controle programático de navegação
- 🔧 **Configuration**: Centralizacão de configurações externas
- 🛡️ **Error Handling**: Tratamento centralizado de erros de API
- 🔄 **Interceptors**: Middleware para requisições e respostas
- 📊 **Logging**: Sistema de logs para debugging e monitoramento

---

## 📁 Arquivos de Serviços

### 1. 📄 `axios.js` - Cliente HTTP

Configuração principal do Axios para comunicação com APIs.

### 2. 📄 `history.js` - Gerenciamento de Navegação

Instância personalizada do browser history para navegação programática.

---

## 🌐 Configuração do Axios

### Arquivo: `src/services/axios.js`

#### Configuração Atual:

```javascript
import axios from 'axios';

export default axios.create({
  baseURL: 'http://35.198.12.236',
});
```

#### Configuração Básica:

- **Base URL**: `http://35.198.12.236`
- **Timeout**: Padrão do Axios (sem timeout)
- **Headers**: Padrão do Axios
- **Interceptors**: Não configurados (prontos para implementação)

### Configuração Expandida (Exemplo):

```javascript
import axios from 'axios';

// Cria instância do Axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://35.198.12.236',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor - adiciona token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - trata respostas e erros globalmente
api.interceptors.response.use(
  (response) => {
    console.log(
      `✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`
    );
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Token expirado ou inválido
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          // Sem permissão
          console.error('Acesso negado');
          break;
        case 500:
          // Erro interno do servidor
          console.error('Erro interno do servidor');
          break;
        default:
          console.error(`API Error ${status}:`, data);
      }
    } else {
      // Erro de rede
      console.error('Network Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
```

---

## 🧭 Sistema de História

### Arquivo: `src/services/history.js`

#### Implementação Atual:

```javascript
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default history;
```

#### Funcionalidades:

- **Browser History**: Gerenciamento do histórico de navegação
- **Programmatic Navigation**: Navegação via código JavaScript
- **State Management**: Preservação de estado entre navegações
- **Integration Ready**: Pronto para integração com Redux

### Uso Expandido:

```javascript
import { createBrowserHistory } from 'history';

// Cria instância do history
const history = createBrowserHistory();

// Listener para mudanças de rota
history.listen(({ location, action }) => {
  console.log(`Navegação ${action}: ${location.pathname}${location.search}${location.hash}`);

  // Analytics tracking
  if (window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: location.pathname,
    });
  }
});

export default history;
```

---

## 🚀 Como Usar os Serviços

### 1. **Fazendo Requisições HTTP**:

#### GET Requests:

```javascript
import api from '../services/axios';

// Em um componente ou saga
export async function fetchUsers() {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchUser(id) {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
```

#### POST Requests:

```javascript
export async function createUser(userData) {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(credentials) {
  try {
    const response = await api.post('/auth/login', credentials);

    // Armazena token
    localStorage.setItem('authToken', response.data.token);

    return response.data;
  } catch (error) {
    throw error;
  }
}
```

#### PUT/PATCH Requests:

```javascript
export async function updateUser(id, userData) {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function partialUpdateUser(id, changes) {
  try {
    const response = await api.patch(`/users/${id}`, changes);
    return response.data;
  } catch (error) {
    throw error;
  }
}
```

#### DELETE Requests:

```javascript
export async function deleteUser(id) {
  try {
    await api.delete(`/users/${id}`);
    return { success: true };
  } catch (error) {
    throw error;
  }
}
```

### 2. **Navegação Programática**:

#### Navegação Básica:

```javascript
import history from '../services/history';

// Navegar para uma rota
history.push('/dashboard');

// Navegar com estado
history.push('/profile', { userId: 123 });

// Substituir rota atual
history.replace('/login');

// Voltar uma página
history.goBack();

// Avançar uma página
history.goForward();

// Ir para posição específica no histórico
history.go(-2); // Voltar 2 páginas
```

#### Navegação com Query Parameters:

```javascript
// Navegar com query string
history.push('/search?q=react&page=1');

// Navegar com state e search
history.push({
  pathname: '/products',
  search: '?category=electronics',
  state: { fromDashboard: true },
});
```

---

## 🛡️ Interceptors e Middlewares

### Request Interceptors:

#### Autenticação Automática:

```javascript
api.interceptors.request.use(
  (config) => {
    // Adiciona token de autenticação
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Adiciona timestamp para cache busting
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);
```

#### Logging de Requisições:

```javascript
api.interceptors.request.use(
  (config) => {
    console.group(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    console.log('Headers:', config.headers);
    console.log('Data:', config.data);
    console.log('Params:', config.params);
    console.groupEnd();

    return config;
  },
  (error) => {
    console.error('❌ Request setup error:', error);
    return Promise.reject(error);
  }
);
```

### Response Interceptors:

#### Tratamento Global de Respostas:

```javascript
api.interceptors.response.use(
  (response) => {
    // Log de sucesso
    console.log(
      `✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`
    );

    // Processamento global de dados
    if (response.data && response.data.message) {
      // Pode mostrar toast de sucesso
      console.log('Success:', response.data.message);
    }

    return response;
  },
  (error) => {
    // Tratamento global de erros
    handleGlobalError(error);
    return Promise.reject(error);
  }
);
```

---

## ❌ Error Handling

### Sistema de Tratamento de Erros:

#### Handler Global de Erros:

```javascript
import { toast } from 'react-toastify';
import history from './history';

export function handleGlobalError(error) {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        toast.error(data.message || 'Dados inválidos');
        break;

      case 401:
        toast.error('Sessão expirada. Faça login novamente.');
        localStorage.removeItem('authToken');
        history.push('/login');
        break;

      case 403:
        toast.error('Você não tem permissão para esta ação');
        break;

      case 404:
        toast.error('Recurso não encontrado');
        break;

      case 422:
        // Erros de validação
        if (data.errors) {
          Object.values(data.errors).forEach((errorArray) => {
            errorArray.forEach((errorMsg) => {
              toast.error(errorMsg);
            });
          });
        }
        break;

      case 500:
        toast.error('Erro interno do servidor. Tente novamente.');
        break;

      default:
        toast.error(data.message || 'Erro desconhecido');
    }
  } else if (error.request) {
    // Erro de rede
    toast.error('Erro de conexão. Verifique sua internet.');
  } else {
    // Erro de configuração
    toast.error('Erro na aplicação. Recarregue a página.');
  }

  // Log completo do erro para debugging
  console.error('API Error Details:', {
    message: error.message,
    response: error.response,
    request: error.request,
    config: error.config,
  });
}
```

### Retry Logic:

```javascript
import axios from 'axios';

const MAX_RETRIES = 3;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Verifica se deve tentar novamente
    if (config && config.__retryCount < MAX_RETRIES) {
      config.__retryCount = config.__retryCount || 0;
      config.__retryCount++;

      // Aguarda antes de tentar novamente
      const delay = Math.pow(2, config.__retryCount) * 1000; // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay));

      console.log(`Tentativa ${config.__retryCount} de ${MAX_RETRIES} para ${config.url}`);

      return api(config);
    }

    return Promise.reject(error);
  }
);
```

---

## 📊 Logging e Monitoring

### Sistema de Logs:

```javascript
class ApiLogger {
  static logRequest(config) {
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      console.log('Config:', config);
      console.groupEnd();
    }
  }

  static logResponse(response) {
    if (process.env.NODE_ENV === 'development') {
      console.group(`✅ API Response: ${response.status} ${response.config.url}`);
      console.log('Data:', response.data);
      console.log('Headers:', response.headers);
      console.groupEnd();
    }
  }

  static logError(error) {
    console.group('❌ API Error');
    console.error('Message:', error.message);
    console.error('Response:', error.response);
    console.error('Config:', error.config);
    console.groupEnd();

    // Enviar para serviço de monitoramento
    this.sendToMonitoring(error);
  }

  static sendToMonitoring(error) {
    if (process.env.NODE_ENV === 'production' && window.Sentry) {
      window.Sentry.captureException(error);
    }
  }
}

// Usar nos interceptors
api.interceptors.request.use(
  (config) => {
    ApiLogger.logRequest(config);
    return config;
  },
  (error) => {
    ApiLogger.logError(error);
    return Promise.reject(error);
  }
);
```

---

## 🧪 Testing Services

### Testes do Axios:

```javascript
import api from '../axios';
import MockAdapter from 'axios-mock-adapter';

describe('API Service', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  test('faz requisição GET com sucesso', async () => {
    const data = { users: [{ id: 1, name: 'John' }] };
    mock.onGet('/users').reply(200, data);

    const response = await api.get('/users');
    expect(response.data).toEqual(data);
  });

  test('trata erro 404', async () => {
    mock.onGet('/users/999').reply(404, { message: 'Not found' });

    try {
      await api.get('/users/999');
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});
```

### Testes do History:

```javascript
import history from '../history';

describe('History Service', () => {
  test('navega para rota correta', () => {
    history.push('/dashboard');
    expect(history.location.pathname).toBe('/dashboard');
  });

  test('mantém estado na navegação', () => {
    const state = { userId: 123 };
    history.push('/profile', state);

    expect(history.location.state).toEqual(state);
  });
});
```

---

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente:

```javascript
// .env.development
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=10000
REACT_APP_ENABLE_API_LOGS=true

// .env.production
REACT_APP_API_URL=https://api.myapp.com
REACT_APP_API_TIMEOUT=5000
REACT_APP_ENABLE_API_LOGS=false
```

### Configuração Dinâmica:

```javascript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Logs apenas em desenvolvimento
if (process.env.REACT_APP_ENABLE_API_LOGS === 'true') {
  api.interceptors.request.use((config) => {
    console.log('API Request:', config);
    return config;
  });
}
```

---

## 📋 Checklist de Implementação

### Para Novas APIs:

- [ ] Base URL configurada
- [ ] Headers padrão definidos
- [ ] Timeout configurado
- [ ] Interceptors de autenticação
- [ ] Error handling global
- [ ] Retry logic (se necessário)
- [ ] Logging configurado
- [ ] Testes implementados

### Para Navegação:

- [ ] History instance criada
- [ ] Integração com React Router
- [ ] Navegação programática testada
- [ ] Estado preservado corretamente
- [ ] Analytics tracking (se necessário)

---

**🔧 Os serviços são a ponte entre sua aplicação e o mundo externo. Mantenha-os bem configurados, testados e documentados para garantir uma integração robusta e confiável.**
