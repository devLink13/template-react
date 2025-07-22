# 📄 Pages

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Estrutura das Páginas](#-estrutura-das-páginas)
3. [Páginas Implementadas](#-páginas-implementadas)
4. [Padrões de Desenvolvimento](#-padrões-de-desenvolvimento)
5. [Integração com Redux](#-integração-com-redux)
6. [Sistema de Rotas](#-sistema-de-rotas)
7. [Como Criar Novas Páginas](#-como-criar-novas-páginas)

---

## 🎯 Visão Geral

A pasta `pages` contém todos os **componentes de página** da aplicação. Cada página representa uma rota específica da aplicação e geralmente agrupa vários componentes menores para formar uma interface completa.

### Características das Páginas:

- 🗂️ **Feature-Based**: Cada página é uma funcionalidade completa
- 🔄 **Redux Integration**: Conectadas ao estado global quando necessário
- 🛣️ **Route-Based**: Cada página corresponde a uma rota específica
- 💅 **Styled Components**: Estilização isolada e componentizada
- 📱 **Responsive**: Layout adaptativo para diferentes dispositivos
- 🔒 **Protected Routes**: Sistema de autenticação integrado

### Diferença entre Pages e Components:

- **Pages**: Interfaces completas que correspondem a rotas
- **Components**: Elementos reutilizáveis usados dentro das páginas

---

## 📁 Estrutura das Páginas

Cada página segue a seguinte estrutura padrão:

```
PageName/
├── index.js          # Componente principal da página
├── styled.js         # Estilos com styled-components
└── README.md         # Documentação específica (opcional)
```

### Template Padrão de Página:

```javascript
// index.js - Estrutura base
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { PageWrapper, Title } from './styled';

export default function MinhaPage() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.meuSlice);

  return (
    <Container>
      <PageWrapper>
        <Title>Minha Página</Title>
        {/* Conteúdo da página */}
      </PageWrapper>
    </Container>
  );
}
```

```javascript
// styled.js - Estilos base
import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from '../../config/colors';

export const PageWrapper = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 0;
`;

export const Title = styled.h1`
  color: ${primaryColor};
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;
```

---

## 📄 Páginas Implementadas

### 1. 🔐 Login (`/`)

**Localização**: `src/pages/Login/`

#### Funcionalidades:

- 🎯 **Página Principal**: Primeira página que o usuário vê
- 🔄 **Redux Integration**: Exemplo completo de integração com Redux
- 🔘 **Botão de Teste**: Demonstra dispatch de actions e sagas
- 📊 **Loading States**: Exemplo de feedback visual durante operações
- 💅 **Styled Components**: Demonstra uso de estilos condicionais

#### Componentes Utilizados:

```javascript
import { Container } from '../../styles/GlobalStyles'; // Layout global
import { Paragrafo, Title } from './styled'; // Estilos locais
```

#### Estados Redux Conectados:

```javascript
const { botaoLoginClicado, contadorCliques, loading, error, dados } = useSelector(
  (state) => state.botaoLoginClicado
);
```

#### Actions Disparadas:

- `iniciarRequisicao` - Inicia processo via Redux Saga
- `buttonClicked` - Incrementa contador (exemplo)

#### Estrutura Visual:

```
┌─────────────────────────────┐
│          Login Page         │
│      Faça seu login         │
├─────────────────────────────┤
│                             │
│  Lorem ipsum dolor sit...   │
│                             │
│  [Botao de teste]          │
│                             │
└─────────────────────────────┘
```

### 2. 🚫 Page404 (`*`)

**Localização**: `src/pages/Page404/`

#### Funcionalidades:

- 🛡️ **Fallback Route**: Captura todas as rotas não encontradas
- 🎨 **Design Consistente**: Visual alinhado com o tema da aplicação
- 🔗 **Navegação de Retorno**: Links para voltar à aplicação
- 📱 **Responsivo**: Layout adaptativo

#### Estrutura Visual:

```
┌─────────────────────────────┐
│            404              │
│      Página não encontrada  │
├─────────────────────────────┤
│                             │
│  Ops! A página que você     │
│  procura não foi encontrada │
│                             │
│  [Voltar ao Início]        │
│                             │
└─────────────────────────────┘
```

---

## 📋 Padrões de Desenvolvimento

### 1. **Nomenclatura**:

- Pastas: PascalCase (`Login`, `UserProfile`, `ProductList`)
- Arquivos: camelCase (`index.js`, `styled.js`)
- Componentes: PascalCase (`Login`, `Page404`)

### 2. **Estrutura de Import**:

```javascript
// 1. React e hooks
import React, { useState, useEffect } from 'react';

// 2. Redux
import { useDispatch, useSelector } from 'react-redux';

// 3. React Router
import { useNavigate, useParams } from 'react-router-dom';

// 4. Bibliotecas externas
import { toast } from 'react-toastify';

// 5. Componentes internos
import Header from '../../components/Header';

// 6. Estilos globais
import { Container } from '../../styles/GlobalStyles';

// 7. Estilos locais
import { PageWrapper, Title } from './styled';

// 8. Actions/Reducers
import { minhaAction } from '../../store/slices/meuSlice';
```

### 3. **Container Pattern**:

```javascript
export default function MinhaPage() {
  return (
    <Container>
      {' '}
      {/* Layout global responsivo */}
      <PageWrapper>
        {' '}
        {/* Wrapper específico da página */}
        {/* Conteúdo da página */}
      </PageWrapper>
    </Container>
  );
}
```

### 4. **Loading e Error States**:

```javascript
export default function MinhaPage() {
  const { loading, error, data } = useSelector((state) => state.meuSlice);

  if (loading) {
    return (
      <Container>
        <div>Carregando...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div>Erro: {error.message}</div>
      </Container>
    );
  }

  return <Container>{/* Conteúdo normal */}</Container>;
}
```

---

## 🔄 Integração com Redux

### Padrão de Conexão:

```javascript
export default function MinhaPage() {
  // 1. Dispatch para disparar actions
  const dispatch = useDispatch();

  // 2. Seletores para acessar estado
  const { loading, data, error } = useSelector((state) => state.meuSlice);

  // 3. Handlers para interações
  const handleAction = () => {
    dispatch(minhaAction({ payload: 'dados' }));
  };

  // 4. Effects para side effects
  useEffect(() => {
    dispatch(carregarDados());
  }, [dispatch]);

  return (
    // JSX da página
  );
}
```

### Estados Típicos por Página:

```javascript
// Estado padrão para páginas
const pageState = {
  loading: false, // Indica carregamento
  error: null, // Mensagem de erro
  data: null, // Dados principais
  success: false, // Indica sucesso de operação
  initialized: false, // Indica se já foi inicializada
};
```

---

## 🛣️ Sistema de Rotas

### Configuração Atual:

```javascript
// src/routes/index.js
<Routes>
  <Route path='/' element={<MyRoute element={<Login />} />} />
  <Route path='*' element={<MyRoute element={<Page404 />} />} />
</Routes>
```

### Como as Páginas se Conectam:

1. **Rota Definida** em `src/routes/index.js`
2. **Componente MyRoute** aplica proteção se necessário
3. **Página Renderizada** com props e estado

### Proteção de Rotas:

```javascript
// Página pública (não protegida)
<Route path='/login' element={<MyRoute element={<Login />} />} />

// Página protegida (requer autenticação)
<Route path='/dashboard' element={<MyRoute element={<Dashboard />} isClosed={true} />} />
```

---

## 🚀 Como Criar Novas Páginas

### Passo 1: Criar Estrutura

```bash
# Navegue até a pasta pages
cd src/pages

# Crie a pasta da página
mkdir MinhaNovaPage
cd MinhaNovaPage

# Crie os arquivos necessários
touch index.js styled.js
```

### Passo 2: Implementar a Página

```javascript
// src/pages/MinhaNovaPage/index.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { PageWrapper, Title, Content } from './styled';
import { carregarDados } from '../../store/slices/meuSlice';

export default function MinhaNovaPage() {
  // Redux
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.meuSlice);

  // React Router
  const navigate = useNavigate();

  // Estado local
  const [localState, setLocalState] = useState('');

  // Effects
  useEffect(() => {
    dispatch(carregarDados());
  }, [dispatch]);

  // Handlers
  const handleAction = () => {
    // Lógica da ação
  };

  // Loading state
  if (loading) {
    return (
      <Container>
        <PageWrapper>
          <div>Carregando...</div>
        </PageWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <PageWrapper>
        <Title>Minha Nova Página</Title>
        <Content>{/* Conteúdo da página */}</Content>
      </PageWrapper>
    </Container>
  );
}
```

### Passo 3: Implementar Estilos

```javascript
// src/pages/MinhaNovaPage/styled.js
import styled from 'styled-components';
import { primaryColor, primaryDarkColor, errorColor } from '../../config/colors';

export const PageWrapper = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 0;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

export const Title = styled.h1`
  color: ${primaryColor};
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const Content = styled.div`
  background: ${primaryDarkColor};
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem 0;

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem 0;
  }
`;

export const ErrorMessage = styled.div`
  color: ${errorColor};
  background: rgba(242, 175, 41, 0.1);
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
`;
```

### Passo 4: Adicionar Rota

```javascript
// src/routes/index.js
import MinhaNovaPage from '../pages/MinhaNovaPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MyRoute element={<Login />} />} />
      <Route path='/minha-nova-page' element={<MyRoute element={<MinhaNovaPage />} />} />
      <Route path='*' element={<MyRoute element={<Page404 />} />} />
    </Routes>
  );
}
```

### Passo 5: Criar Estado Redux (se necessário)

```javascript
// src/store/slices/minhaNovaPageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const minhaNovaPageSlice = createSlice({
  name: 'minhaNovaPage',
  initialState: {
    loading: false,
    data: null,
    error: null,
    success: false,
  },
  reducers: {
    carregarDados: (state) => {
      state.loading = true;
      state.error = null;
    },
    carregarDadosSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    },
    carregarDadosError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { carregarDados, carregarDadosSuccess, carregarDadosError } =
  minhaNovaPageSlice.actions;
export default minhaNovaPageSlice.reducer;
```

---

## 📱 Exemplos de Páginas Típicas

### 1. **Dashboard**:

```javascript
export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { stats } = useSelector((state) => state.dashboard);

  return (
    <Container>
      <PageWrapper>
        <Title>Dashboard</Title>
        <StatsGrid>
          <StatCard title='Vendas' value={stats.sales} />
          <StatCard title='Usuários' value={stats.users} />
        </StatsGrid>
      </PageWrapper>
    </Container>
  );
}
```

### 2. **Lista com Filtros**:

```javascript
export default function ProductList() {
  const [filter, setFilter] = useState('');
  const { products, loading } = useSelector((state) => state.products);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <PageWrapper>
        <Title>Produtos</Title>
        <FilterInput
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder='Buscar produtos...'
        />
        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </PageWrapper>
    </Container>
  );
}
```

### 3. **Formulário**:

```javascript
export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(formData));
  };

  return (
    <Container>
      <PageWrapper>
        <Title>Criar Produto</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            name='name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder='Nome do produto'
          />
          <Button type='submit'>Criar</Button>
        </Form>
      </PageWrapper>
    </Container>
  );
}
```

---

## 🧪 Testes de Páginas

### Estrutura de Teste:

```javascript
// MinhaPage.test.js
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MinhaPage from './index';
import store from '../../store';

const renderWithProviders = (component) =>
  render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );

describe('MinhaPage', () => {
  test('renderiza o título corretamente', () => {
    renderWithProviders(<MinhaPage />);
    expect(screen.getByText('Minha Nova Página')).toBeInTheDocument();
  });

  test('mostra loading state', () => {
    // Mock do estado loading
    const mockStore = { ...store, getState: () => ({ meuSlice: { loading: true } }) };

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <MinhaPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });
});
```

--- 

## 📋 Checklist para Novas Páginas

### Estrutura:

- [ ] Pasta criada em `src/pages/`
- [ ] `index.js` implementado
- [ ] `styled.js` criado
- [ ] Rota adicionada em `routes/index.js`

### Funcionalidade:

- [ ] Redux integrado (se necessário)
- [ ] Loading states implementados
- [ ] Error handling implementado
- [ ] Responsividade testada
- [ ] Navegação funcionando

### Qualidade:

- [ ] Código limpo e organizado
- [ ] Styled components consistentes
- [ ] Performance otimizada
- [ ] Acessibilidade considerada
- [ ] Testes básicos criados

---

**📄 As páginas são o ponto de entrada principal para os usuários. Mantenha-as organizadas, performáticas e com uma experiência consistente em toda a aplicação.**
