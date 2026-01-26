const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// @route   POST /api/auth/register
// @desc    Registrar novo usuário
// @access  Public
router.post('/register',
  [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { nome, email, senha, role } = req.body;

      // Verificar se usuário já existe
      const usuarioExiste = await User.findOne({ where: { email } });
      if (usuarioExiste) {
        return res.status(400).json({ message: 'Usuário já cadastrado com este email' });
      }

      // Criar usuário
      const user = await User.create({
        nome,
        email,
        senha,
        role: role || 'user'
      });

      // Gerar token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        token,
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login de usuário
// @access  Public
router.post('/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').notEmpty().withMessage('Senha é obrigatória')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, senha } = req.body;

      // Buscar usuário
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }

      // Verificar se está ativo
      if (!user.ativo) {
        return res.status(401).json({ message: 'Usuário inativo' });
      }

      // Validar senha
      const senhaValida = await user.validarSenha(senha);
      if (!senhaValida) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }

      // Gerar token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );

      res.json({
        message: 'Login realizado com sucesso',
        token,
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
  }
);

module.exports = router;
