# 🛣️ Routes
  
## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Estrutura do Sistema](#-estrutura-do-sistema)
3. [Arquivos do Sistema](#-arquivos-do-sistema)
4. [Rotas Implementadas](#-rotas-implementadas)
5. [Sistema de Proteção](#-sistema-de-proteção)
6. [Como Adicionar Rotas](#-como-adicionar-rotas)
7. [Navegação Programática](#-navegação-programática)

---

## 🎯 Visão Geral

A pasta `routes` contém todo o **sistema de roteamento** da aplicação, baseado no **React Router DOM v7**. Este sistema oferece navegação declarativa, rotas protegidas, redirecionamentos inteligentes e gerenciamento de estado de navegação.

### Características Principais:

- 🛣️ **React Router DOM v7**: Navegação moderna e performática
- 🔒 **Rotas Protegidas**: Sistema de autenticação integrado
- 🔄 **State Preservation**: Manutenção do estado durante navegação
- 📱 **SPA Navigation**: Navegação sem reload de página
- 🛡️ **Fallback Routes**: Tratamento de rotas não encontradas
- ⚡ **Lazy Loading**: Carregamento sob demanda (estrutura pronta)

---

## 🏗️ Estrutura do Sistema

### Arquitetura de Navegação:

```
App.js
├── BrowserRouter          # Provider de roteamento
└── AppRoutes              # Configuração das rotas
    ├── MyRoute            # Wrapper para proteção
    └── Page Components    # Componentes das páginas
```

### Fluxo de Navegação:

```
URL Change → Router Match → MyRoute Check → Auth Validation → Page Render
```

### Hierarquia de Componentes:

```javascript
<BrowserRouter>
  <Header /> // Navegação sempre visível
  <AppRoutes>
    {' '}
    // Sistema de rotas
    <Routes>
      <Route>
        <MyRoute>
          {' '}
          // Proteção e validação
          <PageComponent /> // Componente final
        </MyRoute>
      </Route>
    </Routes>
  </AppRoutes>
</BrowserRouter>
```

---

## 📁 Arquivos do Sistema

### 1. 📄 `index.js` - Configuração Principal

Arquivo que define todas as rotas da aplicação e suas configurações.

### 2. 📄 `MyRoute.js` - Sistema de Proteção

Componente wrapper que implementa lógica de autenticação e redirecionamentos.

---

## 🛣️ Rotas Implementadas

### Mapeamento Atual:

```javascript
<Routes>
  <Route path='/' element={<MyRoute element={<Login />} />} />
  <Route path='*' element={<MyRoute element={<Page404 />} />} />
</Routes>
```

### Detalhamento das Rotas:

#### 1. 🏠 Rota Principal (`/`)

- **Componente**: `Login`
- **Proteção**: Não (pública)
- **Descrição**: Página inicial da aplicação
- **Acesso**: Livre para todos os usuários

#### 2. 🚫 Rota Fallback (`*`)

- **Componente**: `Page404`
- **Proteção**: Não (pública)
- **Descrição**: Página de erro para rotas não encontradas
- **Acesso**: Captura qualquer URL não definida

### Rotas Preparadas (Header):

O componente Header já possui links para rotas futuras:

#### 👤 User Route (`/user`)

- **Status**: Preparada mas não implementada
- **Link**: Disponível no Header
- **Comportamento**: Levará à Page404 até ser implementada

#### 🔐 Login Route (`/login`)

- **Status**: Preparada mas não implementada
- **Link**: Disponível no Header
- **Comportamento**: Levará à Page404 até ser implementada

---

## 🔒 Sistema de Proteção

### Componente MyRoute:

O `MyRoute` é um **Higher-Order Component** que envolve as páginas e aplica lógica de autenticação.

### Estrutura do MyRoute:

```javascript
export default function MyRoute({ element, isClosed }) {
  const isLoggedIn = false; // Conectado ao Redux futuramente
  const location = useLocation();

  // Verificação de autenticação
  if (isClosed && !isLoggedIn) {
    return (
      <Navigate
        to='/login'
        state={{
          prevPath: location.pathname, // Preserva rota anterior
        }}
        replace
      />
    );
  }

  return element;
}
```

### Props do MyRoute:

#### `element` (Required)

- **Tipo**: `PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired`
- **Descrição**: Componente da página a ser renderizado
- **Exemplo**: `<Login />`, `<Dashboard />`

#### `isClosed` (Optional)

- **Tipo**: `PropTypes.bool`
- **Default**: `false`
- **Descrição**: Indica se a rota requer autenticação
- **Valores**:
  - `false`: Rota pública (acessível por todos)
  - `true`: Rota protegida (requer login)

### Lógica de Proteção:

#### Rota Pública (`isClosed={false}`):

```javascript
<Route path='/public' element={<MyRoute element={<PublicPage />} />} />
```

- Sempre acessível
- Não verifica autenticação
- Renderiza página diretamente

#### Rota Protegida (`isClosed={true}`):

```javascript
<Route path='/dashboard' element={<MyRoute element={<Dashboard />} isClosed={true} />} />
```

- Verifica se usuário está logado
- Redireciona para login se não autenticado
- Preserva rota de origem para redirecionamento pós-login

---

## 🚀 Como Adicionar Rotas

### Passo 1: Criar o Componente da Página

```javascript
// src/pages/MinhaNovaPage/index.js
import React from 'react';

export default function MinhaNovaPage() {
  return (
    <div>
      <h1>Minha Nova Página</h1>
    </div>
  );
}
```

### Passo 2: Adicionar Rota no Sistema

```javascript
// src/routes/index.js
import MinhaNovaPage from '../pages/MinhaNovaPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MyRoute element={<Login />} />} />

      {/* Nova rota adicionada */}
      <Route path='/minha-nova-page' element={<MyRoute element={<MinhaNovaPage />} />} />

      <Route path='*' element={<MyRoute element={<Page404 />} />} />
    </Routes>
  );
}
```

### Passo 3: Adicionar ao Header (Opcional)

```javascript
// src/components/Header/index.js
<Link to='/minha-nova-page'>
  <FaNova size={20} />
</Link>
```

---

## 🧭 Navegação Programática

### Usando useNavigate:

```javascript
import { useNavigate } from 'react-router-dom';

export default function MeuComponente() {
  const navigate = useNavigate();

  const irParaDashboard = () => {
    navigate('/dashboard');
  };

  const voltarPagina = () => {
    navigate(-1); // Volta uma página no histórico
  };

  const irComEstado = () => {
    navigate('/profile', {
      state: { userId: 123 },
    });
  };

  return (
    <div>
      <button onClick={irParaDashboard}>Ir para Dashboard</button>
      <button onClick={voltarPagina}>Voltar</button>
      <button onClick={irComEstado}>Ver Perfil</button>
    </div>
  );
}
```

### Acessando Estado de Navegação:

```javascript
import { useLocation } from 'react-router-dom';

export default function Profile() {
  const location = useLocation();

  // Acessa estado passado via navigate
  const { userId } = location.state || {};

  return (
    <div>
      <h1>Profile do Usuário {userId}</h1>
    </div>
  );
}
```

---

## 🔧 Configurações Avançadas

### 1. **Rotas Aninhadas**:

```javascript
<Routes>
  <Route path='/admin' element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path='users' element={<AdminUsers />} />
    <Route path='settings' element={<AdminSettings />} />
  </Route>
</Routes>
```

### 2. **Parâmetros de Rota**:

```javascript
<Routes>
  <Route path='/user/:id' element={<MyRoute element={<UserProfile />} />} />
  <Route path='/product/:category/:id' element={<MyRoute element={<ProductDetail />} />} />
</Routes>;

// Em UserProfile
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const { id } = useParams();

  return <div>User ID: {id}</div>;
}
```

### 3. **Query Parameters**:

```javascript
import { useSearchParams } from 'react-router-dom';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q');
  const page = searchParams.get('page') || 1;

  const updateSearch = (newQuery) => {
    setSearchParams({ q: newQuery, page: 1 });
  };

  return (
    <div>
      <p>Busca: {query}</p>
      <p>Página: {page}</p>
    </div>
  );
}
```

### 4. **Lazy Loading**:

```javascript
import { lazy, Suspense } from 'react';

// Lazy loading de componentes
const Dashboard = lazy(() => import('../pages/Dashboard'));
const UserProfile = lazy(() => import('../pages/UserProfile'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path='/dashboard' element={<MyRoute element={<Dashboard />} isClosed={true} />} />
        <Route path='/profile' element={<MyRoute element={<UserProfile />} isClosed={true} />} />
      </Routes>
    </Suspense>
  );
}
```

---

## 🔄 Integração com Redux

### Estado de Autenticação:

```javascript
// Em MyRoute.js - Futuro
import { useSelector } from 'react-redux';

export default function MyRoute({ element, isClosed }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  if (isClosed && !isLoggedIn) {
    return <Navigate to='/login' replace />;
  }

  return element;
}
```

### Navegação via Redux Saga:

```javascript
// Em saga
import { navigate } from 'redux-first-history';

function* loginSaga(action) {
  try {
    const response = yield call(api.login, action.payload);
    yield put(loginSuccess(response.data));

    // Navegar após login
    yield put(navigate('/dashboard'));
  } catch (error) {
    yield put(loginError(error.message));
  }
}
```

---

## 📋 Exemplos de Implementação

### 1. **Sistema Completo de Autenticação**:

```javascript
// src/routes/index.js
export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path='/' element={<MyRoute element={<Home />} />} />
      <Route path='/login' element={<MyRoute element={<Login />} />} />
      <Route path='/register' element={<MyRoute element={<Register />} />} />

      {/* Rotas protegidas */}
      <Route path='/dashboard' element={<MyRoute element={<Dashboard />} isClosed={true} />} />
      <Route path='/profile' element={<MyRoute element={<Profile />} isClosed={true} />} />
      <Route path='/settings' element={<MyRoute element={<Settings />} isClosed={true} />} />

      {/* Admin routes */}
      <Route path='/admin' element={<MyRoute element={<AdminPanel />} isClosed={true} />} />

      {/* Fallback */}
      <Route path='*' element={<MyRoute element={<Page404 />} />} />
    </Routes>
  );
}
```

### 2. **Redirecionamento Pós-Login**:

```javascript
// Em Login.js
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Volta para a página que o usuário tentou acessar
    const from = location.state?.prevPath || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    // formulário de login
  );
}
```

---

## 🧪 Testing Routes

### Teste de Navegação:

```javascript
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './index';

test('navega para página correta', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <AppRoutes />
    </MemoryRouter>
  );

  expect(screen.getByText('Login Page')).toBeInTheDocument();
});

test('mostra 404 para rota inexistente', () => {
  render(
    <MemoryRouter initialEntries={['/rota-inexistente']}>
      <AppRoutes />
    </MemoryRouter>
  );

  expect(screen.getByText('404')).toBeInTheDocument();
});
```

### Teste de Proteção:

```javascript
test('redireciona para login se não autenticado', () => {
  // Mock do estado não autenticado
  const mockStore = { auth: { isLoggedIn: false } };

  render(
    <Provider store={mockStore}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Login')).toBeInTheDocument();
});
```

---

## 🔧 Manutenção e Atualizações

### Checklist Regular:

- [ ] Testar todas as rotas funcionam
- [ ] Verificar redirecionamentos de autenticação
- [ ] Confirmar que Page404 captura rotas inválidas
- [ ] Testar navegação em diferentes dispositivos
- [ ] Verificar performance com lazy loading

### Melhorias Futuras:

- [ ] Implementar breadcrumbs automáticos
- [ ] Sistema de permissões granulares
- [ ] Cache de rotas visitadas
- [ ] Animações entre páginas
- [ ] Preload de rotas relacionadas

---

**🛣️ O sistema de rotas é fundamental para a experiência do usuário. Mantenha-o organizado, testado e sempre considere a jornada completa do usuário na aplicação.**
