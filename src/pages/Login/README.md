# 🔐 Login Page

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Funcionalidades](#-funcionalidades)
3. [Integração Redux](#-integração-redux)
4. [Redux Saga Integration](#-redux-saga-integration)
5. [Estrutura do Código](#-estrutura-do-código)
6. [Estados e Loading](#-estados-e-loading)
7. [Estilos e Layout](#-estilos-e-layout)

---

## 🎯 Visão Geral

A página **Login** serve como **página inicial** da aplicação e **exemplo completo** de integração com Redux Toolkit, Redux Saga e styled-components. Esta página demonstra as principais funcionalidades do template.

### Características Principais:

- 🏠 **Página Inicial**: Primeira página que o usuário acessa (`/`)
- 🔄 **Redux Completo**: Exemplo de integração completa com Redux
- ⚡ **Redux Saga**: Demonstra uso de sagas para efeitos colaterais
- 📊 **Loading States**: Implementa feedback visual durante operações
- 💅 **Styled Components**: Exemplifica uso avançado de estilos condicionais
- 🎨 **Responsive Design**: Layout adaptativo para diferentes dispositivos

---

## ✨ Funcionalidades

### 🔘 Botão de Teste Principal

- **Ação**: Dispara múltiplas actions Redux simultaneamente
- **Saga**: Inicia requisição via Redux Saga
- **Loading**: Mostra estado "Carregando..." durante execução
- **Feedback**: Atualiza visualmente o Header da aplicação

### 📊 Estados Demonstrados

1. **Loading State**: Botão desabilitado + texto "Carregando..."
2. **Success State**: Atualização do contador e estado global
3. **Error Handling**: Estrutura pronta para tratamento de erros
4. **Data Management**: Exemplo de gerenciamento de dados assíncronos

### 🎯 Integração com Header

- Atualiza o estado `botaoLoginClicado` no Redux
- Header reflete mudanças em tempo real
- Demonstra comunicação entre componentes via estado global

---

## 🔄 Integração Redux

### Estados Conectados:

```javascript
const {
  botaoLoginClicado, // Boolean - Status do botão
  contadorCliques, // Number - Contador de cliques
  loading, // Boolean - Estado de carregamento
  error, // String/null - Mensagens de erro
  dados, // Object/null - Dados da requisição
} = useSelector((state) => state.botaoLoginClicado);
```

### Actions Disparadas:

#### 1. `iniciarRequisicao` (Redux Saga)

```javascript
dispatch(
  iniciarRequisicao({
    timestamp: new Date().toISOString(),
    buttonId: 'loginButton',
  })
);
```

- **Trigger**: Clique no botão principal
- **Payload**: Timestamp e identificador do botão
- **Efeito**: Inicia saga que simula requisição assíncrona

#### 2. `buttonClicked` (Redux Toolkit)

```javascript
dispatch(buttonClicked());
```

- **Trigger**: Clique no botão principal
- **Efeito**: Incrementa contador no `exampleSlice`

### Estrutura do Estado:

```javascript
// state.botaoLoginClicado
{
  botaoLoginClicado: false,    // Usado pelo Header
  contadorCliques: 0,          // Contador de ações
  loading: false,              // Estado de loading
  error: null,                 // Mensagens de erro
  dados: null                  // Dados de resposta
}

// state.example
{
  clickCount: 0                // Contador do example slice
}
```

---

## ⚡ Redux Saga Integration

### Fluxo Completo:

```
1. User Click → 2. Action Dispatch → 3. Saga Intercept → 4. API Call → 5. Success/Error → 6. UI Update
```

### Saga Responsável:

- **File**: `src/store/sagas/botaoSaga.js`
- **Watcher**: `watchBotaoClick`
- **Worker**: `handleBotaoClick`

### Exemplo de Uso da Saga:

```javascript
function* handleBotaoClick(action) {
  try {
    yield put(setLoading(true));

    // Simula chamada de API
    const response = yield call(apiCall, action.payload);

    yield put(setDados(response));
    yield put(setBotaoClicado(true));
  } catch (error) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}
```

---

## 🏗️ Estrutura do Código

### Componente Principal:

```javascript
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Estilos
import { Paragrafo, Title } from './styled';
import { Container } from '../../styles/GlobalStyles';

// Actions
import { iniciarRequisicao } from '../../store/slices/botaoClicadoSlice';
import { buttonClicked } from '../../store/slices/exampleSlice';

export default function Login() {
  const dispatch = useDispatch();

  // Estado Redux
  const { botaoLoginClicado, contadorCliques, loading, error, dados } = useSelector(
    (state) => state.botaoLoginClicado
  );

  // Handler do botão
  function handleClick(event) {
    event.preventDefault();

    // Dispara saga
    dispatch(
      iniciarRequisicao({
        timestamp: new Date().toISOString(),
        buttonId: 'loginButton',
      })
    );

    // Dispara action síncrona
    dispatch(buttonClicked());
  }

  return (
    <Container>
      <Title isRed={true}>
        Login Page
        <br />
        <small>Faça seu login</small>
      </Title>

      <Paragrafo>Lorem ipsum dolor sit amet consectetur adipisicing elit...</Paragrafo>

      <button type='button' onClick={handleClick} disabled={loading}>
        {loading ? 'Carregando...' : 'Botao de teste'}
      </button>

      {/* Debugging info */}
      <div>
        <p>Estado do botão: {botaoLoginClicado ? 'Ativo' : 'Inativo'}</p>
        <p>Contador: {contadorCliques}</p>
        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      </div>
    </Container>
  );
}
```

### Imports Detalhados:

```javascript
// React core
import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Estilos locais
import { Paragrafo, Title } from './styled';

// Estilos globais
import { Container } from '../../styles/GlobalStyles';

// Actions
import { iniciarRequisicao } from '../../store/slices/botaoClicadoSlice';
import { buttonClicked } from '../../store/slices/exampleSlice';
```

---

## 📊 Estados e Loading

### Loading State Management:

```javascript
// Renderização condicional do botão
<button type='button' onClick={handleClick} disabled={loading}>
  {loading ? 'Carregando...' : 'Botao de teste'}
</button>
```

### Estados Possíveis:

#### 1. **Initial State** (Padrão)

- `loading`: `false`
- `botaoLoginClicado`: `false`
- `error`: `null`
- Botão: "Botao de teste" (habilitado)

#### 2. **Loading State** (Durante saga)

- `loading`: `true`
- Botão: "Carregando..." (desabilitado)
- Header: Pode manter estado anterior

#### 3. **Success State** (Após saga)

- `loading`: `false`
- `botaoLoginClicado`: `true`
- `dados`: Objeto com resposta
- Header: Exibe "Botão Ativo"

#### 4. **Error State** (Em caso de erro)

- `loading`: `false`
- `error`: String com mensagem
- Interface: Mostra mensagem de erro

### Error Handling:

```javascript
// Exemplo de tratamento de erro
{
  error && <div style={{ color: 'red', marginTop: '1rem' }}>Erro: {error}</div>;
}
```

---

## 🎨 Estilos e Layout

### Componentes Styled:

#### Title Component:

```javascript
export const Title = styled.h1`
  color: ${(props) => (props.isRed ? primaryColor : '#333')};
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;

  small {
    font-size: 1rem;
    font-weight: normal;
    display: block;
    margin-top: 0.5rem;
  }
`;
```

#### Paragrafo Component:

```javascript
export const Paragrafo = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: justify;
  color: #666;
`;
```

### Layout Structure:

```
┌─────────────────────────────────────┐
│            Container                │  ← Global responsive container
├─────────────────────────────────────┤
│           Login Page                │  ← Title (red, conditional)
│          Faça seu login             │  ← Subtitle
├─────────────────────────────────────┤
│                                     │
│  Lorem ipsum dolor sit amet...      │  ← Description paragraph
│                                     │
├─────────────────────────────────────┤
│                                     │
│      [Botao de teste]              │  ← Main action button
│                                     │
├─────────────────────────────────────┤
│  Estado: Ativo | Contador: 5       │  ← Debug info (development)
└─────────────────────────────────────┘
```

### Responsive Behavior:

```javascript
// Container automático do GlobalStyles
export const Container = styled.section`
  max-width: 480px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
```

---

## 🔧 Personalização e Extensão

### Adicionar Formulário Real:

```javascript
const [formData, setFormData] = useState({
  email: '',
  password: '',
});

const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

return (
  <Container>
    <Title isRed={true}>Login</Title>

    <form onSubmit={handleSubmit}>
      <Input
        type='email'
        name='email'
        value={formData.email}
        onChange={handleInputChange}
        placeholder='Email'
        required
      />

      <Input
        type='password'
        name='password'
        value={formData.password}
        onChange={handleInputChange}
        placeholder='Senha'
        required
      />

      <Button type='submit' disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  </Container>
);
```

### Conectar com API Real:

```javascript
// Em botaoSaga.js
function* handleLoginRequest(action) {
  try {
    yield put(setLoading(true));

    const response = yield call(api.post, '/auth/login', action.payload);

    // Armazenar token
    localStorage.setItem('token', response.data.token);

    // Atualizar estado
    yield put(loginSuccess(response.data.user));

    // Navegar para dashboard
    yield put(navigate('/dashboard'));
  } catch (error) {
    yield put(loginError(error.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}
```

---

## 🧪 Testing

### Exemplo de Teste:

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Login from './index';
import store from '../../store';

test('renderiza página de login', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  expect(screen.getByText('Login Page')).toBeInTheDocument();
  expect(screen.getByText('Botao de teste')).toBeInTheDocument();
});

test('dispara actions ao clicar no botão', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const button = getByText('Botao de teste');
  fireEvent.click(button);

  // Verificar se o estado mudou
  expect(getByText('Carregando...')).toBeInTheDocument();
});
```

---

## 📚 Recursos e Referencias

### Redux Toolkit:

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [useSelector Hook](https://react-redux.js.org/api/hooks#useselector)
- [useDispatch Hook](https://react-redux.js.org/api/hooks#usedispatch)

### Redux Saga:

- [Redux Saga Documentation](https://redux-saga.js.org/)
- [Saga Effects](https://redux-saga.js.org/docs/api/#effect-creators)

### Styled Components:

- [Styled Components](https://styled-components.com/)
- [Conditional Styling](https://styled-components.com/docs/basics#passed-props)

---

**🔐 Esta página é o coração do template, demonstrando todas as funcionalidades principais. Use-a como referência para implementar outras páginas com as mesmas práticas e padrões.**
