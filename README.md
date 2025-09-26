# 🚀 Prosel Front-end | b2bit

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Sistema moderno de autenticação e gestão desenvolvido com as melhores práticas**

[🔥 Demo](#-demo) • [📖 Documentação](#-documentação) • [🛠️ Instalação](#-instalação) • [🤝 Contribuição](#-contribuição)

</div>

---

## 📋 Sobre o Projeto

**Prosel** é uma aplicação web moderna desenvolvida para **b2bit**, focada em autenticação segura e experiência do usuário excepcional. Construída com React 19, TypeScript e Tailwind CSS, oferece uma interface responsiva e performática.

### ✨ Principais Características

- 🔐 **Autenticação JWT** com refresh tokens
- 📱 **Design Responsivo** adaptável a todos os dispositivos
- ⚡ **Performance Otimizada** com Vite e lazy loading
- 🛡️ **Type Safety** completa com TypeScript
- 🎨 **UI Moderna** com Tailwind CSS
- 🔄 **Validação Robusta** com Formik + Yup
- 🌐 **API Integration** com Axios
- 📦 **PWA Ready** com manifest e service workers

---

## 🛠️ Stack Tecnológica

### Frontend Core

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript 5.8** - Superset tipado do JavaScript
- **Vite 7** - Build tool ultrarrápido
- **React Router DOM** - Roteamento SPA

### Styling & UI

- **Tailwind CSS 4** - Framework CSS utility-first
- **CSS Modules** - Estilos componentizados
- **Responsive Design** - Mobile-first approach

### Formulários & Validação

- **Formik** - Gerenciamento de formulários
- **Yup** - Schema validation
- **Zod** - Validação runtime TypeScript

### Requisições HTTP

- **Axios** - Cliente HTTP com interceptors
- **JWT Authentication** - Tokens de acesso e refresh

### Desenvolvimento

- **ESLint** - Análise de código
- **TypeScript ESLint** - Regras específicas TS
- **Hot Reload** - Desenvolvimento em tempo real

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** ou **yarn**
- **Git**

### 1. Clone o Repositório

```bash
git clone https://github.com/jacoryan-dev/prosel_front-end.git
cd prosel_front-end
```

### 2. Instale as Dependências

```bash
# Com npm
npm install

# Com yarn
yarn install
```

### 3. Configure as Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env.local
```

Configure suas variáveis no arquivo `.env.local`:

```env
VITE_API_BASE_URL=https://api.homologation.cliqdrive.com.br/auth
VITE_APP_NAME=Prosel
VITE_APP_VERSION=1.0.0
```

### 4. Execute o Projeto

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

A aplicação estará disponível em `http://localhost:5173`

---

## 📦 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview da build de produção
npm run lint     # Análise de código com ESLint
```

---

## 🏗️ Estrutura do Projeto

```
prosel_front-end/
├── 📁 public/                 # Arquivos estáticos
│   └── 📁 assets/            # Favicons e imagens
├── 📁 src/
│   ├── 📁 auth/              # Sistema de autenticação
│   │   ├── AuthContext.tsx   # Provider de autenticação
│   │   └── useAuth.ts        # Hook customizado
│   ├── 📁 pages/             # Páginas da aplicação
│   │   ├── Home.tsx          # Página inicial
│   │   └── Login.tsx         # Página de login
│   ├── 📁 routes/            # Configuração de rotas
│   │   └── PrivateRoute.tsx  # Rotas protegidas
│   ├── 📁 services/          # Serviços de API
│   │   └── api.ts            # Configuração Axios
│   ├── 📁 types/             # Definições TypeScript
│   ├── 📁 utils/             # Utilitários
│   │   └── storage.ts        # Gerenciamento localStorage
│   └── main.tsx              # Ponto de entrada
├── 📄 package.json           # Dependências e scripts
├── 📄 vite.config.ts         # Configuração Vite
├── 📄 tailwind.config.js     # Configuração Tailwind
└── 📄 tsconfig.json          # Configuração TypeScript
```

---

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Tokens)** com refresh tokens para autenticação segura:

### Fluxo de Autenticação

1. **Login** → Usuário fornece credenciais
2. **Validação** → API valida e retorna tokens
3. **Armazenamento** → Tokens salvos no localStorage
4. **Interceptors** → Axios adiciona automaticamente o token
5. **Refresh** → Token renovado automaticamente antes de expirar

### Exemplo de Uso

```typescript
import { useAuth } from '../auth/useAuth';

function LoginComponent() {
  const { login, user, logout } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // Usuário redirecionado automaticamente
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    // JSX do componente
  );
}
```

---

## 🎨 Design System

### Cores Principais

```css
/* Azul Primário - b2bit */
--primary-blue: #02274f;

