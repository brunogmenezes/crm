const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    validate: {
      isEmail: true
    }
  },
  telefone: {
    type: DataTypes.STRING(20)
  },
  cpf_cnpj: {
    type: DataTypes.STRING(20),
    unique: true
  },
  endereco: {
    type: DataTypes.STRING(200)
  },
  cidade: {
    type: DataTypes.STRING(100)
  },
  estado: {
    type: DataTypes.STRING(2)
  },
  cep: {
    type: DataTypes.STRING(10)
  },
  observacoes: {
    type: DataTypes.TEXT
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'clientes',
  timestamps: true
});

module.exports = Cliente;
