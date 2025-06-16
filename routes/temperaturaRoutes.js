const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors({
  origin: '*',
  methods: ['GET']
}));

const historicoTemperaturas = [];
const MAX_HISTORICO = 100;

router.get('/temperaturaAtual', (req, res) => {
  try {
    const { temp } = req.query;
    
    if (temp !== undefined) {
      const temperatura = parseFloat(temp);
      
      if (isNaN(temperatura)) {
        return res.status(400).json({
          status: 'error',
          message: 'Valor de temperatura inválido'
        });
      }

      historicoTemperaturas.push({
        temperatura,
        timestamp: new Date().toISOString()
      });

      if (historicoTemperaturas.length > MAX_HISTORICO) {
        historicoTemperaturas.shift();
      }

      console.log(`Temperatura atualizada: ${temperatura.toFixed(2)}°C`);
      
      return res.json({ 
        status: 'success',
        temperatura: temperatura.toFixed(2),
        timestamp: historicoTemperaturas[historicoTemperaturas.length - 1].timestamp
      });
    }
    
    const ultimaLeitura = historicoTemperaturas.length > 0 
      ? historicoTemperaturas[historicoTemperaturas.length - 1]
      : null;
    
    res.json({
      status: ultimaLeitura ? 'success' : 'no-data',
      temperatura: ultimaLeitura ? ultimaLeitura.temperatura.toFixed(2) : null,
      timestamp: ultimaLeitura ? ultimaLeitura.timestamp : null
    });

  } catch (error) {
    console.error('Erro no endpoint /temperaturaAtual:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno no servidor'
    });
  }
});

module.exports = router;