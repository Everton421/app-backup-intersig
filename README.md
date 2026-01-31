# 📦 Gerenciador de Backups

Sistema web moderno desenvolvido em Next.js para gerenciamento completo de backups de clientes, permitindo monitoramento, filtragem avançada e controle de configurações de backup em tempo real.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Estrutura de Rotas](#estrutura-de-rotas)
- [Autenticação](#autenticação)
- [API e Integração](#api-e-integração)
- [Deploy](#deploy)
- [Desenvolvimento](#desenvolvimento)

## 🎯 Sobre o Projeto

O **Gerenciador de Backups** é uma aplicação web full-stack desenvolvida para facilitar o gerenciamento e monitoramento de backups de múltiplos clientes. O sistema oferece:

- **Visualização centralizada** de todos os backups de clientes
- **Filtros avançados** para busca e organização de dados
- **Gerenciamento de clientes** com informações detalhadas
- **Controle de usuários** do sistema
- **Interface responsiva** com suporte a tema claro/escuro
- **Autenticação segura** com tokens JWT

## 🛠 Tecnologias Utilizadas

### Core
- **[Next.js 15.5.3](https://nextjs.org/)** - Framework React com App Router
- **[React 19.1.0](https://react.dev/)** - Biblioteca JavaScript para interfaces
- **[TypeScript 5](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática

### UI/UX
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis e não estilizados
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI construídos com Radix UI e Tailwind
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Tabler Icons](https://tabler.io/icons)** - Biblioteca de ícones
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Sistema de temas (claro/escuro)

### Funcionalidades
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições à API
- **[TanStack Table](https://tanstack.com/table)** - Tabelas poderosas e flexíveis
- **[Recharts](https://recharts.org/)** - Biblioteca de gráficos para React
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[Sonner](https://sonner.emilkowal.ski/)** - Sistema de notificações toast
- **[DnD Kit](https://dndkit.com/)** - Biblioteca de drag and drop

### Ferramentas de Desenvolvimento
- **[Turbopack](https://turbo.build/pack)** - Bundler de alta performance (Next.js)
- **[PM2](https://pm2.keymetrics.io/)** - Gerenciador de processos para produção

## ✨ Funcionalidades

### 🔐 Autenticação
- Login seguro com email e senha
- Armazenamento de token JWT no localStorage
- Proteção de rotas com verificação de autenticação
- Context API para gerenciamento de estado de autenticação

### 📊 Página de Backups
- Visualização de todos os backups de clientes
- **Filtros avançados:**
  - Busca por texto livre
  - Filtro por status (ativo/inativo)
  - Filtro por configuração de backup
  - Ordenação por múltiplos critérios (data último backup, hora agenda, código, nome fantasia)
  - Agrupamento por host, código ou nome do banco
- Tabela interativa com informações detalhadas
- Indicadores de status de backup (finalizado, em andamento, erro, pendente)
- Edição de configurações de backup

### 👥 Gerenciamento de Clientes
- Listagem completa de clientes cadastrados
- Filtros por:
  - Status (ativo/inativo)
  - Nível de acesso (L - Leitura, B - Backup, A - Administrador)
  - Busca por texto
- Visualização de informações detalhadas:
  - Dados cadastrais (CNPJ, endereço, contato)
  - Configurações de conexão (SSH, MySQL, TeamViewer, VNC)
  - Versões de sistemas instalados
  - Informações de backup (caminho, horário agendado, último backup)
- Edição de dados do cliente

### 👤 Gerenciamento de Usuários
- Listagem de usuários do sistema
- Visualização de informações básicas (nome, email)
- Edição de usuários

### 🎨 Interface
- **Design moderno e responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- **Tema claro/escuro** - Suporte completo a ambos os temas
- **Sidebar colapsável** - Navegação intuitiva
- **Componentes reutilizáveis** - Arquitetura baseada em componentes
- **Loading states** - Indicadores visuais durante carregamento
- **Tratamento de erros** - Mensagens claras para o usuário

## 📁 Estrutura do Projeto

```
app-backups/
├── public/                    # Arquivos estáticos
│   ├── images/               # Imagens (logo, ícones)
│   └── ...
├── src/
│   ├── app/                  # App Router do Next.js
│   │   ├── @types/           # Definições de tipos TypeScript
│   │   │   └── clients.ts    # Tipos relacionados a clientes
│   │   ├── backups/          # Página de backups
│   │   │   └── page.tsx
│   │   ├── clientes/         # Página de clientes
│   │   │   └── page.tsx
│   │   ├── usuarios/         # Página de usuários
│   │   │   └── page.tsx
│   │   ├── login/            # Página de login
│   │   │   └── page.tsx
│   │   ├── contexts/         # Contextos React
│   │   │   └── AuthContext.tsx  # Contexto de autenticação
│   │   ├── services/         # Serviços
│   │   │   └── api.ts        # Configuração do Axios
│   │   ├── layout.tsx        # Layout principal
│   │   ├── page.tsx          # Página inicial (redirecionamento)
│   │   └── globals.css       # Estilos globais
│   ├── components/           # Componentes React
│   │   ├── ui/               # Componentes UI base (shadcn/ui)
│   │   ├── alert/            # Componente de alerta
│   │   ├── app-sidebar.tsx   # Sidebar principal
│   │   ├── login-form.tsx    # Formulário de login
│   │   ├── nav-*.tsx         # Componentes de navegação
│   │   ├── site-header.tsx   # Cabeçalho do site
│   │   ├── table-*.tsx       # Componentes de tabela
│   │   ├── drawer-edit-*/    # Drawers de edição
│   │   ├── select-*/         # Componentes de seleção
│   │   └── ...
│   ├── hooks/                # Custom hooks
│   │   └── use-mobile.ts     # Hook para detectar mobile
│   ├── lib/                  # Utilitários
│   │   └── utils.ts          # Funções utilitárias
│   └── providers/            # Providers React
│       └── theme-provider.tsx # Provider de tema
├── certificates/             # Certificados SSL (se necessário)
├── ecosystem.config.js       # Configuração PM2
├── next.config.ts            # Configuração Next.js
├── package.json              # Dependências e scripts
├── tsconfig.json             # Configuração TypeScript
└── README.md                 # Este arquivo
```

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **[Node.js](https://nodejs.org/)** (versão 18 ou superior)
- **[npm](https://www.npmjs.com/)** ou **[yarn](https://yarnpkg.com/)** ou **[pnpm](https://pnpm.io/)**
- Backend API rodando e acessível (padrão: `http://localhost:3333`)

## 🚀 Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd app-backups
```

2. **Instale as dependências:**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente:**
Crie um arquivo `.env.local` na raiz do projeto (veja seção [Variáveis de Ambiente](#variáveis-de-ambiente))

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

5. **Acesse a aplicação:**
Abra [http://localhost:8000](http://localhost:8000) no seu navegador

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL da API Backend
NEXT_PUBLIC_URL_API=https://192.168.100.106:3333
```

**Nota:** Se `NEXT_PUBLIC_URL_API` não for definida, o sistema usará `https://192.168.100.106:3333` como padrão.

### Configuração do Next.js

O arquivo `next.config.ts` está configurado com:
- **Rewrites** para proxy de requisições para o backend (desenvolvimento)
- Suporte a certificados SSL customizados

### Configuração do PM2 (Produção)

O arquivo `ecosystem.config.js` está configurado para:
- Executar na porta 8000
- Auto-restart em caso de falha
- Limite de memória de 1GB
- Ambiente de produção

## 📜 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento na porta 8000 com Turbopack habilitado.

### Build de Produção
```bash
npm run build
```
Cria uma build otimizada para produção usando Turbopack.

### Iniciar Produção
```bash
npm start
```
Inicia o servidor de produção na porta 8000 (requer build prévio).

### Com PM2
```bash
# Iniciar
pm2 start ecosystem.config.js

# Parar
pm2 stop app-backups

# Reiniciar
pm2 restart app-backups

# Ver logs
pm2 logs app-backups

# Monitorar
pm2 monit
```

## 🛣 Estrutura de Rotas

### Rotas Públicas
- `/` - Página inicial (redireciona para `/backups` ou `/login` baseado na autenticação)
- `/login` - Página de login

### Rotas Protegidas (requerem autenticação)
- `/backups` - Visualização e gerenciamento de backups
- `/clientes` - Gerenciamento de clientes
- `/usuarios` - Gerenciamento de usuários

Todas as rotas protegidas verificam automaticamente a autenticação e redirecionam para `/login` se o usuário não estiver autenticado.

## 🔐 Autenticação

O sistema utiliza autenticação baseada em tokens JWT:

1. **Login:**** O usuário faz login através do endpoint `/login` da API
2. **Token:** O token JWT retornado é armazenado no `localStorage` como `authUser`
3. **Context:** O `AuthContext` gerencia o estado de autenticação globalmente
4. **Proteção:** Todas as requisições à API incluem o token no header `Authorization`
5. **Logout:** Remove o token do `localStorage` e redireciona para `/login`

### Estrutura do Token
```typescript
{
  nome: string,
  token: string,
  codigo: number
}
```

## 🔌 API e Integração

### Configuração da API

O arquivo `src/app/services/api.ts` configura o cliente Axios:

- **Base URL:** Configurável via `NEXT_PUBLIC_URL_API`
- **Interceptors:** Preparados para adicionar tokens de autenticação
- **SSL:** Suporte a certificados customizados

### Endpoints Utilizados

#### Autenticação
- `POST /login` - Autenticação de usuário
  - Body: `{ email: string, senha: string }`
  - Response: `{ token: string }`

#### Clientes
- `GET /clientes` - Lista clientes
  - Headers: `Authorization: <token>`
  - Query params:
    - `search`: string (busca)
    - `orderBy`: string (campo de ordenação)
    - `ativo`: 'S' | 'N'
    - `acesso`: 'L' | 'B' | 'A'
    - `efetuar_backup`: 'S' | 'N'
    - `groupBy`: 'host' | 'codigo' | 'nomeBanco'

#### Usuários
- `GET /usuarios` - Lista usuários
  - Headers: `Authorization: <token>`

### Tratamento de Erros

O sistema trata os seguintes cenários:
- **Erro 400:** Erro de validação (exibe mensagem da API)
- **Erro 500:** Erro interno do servidor
- **Erro de conexão:** Erro ao conectar com a API
- **Token inválido/expirado:** Redireciona para login

## 🚀 Deploy

### Deploy na Vercel (Recomendado)

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente na dashboard da Vercel
3. O deploy será automático a cada push

### Deploy com PM2

1. **Build do projeto:**
```bash
npm run build
```

2. **Iniciar com PM2:**
```bash
pm2 start ecosystem.config.js
```

3. **Configurar PM2 para iniciar no boot:**
```bash
pm2 startup
pm2 save
```

### Deploy Docker (Opcional)

Você pode criar um `Dockerfile` para containerizar a aplicação:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["npm", "start"]
```

## 💻 Desenvolvimento

### Convenções de Código

- **TypeScript:** Todo o código é tipado
- **Componentes:** Utilizam a convenção PascalCase
- **Arquivos:** Utilizam kebab-case
- **Hooks:** Prefixo `use-` (ex: `use-mobile.ts`)

### Estrutura de Componentes

Os componentes seguem a estrutura:
- Componentes UI base em `src/components/ui/`
- Componentes de negócio em `src/components/`
- Páginas em `src/app/[rota]/page.tsx`

### Adicionando Novos Componentes

1. Crie o componente em `src/components/`
2. Se for um componente UI base, adicione em `src/components/ui/`
3. Exporte e importe conforme necessário

### Debugging

- Use `console.log` para debug (remover em produção)
- Utilize as DevTools do React para inspecionar componentes
- Verifique o Network tab para requisições à API

## 📝 Notas Importantes

- O sistema utiliza **Turbopack** para builds mais rápidos
- A porta padrão é **8000** (configurável)
- O backend deve estar rodando e acessível para o sistema funcionar
- Certificados SSL customizados podem ser colocados na pasta `certificates/`
- O tema padrão é **light**, mas o usuário pode alternar

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e proprietário.

## 👨‍💻 Autor

Desenvolvido para gerenciamento interno de backups.

---

**Versão:** 0.1.0  
**Última atualização:** 2024
