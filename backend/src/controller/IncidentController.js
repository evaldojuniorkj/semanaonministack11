const conexao = require('../database/conexao');

module.exports = {

    async listar(request, response) {
        const { page = 1 } = request.query;

        const [count] = await conexao('incidents').count();

        const incidents = await conexao('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.cidade', 
                'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async deletar(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const caso = await conexao('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if ( caso.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operaçao nao permitida'})
        }
        await conexao('incidents').where('id',id).delete()

        return response.status(204).send();
    },

    async create(request, response){
        const{ titulo, descricao, valor } = request.body
        const ong_id = request.headers.authorization; 

        const [id] = await conexao('incidents').insert({
           titulo,
           descricao,
           valor,
           ong_id, 
        });

        return response.json({id})
    }
};