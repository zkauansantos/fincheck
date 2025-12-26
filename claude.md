# FinCheck - Personal Finance Management Application

## 📋 Visão Geral

**FinCheck** é uma aplicação web full-stack de gestão financeira pessoal que permite aos usuários rastrear suas finanças gerenciando contas bancárias, transações e categorias de despesas/receitas. A aplicação oferece uma interface intuitiva para monitorar gastos e receitas em múltiplas contas bancárias com recursos de categorização.

## 🛠 Stack Tecnológica

### Frontend (`/fe`)
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite (com SWC compiler)
- **Roteamento**: React Router DOM v6
- **Gerenciamento de Estado**: React Query (TanStack)
- **Formulários**: React Hook Form + Zod (validação)
- **UI Components**:
  - Radix UI (dialog, dropdown, popover, select, icons)
  - Headless UI
- **Estilização**: TailwindCSS com Tailwind Merge
- **Bibliotecas Auxiliares**:
  - Axios (HTTP client)
  - date-fns (utilitários de data)
  - react-day-picker (calendário)
  - react-hot-toast (notificações)
  - react-number-format (formatação de moeda)
  - Swiper (carousel)

### Backend (`/api`)
- **Framework**: NestJS + TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Autenticação**: JWT (JSON Web Tokens)
- **Segurança**: bcryptjs (hash de senhas)
- **Validação**: class-validator e class-transformer
- **Testes**: Jest (unit, integration, e2e)

## 📁 Estrutura do Projeto

```
fincheck/
├── fe/                          # Frontend React
│   ├── src/
│   │   ├── app/
│   │   │   ├── config/          # Configurações da aplicação
│   │   │   ├── contexts/        # React Contexts (Auth, Dashboard)
│   │   │   ├── entities/        # Modelos de dados (User, Transaction, BankAccount, Category)
│   │   │   ├── hooks/           # Custom hooks (useAuth, useTransactions, etc.)
│   │   │   ├── lib/             # Bibliotecas (queryClient)
│   │   │   ├── services/        # Camada de serviços da API
│   │   │   │   ├── authService/
│   │   │   │   ├── usersService/
│   │   │   │   ├── categories/
│   │   │   │   ├── bankAccountsService/
│   │   │   │   └── transactionsService/
│   │   │   └── utils/           # Funções utilitárias
│   │   ├── Router/              # Configuração de rotas e auth guard
│   │   ├── view/
│   │   │   ├── components/      # Componentes UI reutilizáveis
│   │   │   ├── layouts/         # Layouts (AuthLayout)
│   │   │   └── pages/           # Componentes de página
│   │   │       ├── Login/
│   │   │       ├── Register/
│   │   │       └── Dashboard/   # Dashboard principal com modais
│   │   └── assets/              # Assets estáticos
│   └── package.json
│
└── api/                         # Backend NestJS
    ├── src/
    │   ├── modules/             # Módulos de features
    │   │   ├── auth/            # Autenticação (signin/signup)
    │   │   ├── users/           # Gerenciamento de usuários
    │   │   ├── categories/      # Gerenciamento de categorias
    │   │   ├── transactions/    # CRUD de transações
    │   │   └── bank-accounts/   # CRUD de contas bancárias
    │   ├── shared/
    │   │   ├── config/          # Configuração de ambiente
    │   │   ├── database/        # Prisma service e repositories
    │   │   ├── decorators/      # Decorators customizados
    │   │   └── pipes/           # Pipes de validação
    │   ├── app.module.ts        # Módulo principal
    │   └── main.ts              # Entry point
    ├── prisma/
    │   └── schema.prisma        # Schema do banco de dados
    └── package.json
```

## ✨ Funcionalidades Principais

### 🔐 Gerenciamento de Usuários
- Registro e login de usuários
- Autenticação baseada em JWT com persistência em localStorage
- Gerenciamento de perfil de usuário

