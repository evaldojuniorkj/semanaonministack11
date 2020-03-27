const express = require('express');

const routes = express.Router();

const OngController = require('./controller/OngController');
const IncidentsController = require('./controller/IncidentController');
const PerfilController = require('./controller/PerfilController');
const SessionController = require('./controller/SessionController')

routes.get('/ongs', OngController.index); 
routes.post('/ongs', OngController.create); 

routes.post('/incidents', IncidentsController.create);
routes.get('/incidents', IncidentsController.listar);
routes.delete('/incidents/:id', IncidentsController.deletar)

routes.get('/perfil', PerfilController.index);

routes.post('/sessions', SessionController.create)
module.exports = routes;
 