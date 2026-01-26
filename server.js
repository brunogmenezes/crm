require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const db = require('./config/database');

const app = express();

// Middlewares de segurança
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de requisições
});
app.use('/api/', limiter);

// Testar conexão com banco
db.authenticate()
  .then(() => console.log('✓ Conectado ao PostgreSQL'))
  .catch(err => console.error('✗ Erro ao conectar no banco:', err));

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/servicos', require('./routes/servicos'));
app.use('/api/mensalidades', require('./routes/mensalidades'));

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CRM API rodando!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
