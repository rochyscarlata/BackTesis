var express = require('express');
var userController = require('../controllers/UserController');


var api = express.Router();


api.post('/registrar', userController.registrar);
api.post('/login', userController.login);
api.get('/usuarios', userController.listar);
api.put('/user/editar/:id', userController.editar);
api.get('/user/:id', userController.get_user);
api.delete('/user/eliminar/:id', userController.eliminar);

module.exports= api;    