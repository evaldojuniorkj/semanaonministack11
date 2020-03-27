const conexao = require('../database/conexao');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const ong = await conexao('ongs')
            .where('id', id)
            .select('name')
            .first();

            if (!ong){
                return response.status(400).json({})
            }
        return response.json(ong);
    }
}