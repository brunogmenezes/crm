# Sistema CRM - Gerenciamento de Clientes

Sistema web completo para gerenciamento de clientes, serviços e mensalidades.

## 🚀 Tecnologias

### Backend
- **Node.js** + Express
- **PostgreSQL** (Banco de dados)
- **Sequelize** (ORM)
- **JWT** (Autenticação)
- **Bcrypt** (Criptografia de senhas)

### Frontend
- **React**
- **Material-UI** (Interface moderna)
- **React Router** (Navegação)
- **Axios** (Requisições HTTP)

## 📋 Funcionalidades

✅ Sistema de login seguro com JWT  
✅ Cadastro e gerenciamento de clientes  
✅ Cadastro de tipos de serviços  
✅ Controle de mensalidades  
✅ Dashboard com estatísticas  
✅ Interface moderna e responsiva  

## 🔧 Instalação

### 1. Pré-requisitos
- Node.js (versão 14 ou superior)
- PostgreSQL instalado e rodando
- Git (opcional)

### 2. Configurar o Banco de Dados

Crie um banco de dados no PostgreSQL:
```sql
CREATE DATABASE crm_db;
```

### 3. Configurar o Backend

```bash
# Navegar para a raiz do projeto
cd c:\wamp64\www\crm

# Instalar dependências
npm install

# Copiar arquivo de configuração
copy .env.example .env

# Editar o arquivo .env com suas configurações:
# - DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
# - JWT_SECRET (crie uma chave secreta)
```

### 4. Configurar o Frontend

```bash
# Navegar para a pasta do cliente
cd client

# Instalar dependências
npm install
```

## ▶️ Executando o Sistema

### 🔥 Opção 1: Usando PM2 (Recomendado para Produção)

O PM2 é um gerenciador de processos avançado que mantém seus serviços rodando, reinicia automaticamente em caso de falhas e facilita o monitoramento.

**Instalar PM2 globalmente (executar apenas uma vez):**
```bash
npm install -g pm2
```

**Instalar dependências do projeto:**
```bash
cd c:\wamp64\www\crm
npm install

# Instalar dependências do frontend
cd client
npm install
cd ..
```

**Iniciar todos os serviços com PM2:**
```bash
npm run pm2:start
```

**Comandos úteis do PM2:**
```bash
# Ver status dos serviços
npm run pm2:status
# ou
pm2 status

# Ver logs em tempo real
npm run pm2:logs
# ou
pm2 logs

# Reiniciar serviços
npm run pm2:restart

# Parar serviços
npm run pm2:stop

# Remover serviços do PM2
npm run pm2:delete

# Monitoramento interativo
npm run pm2:monit
```

**Configurar PM2 para iniciar no boot do sistema:**
```bash
pm2 startup
pm2 save
```

Os serviços ficarão disponíveis em:
- **Backend:** `http://localhost:5000`
- **Frontend:** `http://localhost:3000`

### Opção 2: Executar Backend e Frontend separadamente (Desenvolvimento)

**Terminal 1 - Backend:**
```bash
cd c:\wamp64\www\crm
npm run dev
```
O backend rodará em: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd c:\wamp64\www\crm\client
npm start
```
O frontend rodará em: `http://localhost:3000`

### Opção 3: Executar tudo junto com Nodemon (Desenvolvimento)

```bash
cd c:\wamp64\www\crm
npm run dev:all
```

## 👤 Primeiro Acesso

### Criar o primeiro usuário (admin)

Faça uma requisição POST para criar o primeiro usuário:

**URL:** `http://localhost:5000/api/auth/register`

**Body (JSON):**
```json
{
  "nome": "Administrador",
  "email": "admin@crm.com",
  "senha": "123456",
  "role": "admin"
}
```

Você pode usar o Postman, Insomnia ou até mesmo o navegador.

Depois disso, acesse o sistema em `http://localhost:3000` e faça login com:
- **Email:** admin@crm.com
- **Senha:** 123456

## 📁 Estrutura do Projeto

```
crm/
├── config/              # Configurações (banco de dados)
├── models/              # Modelos do banco (User, Cliente, Servico, Mensalidade)
├── routes/              # Rotas da API
├── middleware/          # Middlewares (autenticação)
├── logs/                # Logs do PM2
├── client/              # Aplicação React
│   ├── src/
│   │   ├── pages/      # Páginas (Login, Dashboard, etc)
│   │   ├── components/ # Componentes reutilizáveis
│   │   └── services/   # Serviços (API)
├── ecosystem.config.js # Configuração do PM2
├── server.js           # Servidor principal
├── package.json
└── .env                # Variáveis de ambiente
```

## 🔒 Segurança

- ✅ Senhas criptografadas com bcrypt
- ✅ Autenticação JWT
- ✅ Rate limiting
- ✅ Helmet para headers de segurança
- ✅ CORS configurado
- ✅ Validação de dados

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login

### Clientes (Requer autenticação)
- `GET /api/clientes` - Listar clientes
- `GET /api/clientes/:id` - Buscar cliente
- `POST /api/clientes` - Criar cliente
- `PUT /api/clientes/:id` - Atualizar cliente
- `DELETE /api/clientes/:id` - Deletar cliente

### Serviços (Requer autenticação)
- `GET /api/servicos` - Listar serviços
- `POST /api/servicos` - Criar serviço
- `PUT /api/servicos/:id` - Atualizar serviço
- `DELETE /api/servicos/:id` - Deletar serviço

### Mensalidades (Requer autenticação)
- `GET /api/mensalidades` - Listar mensalidades
- `GET /api/mensalidades/pendentes` - Listar pendentes
- `POST /api/mensalidades` - Criar mensalidade
- `PUT /api/mensalidades/:id` - Atualizar mensalidade
- `PUT /api/mensalidades/:id/pagar` - Marcar como pago
- `DELETE /api/mensalidades/:id` - Deletar mensalidade

## 🎨 Personalizações

O tema visual pode ser personalizado em `client/src/App.js` no objeto `theme`.

## 📝 Notas

- Certifique-se de que o PostgreSQL está rodando antes de iniciar o backend
- **PM2 mantém os serviços rodando** mesmo após fechar o terminal
- Os logs do PM2 ficam salvos na pasta `logs/`

## 🐛 Troubleshooting

**Erro de conexão com banco:**
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `.env`

**Erro "Cannot find module":**
- Execute `npm install` na raiz e na pasta `client`

**Porta já em uso:**
- Altere a porta no arquivo `.env` (backend) ou no package.json (frontend)
- Verifique se já existe um processo rodando: `pm2 status`

**PM2 não encontrado:**
- Instale globalmente: `npm install -g pm2`
- Ou use npx: `npx pm2 start ecosystem.config.js`

**Ver processos travados:**
```bash
pm2 status
pm2 logs crm-backend --lines 50
pm2 logs crm-frontend --lines 50
```
**Porta já em uso:**
- Altere a porta no arquivo `.env` (backend) ou no package.json (frontend)

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Se todas as dependências foram instaladas
2. Se o PostgreSQL está rodando
3. Se as variáveis de ambiente estão configuradas corretamente

---

**Desenvolvido com ❤️ usando Node.js e React**
