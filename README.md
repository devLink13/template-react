# Template React - Documentação Completa

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Tecnologias e Dependências](#-tecnologias-e-dependências)
3. [Arquitetura do Projeto](#-arquitetura-do-projeto)
4. [Estrutura de Pastas](#-estrutura-de-pastas)
5. [Configuração e Instalação](#-configuração-e-instalação)
6. [Scripts Disponíveis](#-scripts-disponíveis)
7. [Estado Global (Redux)](#-estado-global-redux)
8. [Sistema de Rotas](#-sistema-de-rotas)
9. [Componentes](#-componentes)
10. [Páginas](#-páginas)
11. [Serviços](#-serviços)
12. [Estilos](#-estilos)  
13. [Funcionalidades Implementadas](#-funcionalidades-implementadas)
14. [Como Usar Este Template](#-como-usar-este-template)
15. [Padrões de Código](#-padrões-de-código)
16. [Estrutura Detalhada](#-estrutura-detalhada)

---

## 🎯 Visão Geral

Este é um template React completo e robusto, desenvolvido para servir como base para aplicações React modernas. O template inclui uma arquitetura bem estruturada com gerenciamento de estado Redux, sistema de roteamento, autenticação, persistência de dados, e muito mais.

### Características Principais:

- ⚛️ **React 19** com hooks modernos
- 🗂️ **Redux Toolkit** para gerenciamento de estado
- 🔄 **Redux Saga** para efeitos colaterais
- 💾 **Redux Persist** para persistência do estado
- 🛣️ **React Router** para navegação
- 💅 **Styled Components** para estilização
- 🌐 **Axios** para requisições HTTP
- 🔔 **React Toastify** para notificações
- 📱 **Responsive Design**
- 🔒 **Sistema de Autenticação** (estrutura pronta)
- ✨ **ESLint** para qualidade de código

---

## 📦 Tecnologias e Dependências

### Dependências Principais:

```json
{
  "@reduxjs/toolkit": "^2.8.2", // Redux moderno e simplificado
  "axios": "^1.10.0", // Cliente HTTP
  "history": "^5.3.0", // Gerenciamento de histórico de navegação
  "prop-types": "^15.8.1", // Validação de props
  "react": "^19.1.0", // Biblioteca principal
  "react-dom": "^19.1.0", // DOM virtual
  "react-icons": "^5.5.0", // Ícones
  "react-redux": "^9.2.0", // Integração React + Redux
  "react-router-dom": "^7.7.0", // Roteamento
  "react-scripts": "5.0.1", // Scripts de build
  "react-toastify": "^11.0.5", // Notificações
  "redux": "^5.0.1", // Gerenciamento de estado
  "redux-persist": "^6.0.0", // Persistência do estado
  "redux-saga": "^1.3.0", // Middleware para efeitos colaterais
  "styled-components": "^6.1.19", // CSS-in-JS
  "web-vitals": "^2.1.4" // Métricas de performance
}
```

### Dependências de Teste:

```json
{
  "@testing-library/dom": "^10.4.0",
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/react": "^16.3.0",
  "@testing-library/user-event": "^13.5.0"
}
```

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura baseada em **Feature-Based Organization** combinada com **Domain-Driven Design**, proporcionando:

### Princípios Arquiteturais:

1. **Separação de Responsabilidades**: Cada pasta tem uma responsabilidade específica
2. **Reutilização**: Componentes e serviços reutilizáveis
3. **Escalabilidade**: Estrutura que suporta crescimento do projeto
4. **Manutenibilidade**: Código organizado e documentado
5. **Testabilidade**: Estrutura que facilita a criação de testes

### Fluxo de Dados:

```
UI Components → Actions → Sagas → API → Reducers → State → UI Components
```

---

## 📁 Estrutura de Pastas

```
template-react/
├── 📁 public/                    # Arquivos públicos estáticos
│   └── index.html               # HTML principal da aplicação
├── 📁 src/                      # Código fonte da aplicação
│   ├── 📄 App.js               # Componente raiz da aplicação
│   ├── 📄 index.js             # Ponto de entrada da aplicação
│   ├── 📁 components/          # Componentes reutilizáveis
│   │   └── 📁 Header/          # Componente de cabeçalho
│   ├── 📁 config/              # Configurações da aplicação
│   │   └── 📄 colors.js        # Paleta de cores do projeto
│   ├── 📁 pages/               # Páginas da aplicação
│   │   ├── 📁 Login/           # Página de login
│   │   └── 📁 Page404/         # Página de erro 404
│   ├── 📁 routes/              # Sistema de roteamento
│   │   ├── 📄 index.js         # Configuração das rotas
│   │   └── 📄 MyRoute.js       # Componente de rota personalizada
│   ├── 📁 services/            # Serviços externos
│   │   ├── 📄 axios.js         # Configuração do Axios
│   │   └── 📄 history.js       # Histórico de navegação
│   ├── 📁 store/               # Gerenciamento de estado Redux
│   │   ├── 📄 index.js         # Configuração da store
│   │   ├── 📁 reduxPersist/    # Configuração de persistência
│   │   ├── 📁 sagas/           # Redux Saga para efeitos colaterais
│   │   └── 📁 slices/          # Redux slices (reducers + actions)
│   └── 📁 styles/              # Estilos globais
│       └── 📄 GlobalStyles.js  # Estilos CSS globais
├── 📄 eslint.config.mjs        # Configuração do ESLint
└── 📄 package.json             # Dependências e scripts
```

---

## ⚙️ Configuração e Instalação

### Pré-requisitos:

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação:

```bash
# Clone o repositório (ou copie o template)
git clone <repository-url>
cd template-react

# Instale as dependências
npm install

# Ou usando yarn
yarn install
```

### Configuração Inicial:

1. **API Base URL**: Edite `src/services/axios.js` para configurar a URL da sua API
2. **Cores**: Personalize as cores em `src/config/colors.js`
3. **Rotas**: Configure suas rotas em `src/routes/index.js`

---

## 🚀 Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento
npm start

# Cria build de produção
npm run build

# Executa os testes
npm test

# Ejeta a configuração do Create React App (irreversível)
npm run eject
```

### Comandos Detalhados:

- `npm start`: Inicia a aplicação em modo desenvolvimento na porta 3000
- `npm run build`: Gera versão otimizada para produção na pasta `build/`
- `npm test`: Executa os testes em modo watch
- `npm run eject`: Expõe configurações do webpack (use com cautela)

---

## 🗄️ Estado Global (Redux)

### Configuração da Store:

O projeto utiliza **Redux Toolkit** com **Redux Saga** e **Redux Persist** para:

- Gerenciamento de estado centralizado
- Persistência automática do estado
- Tratamento de efeitos colaterais (API calls, etc.)

### Estrutura do Estado:

```javascript
{
  example: {
    clickCount: 0
  },
  botaoLoginClicado: {
    botaoLoginClicado: false,
    contadorCliques: 0,
    loading: false,
    error: null,
    dados: null
  }
}
```

### Como Adicionar Novo Estado:

1. Crie um novo slice em `src/store/slices/`
2. Adicione o reducer em `src/store/index.js`
3. Crie sagas se necessário em `src/store/sagas/`

---

## 🛣️ Sistema de Rotas

### Características:

- **React Router DOM v7** para navegação
- **Rotas Protegidas**: Sistema de autenticação integrado
- **Rota 404**: Página para URLs não encontradas
- **Histórico Personalizado**: Controle programático da navegação

### Estrutura de Rotas:

- `/` - Página inicial (Login)
- `/user` - Página do usuário (proteção implementada)
- `/login` - Página de login
- `*` - Página 404 para rotas não encontradas

### Como Adicionar Nova Rota:

```javascript
// Em src/routes/index.js
<Route path='/nova-rota' element={<MyRoute element={<NovaPagina />} isClosed={true} />} />
```

---

## 🧩 Componentes

### Componentes Implementados:

#### Header

- **Localização**: `src/components/Header/`
- **Funcionalidade**: Navegação principal com ícones
- **Integração Redux**: Exibe estado do botão de login
- **Responsivo**: Adaptável a diferentes telas

### Como Criar Novos Componentes:

1. Crie pasta em `src/components/NomeComponente/`
2. Adicione `index.js` (lógica) e `styled.js` (estilos)
3. Implemente PropTypes para validação
4. Documente o componente

---

## 📄 Páginas

### Páginas Implementadas:

#### Login (`/`)

- Página principal com exemplo de integração Redux
- Botão que dispara actions e sagas
- Loading states e error handling
- Styled components para estilização

#### Page404 (`*`)

- Página de erro para rotas não encontradas
- Design consistente com o projeto
- Navegação de retorno

### Como Adicionar Novas Páginas:

1. Crie pasta em `src/pages/NomePagina/`
2. Implemente `index.js` e `styled.js`
3. Adicione a rota em `src/routes/index.js`
4. Configure proteção se necessário

---

## 🔧 Serviços

### Axios Configuration

- **URL Base**: Configurável em `src/services/axios.js`
- **Interceptors**: Pronto para implementar auth tokens
- **Error Handling**: Tratamento centralizado de erros

### History Service

- **Navegação Programática**: Controle do histórico de navegação
- **Integration**: Conectado com Redux para navegação via actions

---

## 🎨 Estilos

### Sistema de Cores:

```javascript
primaryColor: '#C3073F'; // Vermelho principal
primaryDarkColor: '#1A1A1D'; // Preto/cinza escuro
successColor: '#1f97f6'; // Azul sucesso
errorColor: '#F2AF29'; // Amarelo erro/warning
```

### Styled Components:

- **CSS-in-JS**: Estilos componentizados
- **Tema Global**: Cores e estilos reutilizáveis
- **Responsividade**: Media queries integradas
- **Props Dinâmicas**: Estilos baseados em props

### Global Styles:

- Reset CSS completo
- Estilos base para elementos HTML
- Integração com React Toastify
- Variáveis CSS para consistência

---

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação (Estrutura)

- Sistema de rotas protegidas
- Redirecionamento automático
- Estado de login no Redux
- Histórico de navegação preservado

### 🔔 Notificações

- React Toastify integrado
- Configuração global
- Estilos personalizados
- Auto-close configurável

### 💾 Persistência

- Estado Redux persistido no localStorage
- Configuração customizável
- Loading state durante hidratação
- Blacklist/Whitelist de estados

### 🔄 Loading States

- Estados de carregamento integrados
- UI feedback para operações assíncronas
- Error handling completo
- Retry mechanisms (estrutura pronta)

---

## 📖 Como Usar Este Template

### 1. Setup Inicial:

```bash
# Instale as dependências
npm install

# Configure sua API
# Edite src/services/axios.js com sua URL base
```

### 2. Personalizações Básicas:

```javascript
// src/config/colors.js - Altere as cores do projeto
export const primaryColor = '#SUA_COR';

// src/App.js - Adicione novos providers se necessário
// src/routes/index.js - Configure suas rotas
```

### 3. Adicionando Funcionalidades:

#### Nova Página:

1. Crie `src/pages/MinhaPage/index.js`
2. Crie `src/pages/MinhaPage/styled.js`
3. Adicione rota em `src/routes/index.js`

#### Novo Componente:

1. Crie `src/components/MeuComponente/index.js`
2. Crie `src/components/MeuComponente/styled.js`
3. Implemente PropTypes

#### Novo Estado Redux:

1. Crie `src/store/slices/meuSlice.js`
2. Adicione em `src/store/index.js`
3. Crie saga se necessário

### 4. Integração com API:

```javascript
// src/services/axios.js
export default axios.create({
  baseURL: 'https://sua-api.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## 📋 Padrões de Código

### Estrutura de Arquivos:

```
ComponenteName/
├── index.js      # Lógica do componente
├── styled.js     # Estilos com styled-components
└── README.md     # Documentação específica
```

### Convenções de Nomenclatura:

- **Componentes**: PascalCase (`MyComponent`)
- **Arquivos**: camelCase (`myFile.js`)
- **Pastas**: PascalCase para componentes, camelCase para outros
- **Actions**: camelCase (`buttonClicked`)
- **Constantes**: UPPER_SNAKE_CASE (`API_URL`)

### Boas Práticas:

- Sempre use PropTypes para validação
- Documente componentes complexos
- Mantenha componentes pequenos e focados
- Use hooks para lógica de estado
- Implemente loading e error states
- Teste funcionalidades críticas

---

## 🗂️ Estrutura Detalhada

### Cada pasta contém um README.md específico com:

- **`/src/components/`**: Documentação dos componentes reutilizáveis
- **`/src/config/`**: Configurações e constantes do projeto
- **`/src/pages/`**: Documentação das páginas da aplicação
- **`/src/routes/`**: Sistema de roteamento e navegação
- **`/src/services/`**: Serviços externos e configurações de API
- **`/src/store/`**: Gerenciamento de estado Redux completo
- **`/src/styles/`**: Sistema de estilos e temas

### Links para Documentação Específica:

- [📁 Components](./src/components/README.md)
- [📁 Config](./src/config/README.md)
- [📁 Pages](./src/pages/README.md)
- [📁 Routes](./src/routes/README.md)
- [📁 Services](./src/services/README.md)
- [📁 Store](./src/store/README.md)
- [📁 Styles](./src/styles/README.md)

---

## 📞 Suporte

Para dúvidas ou problemas com este template:

1. Verifique a documentação específica de cada pasta
2. Consulte os exemplos implementados
3. Verifique o console do navegador para erros
4. Revise a configuração do Redux DevTools

---

## 📋 Checklist de Uso

### Antes de Começar:

- [ ] Node.js instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] URL da API configurada
- [ ] Cores personalizadas (opcional)

### Desenvolvimento:

- [ ] Servidor rodando (`npm start`)
- [ ] Redux DevTools configurado
- [ ] ESLint funcionando
- [ ] Rotas testadas

### Produção:

- [ ] Build gerado (`npm run build`)
- [ ] Variáveis de ambiente configuradas
- [ ] API de produção configurada
- [ ] Testes executados

---

**📝 Nota**: Este template é um ponto de partida robusto para aplicações React. Personalize conforme suas necessidades e mantenha a estrutura organizacional para facilitar a manutenção e escalabilidade do projeto.
