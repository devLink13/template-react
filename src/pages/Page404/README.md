# 🚫 Page404

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Funcionalidades](#-funcionalidades)
3. [Estrutura do Código](#-estrutura-do-código)
4. [Estilos e Layout](#-estilos-e-layout)
5. [Sistema de Roteamento](#-sistema-de-roteamento)
6. [Personalização](#-personalização)

---

## 🎯 Visão Geral

A página **Page404** é uma **página de erro** que captura todas as rotas não encontradas na aplicação. Ela fornece uma experiência consistente para usuários que tentam acessar URLs inexistentes, mantendo o design e navegação da aplicação.

### Características Principais:

- 🛡️ **Fallback Route**: Captura qualquer rota não definida (`*`)
- 🎨 **Design Consistente**: Visual alinhado com o tema da aplicação
- 🔗 **Navegação Intuitiva**: Links e botões para retornar à aplicação
- 📱 **Totalmente Responsivo**: Layout adaptativo para todos os dispositivos
- ⚡ **Performance**: Página leve sem dependências pesadas
- 🌐 **SEO Friendly**: Estrutura semântica para mecanismos de busca

---

## ✨ Funcionalidades

### 🛡️ Captura de Rotas

- **Wildcard Route** (`*`): Captura qualquer URL não definida
- **Consistência**: Mantém usuário dentro da aplicação
- **Experiência**: Evita páginas de erro padrão do navegador

### 🧭 Opções de Navegação

- **Botão "Voltar ao Início"**: Navegação direta para página principal
- **Links de Navegação**: Acesso a seções importantes
- **Breadcrumbs** (estrutura pronta): Para navegação contextual

### 📊 Informações para o Usuário

- **Mensagem Clara**: Explica que a página não foi encontrada
- **Design Amigável**: Interface não intimidante
- **Call-to-Action**: Direcionamento claro para próximos passos

### 🎯 Integração com Sistema

- **React Router**: Integração completa com sistema de rotas
- **Styled Components**: Estilos consistentes com a aplicação
- **Global Container**: Layout responsivo padrão

---

## 🏗️ Estrutura do Código

### Componente Principal:

```javascript
import React from 'react';
import { Link } from 'react-router-dom';

// Estilos
import { Container } from '../../styles/GlobalStyles';
import { PageWrapper, Title, Subtitle, Message, BackButton, LinksContainer } from './styled';

export default function Page404() {
  return (
    <Container>
      <PageWrapper>
        <Title>404</Title>
        <Subtitle>Página não encontrada</Subtitle>

        <Message>
          Ops! A página que você está procurando não foi encontrada. Ela pode ter sido movida,
          removida ou você digitou o endereço incorretamente.
        </Message>

        <LinksContainer>
          <BackButton as={Link} to='/'>
            Voltar ao Início
          </BackButton>

          <Link to='/login' className='secondary-link'>
            Fazer Login
          </Link>
        </LinksContainer>
      </PageWrapper>
    </Container>
  );
}
```

### Imports Utilizados:

```javascript
// React & Router
import React from 'react';
import { Link } from 'react-router-dom';

// Estilos globais
import { Container } from '../../styles/GlobalStyles';

// Estilos locais
import { PageWrapper, Title, Subtitle, Message, BackButton } from './styled';
```

### Tecnologias:

- **React**: Componente funcional simples
- **React Router**: `Link` para navegação declarativa
- **Styled Components**: Estilização componentizada
- **Global Styles**: Container responsivo padrão

---

## 🎨 Estilos e Layout

### Estrutura Visual:

```
┌─────────────────────────────────────┐
│            Container                │  ← Global responsive wrapper
├─────────────────────────────────────┤
│                                     │
│              404                    │  ← Large error number
│        Página não encontrada        │  ← Clear error message
│                                     │
│    Ops! A página que você está...   │  ← Friendly explanation
│                                     │
│      [Voltar ao Início]            │  ← Primary action button
│                                     │
│         Fazer Login                 │  ← Secondary link
│                                     │
└─────────────────────────────────────┘
```

### Componentes Styled:

#### PageWrapper:

```javascript
export const PageWrapper = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
```

#### Title (404 Number):

```javascript
export const Title = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  color: ${primaryColor};
  margin: 0;
  line-height: 0.8;

  @media (max-width: 768px) {
    font-size: 6rem;
  }

  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;
```

#### Subtitle:

```javascript
export const Subtitle = styled.h2`
  color: ${primaryDarkColor};
  font-size: 2rem;
  margin: 1rem 0 2rem 0;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
```

#### Message:

```javascript
export const Message = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto 3rem auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0 auto 2rem auto;
  }
`;
```

#### BackButton:

```javascript
export const BackButton = styled.button`
  background: ${primaryColor};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  margin: 0.5rem;

  transition: all 0.3s ease;

  &:hover {
    background: ${primaryDarkColor};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;
```

---

## 🛣️ Sistema de Roteamento

### Configuração da Rota:

```javascript
// src/routes/index.js
<Routes>
  <Route path='/' element={<MyRoute element={<Login />} />} />
  <Route path='/user' element={<MyRoute element={<UserPage />} />} />
  {/* Outras rotas específicas */}

  {/* Rota 404 - SEMPRE deve ser a última */}
  <Route path='*' element={<MyRoute element={<Page404 />} />} />
</Routes>
```

### Como Funciona:

1. **React Router** processa rotas de cima para baixo
2. **Rotas específicas** são verificadas primeiro
3. **Wildcard `*`** captura qualquer rota não encontrada
4. **MyRoute** aplica proteção se necessário (neste caso, não)
5. **Page404** é renderizada para qualquer URL inválida

### Exemplos de URLs que Levam à Page404:

- `https://myapp.com/pagina-inexistente`
- `https://myapp.com/admin/usuarios` (se não definida)
- `https://myapp.com/404`
- `https://myapp.com/qualquer-coisa`

### Navegação Programática:

```javascript
import { useNavigate } from 'react-router-dom';

export default function SomeComponent() {
  const navigate = useNavigate();

  const handleNotFound = () => {
    navigate('/pagina-que-nao-existe'); // Levará à Page404
  };

  return <button onClick={handleNotFound}>Simular 404</button>;
}
```

---

## 🛠️ Personalização

### 1. **Adicionar Mais Links de Navegação**:

```javascript
export default function Page404() {
  return (
    <Container>
      <PageWrapper>
        <Title>404</Title>
        <Subtitle>Página não encontrada</Subtitle>

        <Message>A página que você procura não foi encontrada.</Message>

        <LinksContainer>
          <BackButton as={Link} to='/'>
            Voltar ao Início
          </BackButton>

          <SecondaryLink as={Link} to='/dashboard'>
            Dashboard
          </SecondaryLink>

          <SecondaryLink as={Link} to='/produtos'>
            Ver Produtos
          </SecondaryLink>

          <SecondaryLink as={Link} to='/contato'>
            Fale Conosco
          </SecondaryLink>
        </LinksContainer>
      </PageWrapper>
    </Container>
  );
}
```

### 2. **Adicionar Animações**:

```javascript
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

export const AnimatedTitle = styled.h1`
  font-size: 8rem;
  color: ${primaryColor};
  animation: ${bounce} 2s infinite;
`;
```

### 3. **Adicionar Breadcrumbs**:

```javascript
import { useLocation } from 'react-router-dom';

export default function Page404() {
  const location = useLocation();

  return (
    <Container>
      <PageWrapper>
        <Breadcrumb>
          Você tentou acessar: <code>{location.pathname}</code>
        </Breadcrumb>

        <Title>404</Title>
        {/* resto do conteúdo */}
      </PageWrapper>
    </Container>
  );
}
```

### 4. **Adicionar Search/Sugestões**:

```javascript
const [searchTerm, setSearchTerm] = useState('');

const suggestionPages = [
  { name: 'Login', path: '/login' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Produtos', path: '/produtos' },
];

return (
  <Container>
    <PageWrapper>
      <Title>404</Title>
      <Subtitle>Página não encontrada</Subtitle>

      <SearchContainer>
        <SearchInput
          type='text'
          placeholder='Procurar páginas...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <SuggestionsList>
          {suggestionPages
            .filter((page) => page.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((page) => (
              <SuggestionItem key={page.path}>
                <Link to={page.path}>{page.name}</Link>
              </SuggestionItem>
            ))}
        </SuggestionsList>
      </SearchContainer>
    </PageWrapper>
  </Container>
);
```

---

## 📊 Analytics e Monitoramento

### Tracking de 404s:

```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Page404() {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', 'page_not_found', {
        'custom_parameter': location.pathname
      });
    }

    // Custom analytics
    fetch('/api/analytics/404', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: location.pathname,
        referrer: document.referrer,
        timestamp: new Date().toISOString()
      })
    });
  }, [location.pathname]);

  return (
    // componente
  );
}
```

---

## 🧪 Testing

### Teste de Renderização:

```javascript
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Page404 from './index';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Page404', () => {
  test('renderiza corretamente', () => {
    renderWithRouter(<Page404 />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
    expect(screen.getByText('Voltar ao Início')).toBeInTheDocument();
  });

  test('contém link para home', () => {
    renderWithRouter(<Page404 />);

    const homeLink = screen.getByText('Voltar ao Início');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });
});
```

### Teste de Rota:

```javascript
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../../routes';

test('mostra Page404 para rota inexistente', () => {
  render(
    <MemoryRouter initialEntries={['/rota-inexistente']}>
      <AppRoutes />
    </MemoryRouter>
  );

  expect(screen.getByText('404')).toBeInTheDocument();
});
```

---

## 🔧 Manutenção e Atualizações

### Checklist Regular:

- [ ] Verificar se links funcionam corretamente
- [ ] Testar responsividade em diferentes dispositivos
- [ ] Atualizar sugestões de páginas se necessário
- [ ] Revisar analytics de 404s para identificar problemas
- [ ] Manter design consistente com resto da aplicação

### Melhorias Futuras:

- [ ] Sistema de busca inteligente
- [ ] Sugestões baseadas em URLs similares
- [ ] Página de contato integrada
- [ ] Easter eggs para engajamento
- [ ] Redirecionamentos automáticos inteligentes

---

**🚫 A Page404 é uma oportunidade de manter usuários engajados mesmo quando encontram um erro. Mantenha-a útil, amigável e consistente com sua marca.**
