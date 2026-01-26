const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const Cliente = require('../models/Cliente');

// Todas as rotas protegidas
router.use(authMiddleware);

// @route   GET /api/clientes
// @desc    Listar todos os clientes
// @access  Private
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      order: [['nome', 'ASC']]
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
  }
});

// @route   GET /api/clientes/:id
// @desc    Buscar cliente por ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cliente', error: error.message });
  }
});

// @route   POST /api/clientes
// @desc    Criar novo cliente
// @access  Private
router.post('/',
  [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('email').optional().isEmail().withMessage('Email inválido')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const cliente = await Cliente.create(req.body);
      res.status(201).json(cliente);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
    }
  }
);

// @route   PUT /api/clientes/:id
// @desc    Atualizar cliente
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    await cliente.update(req.body);
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar cliente', error: error.message });
  }
});

// @route   DELETE /api/clientes/:id
// @desc    Deletar cliente
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    await cliente.destroy();
    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar cliente', error: error.message });
  }
});

module.exports = router;
