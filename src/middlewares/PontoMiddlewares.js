const { validate: isUuid } = require('uuid');
const Ponto = require('../models/Ponto');

module.exports = {
  async validateId(request ,response, next) {
    const { id } = request.params;
    
    if(!isUuid(id)) {
      return response.status(400).json({ error: "Invalid ID" });
    }

    try {
      const ponto = await Ponto.findOne({ _idComprovante: id});
      console.log("ola " + ponto);
      response.ponto = ponto;
      if (!ponto) {
        return response.status(404).json({ error: "Ponto não encontrado." }) 
      }
    } catch (erro) {
      return response.status(500).json({ erro: erro.message });
    }
    next();
  },
  
}
