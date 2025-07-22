# 🧭 Header Component

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Funcionalidades](#-funcionalidades)
3. [Integração Redux](#-integração-redux)
4. [Estrutura do Código](#-estrutura-do-código)
5. [Estilos e Layout](#-estilos-e-layout)
6. [Como Usar](#-como-usar)
7. [Personalização](#-personalização)

---

## 🎯 Visão Geral

O **Header** é o componente de navegação principal da aplicação. Ele fornece links de navegação com ícones intuitivos e integração com o estado Redux para exibir informações dinâmicas sobre o estado da aplicação.

### Características Principais:

- 🧭 **Navegação Principal**: Links para todas as seções importantes
- 🎯 **Ícones Visuais**: Interface intuitiva com React Icons
- 🔄 **Estado Dinâmico**: Integração com Redux para feedback visual
- 📱 **Design Responsivo**: Adaptável a diferentes tamanhos de tela
- 💅 **Styled Components**: Estilização moderna e componentizada

---

## ✨ Funcionalidades

### 🔗 Links de Navegação

O Header contém três links principais:

1. **🏠 Home** (`/`)
   - Navega para a página inicial (Login)
   - Ícone: `FaHome`
   - Sempre visível

2. **👤 User** (`/user`)
   - Navega para a página do usuário
   - Ícone: `FaUserAlt`
   - Funcionalidade futura para perfil do usuário

3. **🔐 Login** (`/login`)
   - Navega para a página de login
   - Ícone: `FaSignInAlt`
   - Usado também como logout futuro

### 📊 Estado Visual Dinâmico

Exibe o status do botão de login baseado no estado Redux:

- **Botão Ativo**: Quando `botaoLoginClicado === true`
  - Texto: "Botão Ativo"
  - Cor: Branca
  - Classe CSS: `botao-ativo`

- **Botão Inativo**: Quando `botaoLoginClicado === false`
  - Texto: "Botão Inativo"
  - Cor: Branca
  - Classe CSS: `botao-inativo`

---

## 🔄 Integração Redux

### Estado Conectado:

```javascript
const botaoClicado = useSelector((state) => state.botaoLoginClicado.botaoLoginClicado);
```

### Estrutura do Estado:

```javascript
// Estado Redux utilizado pelo Header
state.botaoLoginClicado = {
  botaoLoginClicado: boolean, // Usado pelo Header
  contadorCliques: number,
  loading: boolean,
  error: null,
  dados: null,
};
```

### Dependências Redux:

- `useSelector` para acessar o estado
- Conectado ao slice `botaoClicadoSlice`
- Atualização automática quando o estado muda

---

## 🏗️ Estrutura do Código

### Arquivo Principal (`index.js`):

```javascript
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Nav } from './styled';

export default function Header() {
  // Conecta ao estado Redux
  const botaoClicado = useSelector((state) => state.botaoLoginClicado.botaoLoginClicado);

  return (
    <Nav>
      {/* Links de navegação */}
      <Link to='/' className=''>
        <FaHome size={20} />
      </Link>
      <Link to='/user' className=''>
        <FaUserAlt size={20} />
      </Link>
      <Link to='/login' className=''>
        <FaSignInAlt size={20} />
      </Link>

      {/* Status visual dinâmico */}
      {botaoClicado ? (
        <span className='botao-ativo' style={{ color: 'white' }}>
          Botão Ativo
        </span>
      ) : (
        <span className='botao-inativo' style={{ color: 'white' }}>
          Botão Inativo
        </span>
      )}
    </Nav>
  );
}
```

### Tecnologias Utilizadas:

- **React**: Hook `useSelector` para Redux
- **React Router**: Componente `Link` para navegação
- **React Icons**: Ícones `FaHome`, `FaSignInAlt`, `FaUserAlt`
- **Styled Components**: Componente `Nav` para estilização

---

## 🎨 Estilos e Layout

### Estrutura CSS (styled.js):

```javascript
import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from '../../config/colors';

export const Nav = styled.nav`
  background: ${primaryDarkColor};
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* Links de navegação */
  a {
    color: ${primaryColor};
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(195, 7, 63, 0.1);
      transform: scale(1.1);
    }
  }

  /* Status do botão */
  span {
    font-size: 0.9rem;
    font-weight: 500;
  }

  /* Responsividade */
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;

    span {
      display: none; /* Oculta status em telas pequenas */
    }
  }
`;
```

### Características Visuais:

- **Background**: Cor escura definida em `primaryDarkColor`
- **Layout**: Flexbox com espaçamento distribuído
- **Hover Effects**: Transformações e mudanças de cor
- **Responsividade**: Adaptação para dispositivos móveis
- **Transições**: Animações suaves de 0.3s

---

## 🔧 Como Usar

### Implementação Básica:

```javascript
// Em App.js ou layout principal
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

### Navegação Programática (Exemplo):

```javascript
import { useNavigate } from 'react-router-dom';

function MeuComponente() {
  const navigate = useNavigate();

  const irParaHome = () => {
    navigate('/');
  };

  return <button onClick={irParaHome}>Voltar ao Início</button>;
}
```

---

## 🛠️ Personalização

### 1. **Adicionar Novos Links**:

```javascript
// Adicione no JSX do Header
<Link to='/nova-pagina' className=''>
  <FaNovo size={20} />
</Link>
```

### 2. **Personalizar Estilos**:

```javascript
// Em styled.js
export const Nav = styled.nav`
  /* Seus estilos personalizados */
  background: linear-gradient(45deg, #c3073f, #1a1a1d);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;
```

### 3. **Adicionar Mais Estados Redux**:

```javascript
export default function Header() {
  const botaoClicado = useSelector((state) => state.botaoLoginClicado.botaoLoginClicado);
  const userInfo = useSelector((state) => state.user.info);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Nav>
      {/* Renderização condicional baseada no login */}
      {isLoggedIn ? <span>Bem-vindo, {userInfo.name}!</span> : <span>Faça seu login</span>}
      {/* resto do componente */}
    </Nav>
  );
}
```

### 4. **Adicionar Dropdown ou Menu Mobile**:

```javascript
// Exemplo de menu hamburguer para mobile
const [isMenuOpen, setIsMenuOpen] = useState(false);

return (
  <Nav>
    <MenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <FaBars />
    </MenuToggle>

    <MenuItems isOpen={isMenuOpen}>
      <Link to='/'>Home</Link>
      <Link to='/user'>User</Link>
      <Link to='/login'>Login</Link>
    </MenuItems>
  </Nav>
);
```

---

## 🧪 Exemplos de Uso

### 1. **Header Simples (Atual)**:

```javascript
<Header /> // Renderiza navegação básica com estado Redux
```

### 2. **Header com Props (Futuro)**:

```javascript
<Header
  showStatus={true}
  customLinks={[{ to: '/dashboard', icon: FaDashboard, label: 'Dashboard' }]}
/>
```

### 3. **Header Condicional**:

```javascript
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      {isLoggedIn && <Header />}
      <Routes>{/* rotas */}</Routes>
    </div>
  );
}
```

---

## 🔍 Debugging e Desenvolvimento

### Redux DevTools:

- Monitore `state.botaoLoginClicado.botaoLoginClicado`
- Dispare ações para testar mudanças visuais
- Verifique se o estado persiste após refresh

### Console Logs Úteis:

```javascript
export default function Header() {
  const botaoClicado = useSelector((state) => state.botaoLoginClicado.botaoLoginClicado);

  console.log('Header - botaoClicado:', botaoClicado);

  return (
    // componente
  );
}
```

---

## 📈 Melhorias Futuras

### Funcionalidades Planejadas:

- [ ] Menu dropdown para usuário logado
- [ ] Notificações em tempo real
- [ ] Menu mobile responsivo
- [ ] Breadcrumbs dinâmicos
- [ ] Dark/Light mode toggle
- [ ] Busca global
- [ ] Avatar do usuário

### Otimizações:

- [ ] Lazy loading de ícones
- [ ] Memoização com React.memo
- [ ] Animações com Framer Motion
- [ ] Testes unitários
- [ ] Acessibilidade (ARIA labels)

---

**🔧 Este componente é a base da navegação da aplicação. Personalize conforme suas necessidades, mantendo a consistência visual e funcional com o resto do projeto.**
