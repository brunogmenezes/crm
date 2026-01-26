const sequelize = require('../config/database');
const User = require('./User');
const Cliente = require('./Cliente');
const Servico = require('./Servico');
const Mensalidade = require('./Mensalidade');

const models = {
  User,
  Cliente,
  Servico,
  Mensalidade
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✓ Banco de dados sincronizado');
  } catch (error) {
    console.error('✗ Erro ao sincronizar banco:', error);
  }
};

module.exports = { models, syncDatabase };
