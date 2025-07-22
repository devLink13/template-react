# 🧩 Components

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Estrutura dos Componentes](#-estrutura-dos-componentes)
3. [Componentes Implementados](#-componentes-implementados)
4. [Padrões de Desenvolvimento](#-padrões-de-desenvolvimento)
5. [Como Criar Novos Componentes](#-como-criar-novos-componentes)

---

## 🎯 Visão Geral

Esta pasta contém todos os **componentes reutilizáveis** da aplicação. Os componentes são organizados seguindo o padrão de **Feature-Based Organization**, onde cada componente possui sua própria pasta com arquivos de lógica e estilização separados.

### Características dos Componentes:

- ♻️ **Reutilizáveis**: Podem ser usados em múltiplas páginas
- 🧩 **Modulares**: Cada componente é independente
- 💅 **Styled Components**: Estilização isolada e componentizada
- 📝 **PropTypes**: Validação de propriedades obrigatória
- 🔌 **Redux Integration**: Conectados ao estado global quando necessário

---

## 📁 Estrutura dos Componentes

Cada componente segue a seguinte estrutura padrão:

```
ComponentName/
├── index.js          # Lógica do componente, hooks, integração Redux
├── styled.js         # Estilos com styled-components
└── README.md         # Documentação específica do componente (opcional)
```

### Exemplo de Estrutura:

```javascript
// index.js - Lógica do componente
import React from 'react';
import PropTypes from 'prop-types';
import { StyledComponent } from './styled';

export default function ComponentName({ prop1, prop2 }) {
  return <StyledComponent>{/* JSX do componente */}</StyledComponent>;
}

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.bool,
};

ComponentName.defaultProps = {
  prop2: false,
};
```

```javascript
// styled.js - Estilos do componente
import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const StyledComponent = styled.div`
  background: ${primaryColor};
  padding: 1rem;

  /* Estilos responsivos */
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;
```

---

## 🧩 Componentes Implementados

### Header

**Localização**: `src/components/Header/`

#### Funcionalidades:

- 🧭 **Navegação Principal**: Links para páginas principais da aplicação
- 🎯 **Ícones Intuitivos**: Utiliza React Icons para navegação visual
- 🔄 **Integração Redux**: Conectado ao estado global para exibir informações dinâmicas
- 📱 **Responsivo**: Layout adaptativo para diferentes dispositivos
- 🎨 **Styled Components**: Estilização componentizada e reutilizável

#### Props e Estados:

```javascript
// Conectado ao Redux
const botaoClicado = useSelector((state) => state.botaoLoginClicado.botaoLoginClicado);
```

#### Links de Navegação:

- **🏠 Home** (`/`) - Página inicial
- **👤 User** (`/user`) - Página do usuário
- **🔐 Login** (`/login`) - Página de login

#### Estados Visuais:

- **Botão Ativo**: Quando `botaoClicado === true`
- **Botão Inativo**: Quando `botaoClicado === false`

#### Tecnologias Utilizadas:

- React Hooks (`useSelector`)
- React Router (`Link`)
- React Icons (`FaHome`, `FaSignInAlt`, `FaUserAlt`)
- Styled Components

#### Exemplo de Uso:

```javascript
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      {/* Resto da aplicação */}
    </div>
  );
}
```

---

## 📋 Padrões de Desenvolvimento

### 1. **Nomenclatura**:

- Pastas: PascalCase (`Header`, `UserProfile`)
- Arquivos: camelCase (`index.js`, `styled.js`)
- Componentes: PascalCase (`Header`, `UserCard`)

### 2. **Estrutura de Arquivos**:

- `index.js`: Sempre o arquivo principal com a lógica
- `styled.js`: Sempre os estilos com styled-components
- Evitar arquivos `styles.css` ou `styles.module.css`

### 3. **PropTypes**:

- Sempre implementar validação de props
- Definir `defaultProps` quando necessário
- Documentar props complexas

### 4. **Hooks e Estado**:

- Preferir hooks funcionais sobre class components
- Usar `useSelector` para estado Redux
- Usar `useDispatch` para ações Redux
- Implementar `useCallback` e `useMemo` quando necessário

### 5. **Acessibilidade**:

- Usar semantic HTML
- Implementar `alt` em imagens
- Usar `aria-*` attributes quando necessário
- Considerar navegação por teclado

---

## 🚀 Como Criar Novos Componentes

### Passo 1: Criar Estrutura

```bash
# Navegue até a pasta components
cd src/components

# Crie a pasta do componente
mkdir MeuNovoComponente
cd MeuNovoComponente

# Crie os arquivos necessá  rios
touch index.js styled.js
```

### Passo 2: Implementar o Componente

```javascript
// src/components/MeuNovoComponente/index.js
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Title } from './styled';

export default function MeuNovoComponente({ title, isVisible, onButtonClick, children }) {
  // Hooks Redux (se necessário)
  const dispatch = useDispatch();
  const stateValue = useSelector((state) => state.example.value);

  // Handlers de eventos
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  // Renderização condicional
  if (!isVisible) {
    return null;
  }

  return (
    <Container>
      <Title>{title}</Title>
      {children}
      <button onClick={handleClick}>Clique aqui</button>
    </Container>
  );
}

// Validação de Props
MeuNovoComponente.propTypes = {
  title: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  onButtonClick: PropTypes.func,
  children: PropTypes.node,
};

// Props padrão
MeuNovoComponente.defaultProps = {
  isVisible: true,
  onButtonClick: null,
  children: null,
};
```

### Passo 3: Implementar Estilos

```javascript
// src/components/MeuNovoComponente/styled.js
import styled from 'styled-components';
import { primaryColor, primaryDarkColor, successColor } from '../../config/colors';

export const Container = styled.div`
  background: ${primaryDarkColor};
  padding: 2rem;
  border-radius: 8px;
  margin: 1rem 0;

  /* Estados de hover */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  /* Responsividade */
  @media (max-width: 768px) {
    padding: 1rem;
    margin: 0.5rem 0;
  }

  /* Animações */
  transition: all 0.3s ease;
`;

export const Title = styled.h2`
  color: ${primaryColor};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;

  /* Variações baseadas em props */
  ${(props) =>
    props.isCenter &&
    `
    text-align: center;
  `}

  /* Responsividade */
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const Button = styled.button`
  background: ${successColor};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: ${primaryColor};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
```

### Passo 4: Usar o Componente

```javascript
// Em qualquer página ou componente
import MeuNovoComponente from '../components/MeuNovoComponente';

function MinhaPage() {
  const handleButtonClick = () => {
    console.log('Botão clicado!');
  };

  return (
    <div>
      <MeuNovoComponente title='Meu Título' isVisible={true} onButtonClick={handleButtonClick}>
        <p>Conteúdo do componente</p>
      </MeuNovoComponente>
    </div>
  );
}
```

---

## 🔧 Integração com Redux

### Para Componentes que Precisam do Estado Global:

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { minhaAction } from '../../store/slices/meuSlice';

export default function MeuComponente() {
  // Acessar estado
  const dados = useSelector((state) => state.meuSlice.dados);
  const loading = useSelector((state) => state.meuSlice.loading);

  // Disparar ações
  const dispatch = useDispatch();

  const handleAction = () => {
    dispatch(minhaAction({ payload: 'dados' }));
  };

  return (
    <div>
      {loading ? 'Carregando...' : dados}
      <button onClick={handleAction}>Ação</button>
    </div>
  );
}
```

---

## 📊 Boas Práticas

### ✅ Faça:

- Sempre use PropTypes para validação
- Implemente defaultProps quando necessário
- Mantenha componentes pequenos e focados (Single Responsibility)
- Use hooks para lógica de estado
- Implemente loading states e error handling
- Use semantic HTML para acessibilidade
- Documente componentes complexos

### ❌ Evite:

- Componentes muito grandes (mais de 200 linhas)
- Lógica de negócio dentro de componentes
- Props drilling excessivo
- Inline styles (use styled-components)
- Componentes sem PropTypes
- Estado local desnecessário (use Redux quando apropriado)

---

## 🧪 Testando Componentes

### Estrutura de Teste Sugerida:

```javascript
// MeuComponente.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MeuComponente from './index';
import store from '../../store';

const ComponenteComProviders = ({ children }) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

describe('MeuComponente', () => {
  test('renderiza corretamente', () => {
    render(
      <ComponenteComProviders>
        <MeuComponente title='Teste' />
      </ComponenteComProviders>
    );

    expect(screen.getByText('Teste')).toBeInTheDocument();
  });

  test('chama função onClick quando clicado', () => {
    const mockClick = jest.fn();

    render(
      <ComponenteComProviders>
        <MeuComponente title='Teste' onButtonClick={mockClick} />
      </ComponenteComProviders>
    );

    fireEvent.click(screen.getByText('Clique aqui'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 📚 Recursos Úteis

- [React Documentation](https://react.dev/)
- [Styled Components](https://styled-components.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [PropTypes](https://www.npmjs.com/package/prop-types)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

**🔄 Esta pasta é atualizada constantemente conforme novos componentes são adicionados ao projeto. Sempre mantenha a consistência com os padrões estabelecidos.**
