# ⚙️ Config

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Arquivos de Configuração](#-arquivos-de-configuração)
3. [Sistema de Cores](#-sistema-de-cores)
4. [Como Usar](#-como-usar)
5. [Personalização](#-personalização)
6. [Boas Práticas](#-boas-práticas)

---

## 🎯 Visão Geral

A pasta `config` contém todas as **configurações centralizadas** da aplicação. Ela armazena constantes, configurações de tema, variáveis de ambiente processadas e outras configurações que são utilizadas em toda a aplicação.

### Objetivos da Centralização:

- 🎨 **Consistência Visual**: Cores e temas padronizados
- 🔧 **Facilidade de Manutenção**: Mudanças em um local afetam toda a aplicação
- 📱 **Responsive Design**: Breakpoints e medidas centralizadas
- 🌈 **Temas Dinâmicos**: Base para implementação de dark/light mode
- ♻️ **Reutilização**: Configurações utilizadas em múltiplos componentes

---

## 📁 Arquivos de Configuração

### 📄 colors.js

Arquivo principal que define toda a **paleta de cores** da aplicação.

#### Estrutura Atual:

```javascript
// Cores primárias
export const primaryColor = '#C3073F'; // Vermelho vibrante
export const primaryDarkColor = '#1A1A1D'; // Preto/cinza escuro

// Cores de feedback
export const successColor = '#1f97f6'; // Azul para sucesso
export const infoColor = '#1f97f6'; // Azul para informações
export const errorColor = '#F2AF29'; // Amarelo para erros
export const warningColor = '#F2AF29'; // Amarelo para avisos
```

#### Paleta de Cores Detalhada:

| Cor                | Código  | Uso Principal                       | Contexto          |
| ------------------ | ------- | ----------------------------------- | ----------------- |
| `primaryColor`     | #C3073F | Elementos principais, botões, links | Destaque e ação   |
| `primaryDarkColor` | #1A1A1D | Background, contêineres             | Base escura       |
| `successColor`     | #1f97f6 | Mensagens de sucesso, confirmações  | Feedback positivo |
| `infoColor`        | #1f97f6 | Informações neutras, tooltips       | Comunicação       |
| `errorColor`       | #F2AF29 | Erros, validações, alertas          | Atenção           |
| `warningColor`     | #F2AF29 | Avisos, pendências                  | Cuidado           |

---

## 🎨 Sistema de Cores

### Hierarquia de Cores:

```
1. Primary (Principal)
   ├── primaryColor (#C3073F) - Elementos de destaque
   └── primaryDarkColor (#1A1A1D) - Backgrounds e bases

2. Feedback (Comunicação)
   ├── successColor (#1f97f6) - Sucesso e confirmações
   ├── infoColor (#1f97f6) - Informações neutras
   ├── errorColor (#F2AF29) - Erros e alertas
   └── warningColor (#F2AF29) - Avisos e cuidados
```

### Aplicação das Cores:

#### Primary Colors:

- **Botões principais** e call-to-actions
- **Links** e elementos interativos
- **Headers** e navegação
- **Ícones** de destaque

#### Feedback Colors:

- **Toast notifications** do react-toastify
- **Mensagens** de validação de formulários
- **Status indicators** em componentes
- **Bordas** de campos com erro/sucesso

---

## 🔧 Como Usar

### Importação Básica:

```javascript
// Importar cores específicas
import { primaryColor, primaryDarkColor } from '../config/colors';

// Importar todas as cores
import * as colors from '../config/colors';
```

### Em Styled Components:

```javascript
import styled from 'styled-components';
import { primaryColor, errorColor } from '../../config/colors';

export const Button = styled.button`
  background: ${primaryColor};
  color: white;
  border: none;

  &:hover {
    background: ${primaryDarkColor};
  }

  &.error {
    background: ${errorColor};
  }
`;
```

### Em CSS Global:

```javascript
import { createGlobalStyle } from 'styled-components';
import { primaryColor, primaryDarkColor } from '../config/colors';

export default createGlobalStyle`
  body {
    background: ${primaryDarkColor};
    color: ${primaryColor};
  }

  button {
    background: ${primaryColor};
  }
`;
```

### Em Componentes React:

```javascript
import React from 'react';
import { primaryColor } from '../../config/colors';

export default function MeuComponente() {
  return <div style={{ backgroundColor: primaryColor }}>Conteúdo com cor primária</div>;
}
```

---

## 🛠️ Personalização

### 1. **Alterando Cores Existentes**:

```javascript
// config/colors.js
export const primaryColor = '#FF6B35'; // Novo laranja
export const primaryDarkColor = '#2D3748'; // Novo cinza
```

### 2. **Adicionando Novas Cores**:

```javascript
// config/colors.js
export const primaryColor = '#C3073F';
export const primaryDarkColor = '#1A1A1D';

// Novas cores personalizadas
export const secondaryColor = '#6C5CE7';
export const lightColor = '#F8F9FA';
export const mutedColor = '#6C757D';
export const dangerColor = '#E17055';

// Cores para dark mode (exemplo)
export const darkModeColors = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#BB86FC',
  secondary: '#03DAC6',
};
```

### 3. **Sistema de Temas**:

```javascript
// config/themes.js
import { primaryColor, primaryDarkColor, successColor, errorColor } from './colors';

export const lightTheme = {
  colors: {
    primary: primaryColor,
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: primaryDarkColor,
    success: successColor,
    error: errorColor,
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Georgia, serif',
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
  },
};

export const darkTheme = {
  colors: {
    primary: primaryColor,
    background: primaryDarkColor,
    surface: '#2D3748',
    text: '#FFFFFF',
    success: successColor,
    error: errorColor,
  },
  fonts: lightTheme.fonts,
  spacing: lightTheme.spacing,
};
```

### 4. **Breakpoints Responsivos**:

```javascript
// config/breakpoints.js
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1440px',
};

export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  largeDesktop: `@media (min-width: ${breakpoints.largeDesktop})`,
};
```

---

## 📱 Exemplos de Uso Avançado

### 1. **Tema Provider**:

```javascript
// contexts/ThemeContext.js
import React, { createContext, useContext } from 'react';
import { lightTheme, darkTheme } from '../config/themes';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, setIsDark }}>{children}</ThemeContext.Provider>
  );
};
```

### 2. **Styled Components com Tema**:

```javascript
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const StyledComponent = styled.div`
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.medium};

  ${(props) => props.theme.mediaQueries.mobile} {
    padding: ${(props) => props.theme.spacing.small};
  }
`;

export default function MeuComponente() {
  const { theme } = useTheme();

  return <StyledComponent theme={theme}>Conteúdo com tema dinâmico</StyledComponent>;
}
```

### 3. **CSS Variables (Alternativa)**:

```javascript
// config/cssVariables.js
export const setCSSVariables = (theme) => {
  const root = document.documentElement;

  root.style.setProperty('--primary-color', theme.colors.primary);
  root.style.setProperty('--background-color', theme.colors.background);
  root.style.setProperty('--text-color', theme.colors.text);
};
```

---

## 📋 Boas Práticas

### ✅ Faça:

- **Centralize** todas as cores em `colors.js`
- **Use nomes semânticos** (`primaryColor`, `errorColor`)
- **Mantenha consistência** em toda a aplicação
- **Documente** o propósito de cada cor
- **Teste** as cores em diferentes contextos
- **Considere acessibilidade** (contraste, daltonismo)

### ❌ Evite:

- Cores hardcoded nos componentes
- Nomes genéricos (`color1`, `blue`)
- Muitas variações da mesma cor
- Cores que não seguem a identidade visual
- Modificar cores sem testar impacto global

### 🎯 Nomenclatura Recomendada:

```javascript
// ✅ Bom: Semântico e descritivo
export const primaryColor = '#C3073F';
export const successColor = '#1f97f6';
export const errorColor = '#F2AF29';

// ❌ Ruim: Genérico e não descritivo
export const color1 = '#C3073F';
export const blue = '#1f97f6';
export const yellow = '#F2AF29';
```

---

## 🔧 Configurações Futuras

### Arquivos Planejados:

- `breakpoints.js` - Media queries responsivos
- `themes.js` - Temas claro/escuro
- `animations.js` - Configurações de animações
- `api.js` - URLs e configurações de API
- `constants.js` - Constantes da aplicação

### Exemplo de Estrutura Expandida:

```
config/
├── colors.js           # ✅ Implementado
├── breakpoints.js      # 📋 Planejado
├── themes.js           # 📋 Planejado
├── animations.js       # 📋 Planejado
├── api.js             # 📋 Planejado
├── constants.js       # 📋 Planejado
└── index.js           # 📋 Barrel export
```

### Exemplo de Barrel Export:

```javascript
// config/index.js
export * from './colors';
export * from './breakpoints';
export * from './themes';
export * from './animations';
export * from './api';
export * from './constants';
```

---

## 🎨 Ferramentas de Design

### Geradores de Paleta:

- [Coolors.co](https://coolors.co/) - Gerador de paletas
- [Adobe Color](https://color.adobe.com/) - Ferramenta profissional
- [Material Design Colors](https://materialui.co/colors/) - Paletas do Material Design

### Teste de Acessibilidade:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

### Simuladores de Daltonismo:

- [Colorblinding.com](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/accessibility/vision-deficiencies/)

---

**🌈 Esta pasta é fundamental para manter a consistência visual da aplicação. Sempre que precisar definir cores, temas ou configurações globais, utilize este sistema centralizado.**
