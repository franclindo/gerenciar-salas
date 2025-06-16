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
let historicoTemperaturas = [];
const MAX_HISTORICO = 100;

function adicionarAoHistorico(temperatura) {
  const registro = {
    temperatura: temperatura,
    timestamp: new Date().toISOString()
  };

  historicoTemperaturas.unshift(registro);

  if (historicoTemperaturas.length > MAX_HISTORICO) {
    historicoTemperaturas.pop();
  }
}

// Removido o prefixo /api/
router.post('/atualizarTemperatura', (req, res) => {
  try {
    if (req.body && typeof req.body.temperatura !== 'undefined') {
      const novaTemperatura = parseFloat(req.body.temperatura);

      if (isNaN(novaTemperatura)) {
        throw new Error('Temperatura inválida');
      }

      temperaturaAtual = novaTemperatura;
      adicionarAoHistorico(temperaturaAtual);

      console.log(`Temperatura atualizada: ${temperaturaAtual}°C`);

      res.status(200).json({
        status: 'success',
        message: 'Dados recebidos com sucesso',
        temperatura: temperaturaAtual,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(400).json({
        status: 'error',
        message: 'Dados inválidos'
      });
    }
  } catch (error) {
    console.error('Erro ao atualizar temperatura:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno no servidor',
      error: error.message
    });
  }
});

// Removido o prefixo /api/
router.get('/temperaturaAtual', (req, res) => {
  res.status(200).json({
    temperatura: temperaturaAtual.toFixed(2),
    timestamp: new Date().toISOString()
  });
});

// Removido o prefixo /api/
router.get('/historicoTemperaturas', (req, res) => {
  res.status(200).json({
    historico: historicoTemperaturas,
    totalRegistros: historicoTemperaturas.length
  });
});

module.exports = router;