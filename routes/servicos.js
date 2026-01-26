const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const Servico = require('../models/Servico');

router.use(authMiddleware);

// @route   GET /api/servicos
// @desc    Listar todos os serviços
router.get('/', async (req, res) => {
  try {
    const servicos = await Servico.findAll({
      order: [['nome', 'ASC']]
    });
    res.json(servicos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar serviços', error: error.message });
  }
});

// @route   GET /api/servicos/:id
// @desc    Buscar serviço por ID
router.get('/:id', async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.json(servico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar serviço', error: error.message });
  }
});

// @route   POST /api/servicos
// @desc    Criar novo serviço
router.post('/',
  [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('valor').isDecimal().withMessage('Valor deve ser um número')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const servico = await Servico.create(req.body);
      res.status(201).json(servico);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar serviço', error: error.message });
    }
  }
);

// @route   PUT /api/servicos/:id
// @desc    Atualizar serviço
router.put('/:id', async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    await servico.update(req.body);
    res.json(servico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar serviço', error: error.message });
  }
});

// @route   DELETE /api/servicos/:id
// @desc    Deletar serviço
router.delete('/:id', async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    await servico.destroy();
    res.json({ message: 'Serviço deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar serviço', error: error.message });
  }
});

module.exports = router;
