# 🎨 Styles - Sistema de Estilização Global

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [GlobalStyles.js](#-globalstyles-js)
3. [Styled Components Integration](#-styled-components-integration)
4. [Padrões de Estilização](#-padrões-de-estilização)
5. [Temas e Customização](#-temas-e-customização)
6. [Responsividade](#-responsividade)
7. [Best Practices](#-best-practices)

---

## 🎯 Visão Geral

A pasta **`styles/`** contém o sistema de estilização global da aplicação, implementando **CSS-in-JS** com **Styled Components**. Este sistema fornece:

### Componentes do Sistema:

- 🌐 **GlobalStyles.js**: Reset CSS + estilos globais
- 🎨 **Styled Components**: Estilos componente por componente
- 🎯 **CSS-in-JS**: Estilos com JavaScript integrado
- 📱 **Responsivo**: Design mobile-first
- 🎭 **Temas**: Sistema de cores e tipografia
- ⚡ **Performance**: Estilos otimizados e tree-shaking

### Arquitetura Visual:

```
styles/
├── GlobalStyles.js       # 🌐 Estilos globais da aplicação
│
Components (styled.js):   # 🎨 Estilos específicos por componente
├── src/components/Header/styled.js
├── src/pages/Login/styled.js
├── src/pages/Page404/styled.js
└── [outros componentes]/styled.js
```

### Integração com o Sistema:

```
App.js → GlobalStyles → Styled Components → Final CSS
  ↓         ↓              ↓                  ↓
Reset    Globals      Component-specific    Optimized CSS
```

---

## 🌐 GlobalStyles.js

### Implementação Atual:

```javascript
import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    color: ${colors.primaryDarkColor};
    background: ${colors.primaryColor};
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    transition: all 300ms;

    &:hover {
      filter: brightness(85%);
    }
  }

  a {
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul {
    list-style: none;
  }

  body .Toastify__toast-container .Toastify__toast--success {
    background: ${colors.successColor};
  }

  body .Toastify__toast-container .Toastify__toast--error {
    background: ${colors.errorColor};
  }
`;
```

### Responsabilidades do GlobalStyles:

#### 1. **CSS Reset**:

```javascript
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;  // Facilita cálculos de layout
}
```

#### 2. **Configurações Base do Body**:

```javascript
body {
  font-family: sans-serif;           // Tipografia padrão
  color: ${colors.primaryDarkColor}; // Cor de texto principal
  background: ${colors.primaryColor}; // Background da aplicação
}

html, body, #root {
  height: 100%;  // Full height para layouts flexíveis
}
```

#### 3. **Estilos de Elementos Globais**:

```javascript
// Botões padrão
button {
  cursor: pointer;
  background: ${colors.primaryColor};
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 700;
  transition: all 300ms;

  &:hover {
    filter: brightness(85%);  // Efeito hover sutil
  }
}

// Links padrão
a {
  text-decoration: none;
  color: ${colors.primaryColor};
}

// Listas
ul {
  list-style: none;  // Remove bullets por padrão
}
```

#### 4. **Customização de Bibliotecas Externas**:

```javascript
// React Toastify customization
body .Toastify__toast-container .Toastify__toast--success {
  background: ${colors.successColor};
}

body .Toastify__toast-container .Toastify__toast--error {
  background: ${colors.errorColor};
}
```

---

## 🎨 Styled Components Integration

### Padrão de Implementação por Componente:

#### Estrutura Típica (`styled.js`):

```javascript
import styled from 'styled-components';
import * as colors from '../../config/colors';

// Container principal
export const Container = styled.div`
  max-width: 360px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

// Formulário com estilos específicos
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin-top: 5px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }

  button {
    height: 40px;
    background: ${colors.primaryColor};
    color: #fff;
    border: none;
    border-radius: 4px;
    margin-top: 10px;

    &:hover {
      background: ${colors.primaryDarkColor};
    }
  }
`;
```

### Vantagens dos Styled Components:

#### 1. **CSS-in-JS Benefits**:

```javascript
// ✅ Estilos acoplados ao componente
// ✅ Props dinâmicas
// ✅ Temas automáticos
// ✅ Dead code elimination
// ✅ TypeScript support

const Button = styled.button`
  background: ${props => props.primary ? colors.primaryColor : colors.secondaryColor};
  color: ${props => props.primary ? '#fff' : colors.primaryColor};
  padding: ${props => props.large ? '15px 30px' : '10px 20px'};

  ${props => props.disabled && `
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

// Uso:
<Button primary large>Botão Principal</Button>
<Button disabled>Botão Desabilitado</Button>
```

#### 2. **Herança e Extensão**:

```javascript
// Componente base
const BaseButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
`;

// Extensões específicas
export const PrimaryButton = styled(BaseButton)`
  background: ${colors.primaryColor};
  color: white;

  &:hover {
    background: ${colors.primaryDarkColor};
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background: transparent;
  color: ${colors.primaryColor};
  border: 1px solid ${colors.primaryColor};

  &:hover {
    background: ${colors.primaryColor};
    color: white;
  }
`;
```

#### 3. **Conditional Styling**:

```javascript
const MenuButton = styled.button`
  background: transparent;
  color: ${colors.primaryColor};
  padding: 10px;
  border: none;

  // Conditional styling baseado em props
  ${({ active }) =>
    active &&
    `
    background: ${colors.primaryColor};
    color: white;
  `}

  // Media queries integradas
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;
```

---

## 📐 Padrões de Estilização

### 1. **Naming Conventions**:

```javascript
// ✅ Componentes em PascalCase
export const Container = styled.div``;
export const HeaderWrapper = styled.header``;
export const NavigationMenu = styled.nav``;
export const FormContainer = styled.form``;

// ✅ Modifiers com sufixos descritivos
export const ButtonPrimary = styled.button``;
export const ButtonSecondary = styled.button``;
export const ButtonDanger = styled.button``;

// ✅ Estados com prefixos
export const InputFocused = styled.input``;
export const ItemActive = styled.li``;
export const CardHovered = styled.div``;
```

### 2. **Organização de Estilos**:

```javascript
// Ordem recomendada de propriedades
const Component = styled.div`
  /* 1. Positioning */
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;

  /* 2. Display & Box Model */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;

  /* 3. Typography */
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${colors.primaryDarkColor};

  /* 4. Visual */
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: 1;

  /* 5. Animation */
  transition: all 0.3s ease;

  /* 6. Pseudo-classes */
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  /* 7. Pseudo-elements */
  &::before {
    content: '';
    /* ... */
  }

  /* 8. Media queries */
  @media (max-width: 768px) {
    padding: 15px;
  }
`;
```

### 3. **Layout Patterns**:

```javascript
// Container centralizador padrão
export const CenteredContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

// Layout flex padrão
export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

// Grid responsivo
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;
```

---

## 🎭 Temas e Customização

### Sistema de Temas Avançado:

```javascript
// config/themes.js
export const lightTheme = {
  colors: {
    primary: '#C3073F',
    primaryDark: '#950E2E',
    secondary: '#6F2232',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#999999',
    },
  },
  fonts: {
    primary: 'Roboto, sans-serif',
    secondary: 'Open Sans, sans-serif',
    mono: 'Fira Code, monospace',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
      disabled: '#666666',
    },
  },
};
```

### ThemeProvider Integration:

```javascript
// App.js com temas
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './config/themes';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>{/* Rotas */}</Routes>
          </BrowserRouter>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}
```

### Usando Temas nos Componentes:

```javascript
const ThemedButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  border: none;
  border-radius: 4px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;
```

---

## 📱 Responsividade

### Mobile-First Approach:

```javascript
// Base: Mobile (default)
const ResponsiveContainer = styled.div`
  padding: 15px;
  font-size: 14px;

  // Tablet
  @media (min-width: 768px) {
    padding: 20px;
    font-size: 16px;
  }

  // Desktop
  @media (min-width: 1024px) {
    padding: 30px;
    font-size: 18px;
    max-width: 1200px;
    margin: 0 auto;
  }

  // Wide screens
  @media (min-width: 1440px) {
    padding: 40px;
    max-width: 1400px;
  }
`;
```

### Breakpoints Helper:

```javascript
// utils/breakpoints.js
export const device = {
  mobile: `(max-width: 767px)`,
  tablet: `(min-width: 768px) and (max-width: 1023px)`,
  desktop: `(min-width: 1024px)`,
  wide: `(min-width: 1440px)`,
};

// Uso nos styled components
const FlexGrid = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media ${device.desktop} {
    flex-wrap: nowrap;
    gap: 30px;
  }
`;
```

### Container Queries (futuro):

```javascript
// Para quando estiver disponível
const AdaptiveCard = styled.div`
  padding: 1rem;

  @container (min-width: 400px) {
    padding: 2rem;

    h2 {
      font-size: 1.5rem;
    }
  }

  @container (min-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }
`;
```

---

## ⚡ Performance e Otimização

### 1. **CSS Tree Shaking**:

```javascript
// Styled components automaticamente remove CSS não usado
// Apenas estilos de componentes renderizados são incluídos

// ✅ Bom: Conditional rendering
const ConditionalComponent = styled.div`
  ${(props) =>
    props.show &&
    `
    display: block;
    animation: fadeIn 0.3s;
  `}
`;

// ❌ Evitar: Muitas condições complexas
const OverComplexComponent = styled.div`
  ${(props) => {
    if (props.variant === 'primary') return 'background: blue;';
    if (props.variant === 'secondary') return 'background: green;';
    if (props.variant === 'danger') return 'background: red;';
    // ... muitas condições
  }}
`;
```

### 2. **Cache de Estilos**:

```javascript
// Styled components cacheia automaticamente
// Mas você pode otimizar com useMemo para props complexas

const MemoizedStyledComponent = React.memo(styled.div`
  background: ${(props) => props.complexCalculation()};
`);

// Ou usar useMemo no cálculo
const Component = ({ data }) => {
  const computedStyle = useMemo(() => {
    return calculateComplexStyle(data);
  }, [data]);

  return <StyledDiv style={computedStyle} />;
};
```

### 3. **Bundle Size Optimization**:

```javascript
// ✅ Import específico
import styled from 'styled-components';

// ❌ Evitar imports desnecessários
// import styled, { css, keyframes, ThemeProvider } from 'styled-components';
// Importe apenas o que usar

// ✅ Para keyframes, importe separadamente quando necessário
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
```

---

## 🧪 Testing Styles

### 1. **Testing com Jest e Testing Library**:

```javascript
// __tests__/GlobalStyles.test.js
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../GlobalStyles';
import { lightTheme } from '../config/themes';

describe('GlobalStyles', () => {
  it('deve aplicar estilos globais corretamente', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <button>Test Button</button>
      </ThemeProvider>
    );

    const button = container.querySelector('button');
    expect(button).toHaveStyle({
      cursor: 'pointer',
      background: lightTheme.colors.primary,
    });
  });
});
```

### 2. **Snapshot Testing**:

```javascript
import renderer from 'react-test-renderer';
import 'jest-styled-components';

it('deve renderizar styled component corretamente', () => {
  const tree = renderer.create(<StyledButton primary>Click me</StyledButton>).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('background-color', '#C3073F');
});
```

### 3. **Visual Regression Testing** (com Storybook):

```javascript
// stories/Button.stories.js
export default {
  title: 'Components/Button',
  component: StyledButton,
};

export const Primary = () => <StyledButton primary>Primary Button</StyledButton>;
export const Secondary = () => <StyledButton secondary>Secondary Button</StyledButton>;
export const Disabled = () => <StyledButton disabled>Disabled Button</StyledButton>;

// Chromatic ou Percy para visual testing
```

---

## 📋 Best Practices

### ✅ Faça:

- **Consistência**: Use o sistema de cores e espaçamentos
- **Performance**: Evite cálculos complexos inline
- **Responsividade**: Mobile-first approach
- **Temas**: Prepare para dark mode desde o início
- **Naming**: Nomes descritivos e consistentes
- **Modularidade**: Um styled.js por componente
- **Acessibilidade**: Focus states e contraste adequado

### ❌ Evite:

- **Inline Styles**: Use styled components
- **CSS Global Excessivo**: Mantenha específico
- **Props Complexas**: Simplifique lógica de estilização
- **Magic Numbers**: Use variáveis para valores
- **Styling Duplicado**: Crie componentes base reutilizáveis
- **Pseudo-classes Desnecessárias**: Use apenas quando necessário

### 🎨 Exemplo de Estrutura Ideal:

```javascript
// styled.js bem estruturado
import styled from 'styled-components';
import * as colors from '../../config/colors';

// Container base
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Componente flexível
export const Card = styled.article`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

// Estados visuais claros
export const Button = styled.button`
  background: ${colors.primaryColor};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${colors.primaryDarkColor};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ variant }) =>
    variant === 'outline' &&
    `
    background: transparent;
    color: ${colors.primaryColor};
    border: 2px solid ${colors.primaryColor};

    &:hover:not(:disabled) {
      background: ${colors.primaryColor};
      color: white;
    }
  `}
`;
```

---

**🎨 O sistema de estilos com Styled Components oferece flexibilidade, performance e maintainabilidade. Use-o para criar interfaces consistentes, acessíveis e responsivas!**
