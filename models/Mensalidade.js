const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');
const Servico = require('./Servico');

const Mensalidade = sequelize.define('Mensalidade', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cliente,
      key: 'id'
    }
  },
  servicoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Servico,
      key: 'id'
    }
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  dataVencimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  dataPagamento: {
    type: DataTypes.DATEONLY
  },
  status: {
    type: DataTypes.ENUM('pendente', 'pago', 'atrasado', 'cancelado'),
    defaultValue: 'pendente'
  },
  observacoes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'mensalidades',
  timestamps: true
});

// Relacionamentos
Cliente.hasMany(Mensalidade, { foreignKey: 'clienteId' });
Mensalidade.belongsTo(Cliente, { foreignKey: 'clienteId' });

Servico.hasMany(Mensalidade, { foreignKey: 'servicoId' });
Mensalidade.belongsTo(Servico, { foreignKey: 'servicoId' });

module.exports = Mensalidade;
