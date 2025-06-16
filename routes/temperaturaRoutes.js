// routes/temperaturaRoutes.js
const express = require('express');
const router = express.Router();

let ultimaTemperatura = null;

router.get('/temperaturaAtual', (req, res) => {
  const { temp } = req.query;
  
  if (temp) {
    ultimaTemperatura = parseFloat(temp);
    console.log(`Temperatura atualizada: ${ultimaTemperatura}°C`);
    return res.json({ 
      status: 'success',
      temperatura: ultimaTemperatura.toFixed(2)
    });
  }
  
  res.json({ 
    temperatura: ultimaTemperatura ? ultimaTemperatura.toFixed(2) : null,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;