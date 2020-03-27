const conexao = require('../database/conexao');
const crypto = require('crypto');

module.exports = {
    async create(request, response){
        const { name, email, whatsapp, cidade, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX')
  
        await conexao('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            cidade,
            uf
        })
    return response.json({id});
    },
    
    async index(request, response) {
        const ongs = await conexao('ongs').select('*');
        return response.json(ongs);
    }
}

 