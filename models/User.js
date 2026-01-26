const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
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
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user'
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'users',
  timestamps: true
});

// Hash da senha antes de salvar
User.beforeCreate(async (user) => {
  if (user.senha) {
    user.senha = await bcrypt.hash(user.senha, 10);
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed('senha')) {
    user.senha = await bcrypt.hash(user.senha, 10);
  }
});

// Método para comparar senhas
User.prototype.validarSenha = async function(senha) {
  return await bcrypt.compare(senha, this.senha);
};

module.exports = User;