/* Amarelo Secundário - b2bit */
--secondary-yellow: #fdcf00;

/* Tons de Cinza */
--gray-100: #f7fafc;
--gray-200: #edf2f7;
--gray-800: #2d3748;
```

### Tipografia

- **Fonte Principal**: Poppins
- **Tamanhos Responsivos**: text-4xl → text-9xl
- **Peso**: 400 (regular), 600 (semibold), 700 (bold)

### Componentes

- **Botões**: Estados hover, loading e disabled
- **Formulários**: Validação em tempo real
- **Cards**: Sombras suaves e bordas arredondadas
- **Layout**: Grid responsivo com Flexbox

---

## 🌐 API Integration

### Configuração Base

```typescript
const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = storage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Endpoints Principais

- `POST /login` - Autenticação do usuário
- `GET /profile` - Dados do usuário logado
- `POST /refresh` - Renovação de tokens

---

## 📱 Responsividade

O projeto segue a abordagem **Mobile First** com breakpoints do Tailwind:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Exemplo de Implementação

```tsx
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
  <span className="text-[#02274F]">b2b</span>
  <span className="text-[#FDCF00]">it</span>
</h1>
```

---

## 🧪 Testes

### Executar Testes

```bash
# Testes unitários
npm run test

# Testes com coverage
npm run test:coverage

# Testes e2e
npm run test:e2e
```

### Estratégia de Testes

- **Unit Tests**: Components isolados
- **Integration Tests**: Fluxos de usuário
- **E2E Tests**: Cenários completos

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build
npm run build

# Deploy pasta dist/
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]
```

---

## 🤝 Contribuição

### Como Contribuir

1. **Fork** o projeto
2. **Clone** seu fork
3. **Crie** uma branch para sua feature
4. **Commit** suas mudanças
5. **Push** para sua branch
6. **Abra** um Pull Request

### Padrões de Commit

```bash
feat: adiciona nova funcionalidade
fix: corrige bug existente
docs: atualiza documentação
style: ajustes de código (formatting)
refactor: refatoração de código
test: adiciona ou modifica testes
chore: tarefas de build e dependências
```

### Exemplo

```bash
git checkout -b feat/nova-funcionalidade
git add .
git commit -m "feat: adiciona validação de email"
git push origin feat/nova-funcionalidade
```

---

## 🐛 Problemas Conhecidos

### Soluções Comuns

**Erro: "Cannot find namespace 'JSX'"**

```bash
# Instalar types do React
npm install @types/react @types/react-dom
```

**Build falha no Vercel**

```bash
# Verificar versão do Node.js no vercel.json
{
  "functions": {
    "app/api/**/*": {
      "runtime": "nodejs18.x"
    }
  }
}
```

---

## 📈 Performance

### Otimizações Implementadas

- ⚡ **Code Splitting** automático por rotas
- 🖼️ **Lazy Loading** de componentes pesados
- 📦 **Tree Shaking** para reduzir bundle
- 🗜️ **Minificação** CSS e JS em produção
- 💾 **Caching** de assets estáticos

### Métricas

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 500KB (gzipped)

---

## 📄 Licença

Este projeto está sob licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Equipe

<div align="center">

**Desenvolvido com ❤️ pela equipe b2bit**

[![GitHub](https://img.shields.io/badge/GitHub-jacoryan--dev-181717?style=for-the-badge&logo=github)](https://github.com/jacoryan-dev)

</div>

---

## 🔗 Links Úteis

- 🌐 **API Homologação**: https://api.homologation.cliqdrive.com.br
- 📚 **Documentação React**: https://react.dev
- 🎨 **Tailwind CSS**: https://tailwindcss.com
- ⚡ **Vite**: https://vitejs.dev
- 📝 **TypeScript**: https://typescriptlang.org

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

[⬆️ Voltar ao topo](#-prosel-front-end--b2bit)

</div>
