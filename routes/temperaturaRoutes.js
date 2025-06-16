router.get('/temperaturaAtual', (req, res) => {
  try {
    const { temp } = req.query;
    
    if (temp !== undefined && temp !== null) { 
      const temperatura = parseFloat(temp);
      
      if (isNaN(temperatura)) {
        return res.status(400).json({
          status: 'error',
          message: 'Valor de temperatura inválido'
        });
      }

      console.log(`Valor recebido: ${temp}, Convertido: ${temperatura}`);

      const novaLeitura = {
        temperatura,
        timestamp: new Date().toISOString()
      };
      
      historicoTemperaturas.push(novaLeitura);

      if (historicoTemperaturas.length > MAX_HISTORICO) {
        historicoTemperaturas.shift();
      }

      console.log('Histórico atual:', historicoTemperaturas);
      
      return res.json({ 
        status: 'success',
        temperatura: novaLeitura.temperatura.toFixed(2),
        timestamp: novaLeitura.timestamp
      });
    }
 
    const ultimaLeitura = historicoTemperaturas[historicoTemperaturas.length - 1] || null;
    
    res.json({
      status: ultimaLeitura ? 'success' : 'no-data',
      temperatura: ultimaLeitura ? ultimaLeitura.temperatura.toFixed(2) : "0.00",
      timestamp: ultimaLeitura ? ultimaLeitura.timestamp : new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno'
    });
  }
});