### 🏦 Contas Bancárias
- CRUD completo de contas bancárias
- Suporte para múltiplos tipos de conta:
  - `CHECKING` (Conta Corrente)
  - `INVESTMENT` (Investimento)
  - `CASH` (Dinheiro)
- Cores customizadas para identificação visual
- Rastreamento de saldo inicial e saldo atual

### 💸 Transações
- CRUD completo de transações
- Tipos de transação:
  - `INCOME` (Receita)
  - `EXPENSE` (Despesa)
- Filtragem de transações por:
  - Mês e ano
  - Conta bancária
  - Tipo de transação
- Categorização de transações
- Rastreamento de data para cada transação

### 📊 Categorias
- Criação e gerenciamento de categorias personalizadas
- Suporte a ícones para representação visual
- Categorias separadas para INCOME e EXPENSE
- Filtragem e organização baseada em categorias

### 📈 Dashboard
- Interface principal da aplicação mostrando:
  - Lista de contas bancárias com saldos
  - Histórico de transações com detalhes
  - Modais para criação/edição de transações e contas
  - Capacidades de filtragem
  - Botão de ação flutuante (FAB) para ações rápidas

## 🗄 Schema do Banco de Dados

### Entidades Principais

- **User**: Armazena credenciais e informações básicas do usuário
- **BankAccount**: Múltiplas contas por usuário
- **Category**: Categorias definidas pelo usuário com ícones
- **Transaction**: Transações financeiras vinculadas a contas e categorias

### Relacionamentos
- Um User tem muitos BankAccounts, Categories e Transactions
- Um BankAccount tem muitas Transactions
- Uma Category tem muitas Transactions
- Cascade delete na exclusão de usuário

## 🏗 Padrões Arquiteturais

### Frontend
- **Service Layer**: Chamadas de API abstraídas em módulos de serviço dedicados
- **Custom Hooks**: Hooks React encapsulam chamadas de serviço com React Query
- **Context API**: Usado para estado de autenticação global
- **Protected Routes**: Auth guard previne acesso não autorizado

### Backend
- **Module-based**: Módulos NestJS organizam features de forma coerente
- **Repository Pattern**: Acesso ao banco de dados abstraído em classes de repositório
- **Guard-based Security**: JWT authentication guard aplicado globalmente
- **DTO Validation**: Validação de dados com class-validator

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão LTS recomendada)
- PostgreSQL
- npm ou yarn

### Backend
```bash
cd api
npm install
# Configurar .env com DATABASE_URL e JWT_SECRET
npx prisma migrate dev
npm run start:dev
```

### Frontend
```bash
cd fe
npm install
# Configurar .env com VITE_API_URL
npm run dev
```

## 🔑 Variáveis de Ambiente

### Backend (`/api/.env`)
```
DATABASE_URL="postgresql://user:password@localhost:5432/fincheck"
JWT_SECRET="your-secret-key"
```

### Frontend (`/fe/.env`)
```
VITE_API_URL="http://localhost:3000"
```

## 📝 Notas de Desenvolvimento

### Commits Recentes
- Integração de requisições de transações com backend
- Integração de requisições de contas bancárias com backend
- Refatoração de popovers
- Criação de modais para novas contas e transações
- Implementação de dropdowns e modais

### Branch Atual
- Branch de desenvolvimento: `claude/test-implementation-ZJ7Fw`
- Branch principal: (a ser definida)

### Convenções de Código
- TypeScript em todo o projeto
- ESLint para linting
- Prettier para formatação (configurado)
- Commits descritivos e claros

## 🎯 Próximos Passos Sugeridos

1. Adicionar testes unitários e de integração
2. Implementar paginação nas listagens
3. Adicionar gráficos e relatórios financeiros
4. Implementar exportação de dados (CSV, PDF)
5. Adicionar suporte a múltiplas moedas
6. Implementar categorias compartilhadas/predefinidas
7. Adicionar notificações e alertas de gastos

## 📚 Recursos Úteis

- [React Query Documentation](https://tanstack.com/query/latest)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

---

**Última atualização**: 2025-12-26
