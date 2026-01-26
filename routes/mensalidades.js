const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const Mensalidade = require('../models/Mensalidade');
const Cliente = require('../models/Cliente');
const Servico = require('../models/Servico');

router.use(authMiddleware);

// @route   GET /api/mensalidades
// @desc    Listar todas as mensalidades
router.get('/', async (req, res) => {
  try {
    const mensalidades = await Mensalidade.findAll({
      include: [
        { model: Cliente, attributes: ['id', 'nome', 'email'] },
        { model: Servico, attributes: ['id', 'nome', 'valor'] }
      ],
      order: [['dataVencimento', 'DESC']]
    });
    res.json(mensalidades);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar mensalidades', error: error.message });
  }
});

// @route   GET /api/mensalidades/pendentes
// @desc    Listar mensalidades pendentes
router.get('/pendentes', async (req, res) => {
  try {
    const mensalidades = await Mensalidade.findAll({
      where: { status: 'pendente' },
      include: [
        { model: Cliente, attributes: ['id', 'nome', 'email'] },
        { model: Servico, attributes: ['id', 'nome', 'valor'] }
      ],
      order: [['dataVencimento', 'ASC']]
    });
    res.json(mensalidades);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar mensalidades', error: error.message });
  }
});

// @route   GET /api/mensalidades/:id
// @desc    Buscar mensalidade por ID
router.get('/:id', async (req, res) => {
  try {
    const mensalidade = await Mensalidade.findByPk(req.params.id, {
      include: [
        { model: Cliente },
        { model: Servico }
      ]
    });
    if (!mensalidade) {
      return res.status(404).json({ message: 'Mensalidade não encontrada' });
    }
    res.json(mensalidade);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar mensalidade', error: error.message });
  }
});

// @route   POST /api/mensalidades
// @desc    Criar nova mensalidade
router.post('/',
  [
    body('clienteId').isInt().withMessage('Cliente é obrigatório'),
    body('servicoId').isInt().withMessage('Serviço é obrigatório'),
    body('valor').isDecimal().withMessage('Valor deve ser um número'),
    body('dataVencimento').isDate().withMessage('Data de vencimento inválida')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const mensalidade = await Mensalidade.create(req.body);
      res.status(201).json(mensalidade);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar mensalidade', error: error.message });
    }
  }
);

// @route   PUT /api/mensalidades/:id
// @desc    Atualizar mensalidade
router.put('/:id', async (req, res) => {
  try {
    const mensalidade = await Mensalidade.findByPk(req.params.id);
    if (!mensalidade) {
      return res.status(404).json({ message: 'Mensalidade não encontrada' });
    }

    await mensalidade.update(req.body);
    res.json(mensalidade);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar mensalidade', error: error.message });
  }
});

// @route   PUT /api/mensalidades/:id/pagar
// @desc    Marcar mensalidade como paga
router.put('/:id/pagar', async (req, res) => {
  try {
    const mensalidade = await Mensalidade.findByPk(req.params.id);
    if (!mensalidade) {
      return res.status(404).json({ message: 'Mensalidade não encontrada' });
    }

    await mensalidade.update({
      status: 'pago',
      dataPagamento: new Date()
    });
    
    res.json({ message: 'Mensalidade marcada como paga', mensalidade });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar mensalidade', error: error.message });
  }
});

// @route   DELETE /api/mensalidades/:id
// @desc    Deletar mensalidade
router.delete('/:id', async (req, res) => {
  try {
    const mensalidade = await Mensalidade.findByPk(req.params.id);
    if (!mensalidade) {
      return res.status(404).json({ message: 'Mensalidade não encontrada' });
    }

    await mensalidade.destroy();
    res.json({ message: 'Mensalidade deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar mensalidade', error: error.message });
  }
});

module.exports = router;
