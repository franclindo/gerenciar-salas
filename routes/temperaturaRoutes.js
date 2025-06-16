const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

router.use(express.json());

let temperaturaAtual = 0;

router.post('/api/atualizarTemperatura', (req, res) => {
  try {
    if (req.body && typeof req.body.temperatura !== 'undefined') {
      temperaturaAtual = parseFloat(req.body.temperatura);
      console.log(`Temperatura atualizada: ${temperaturaAtual}`);
      res.status(200).json({ 
        status: 'success',
        message: 'Dados recebidos com sucesso',
        temperatura: temperaturaAtual
      });
    } else {
      res.status(400).json({ 
        status: 'error',
        message: 'Dados inválidos' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Erro interno no servidor' 
    });
  }
});

router.get('/api/temperaturaAtual', (req, res) => {
  res.status(200).json({ 
    temperatura: temperaturaAtual.toFixed(2),
    timestamp: new Date().toISOString()
  });
});

router.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'online',
    message: 'API operacional' 
  });
});

module.exports = router;