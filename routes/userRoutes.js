'use strict'
var express= require('express');
var UserController= require('../controllers/userController');

var api= express.Router();

//RUTAS
api.post('/registrar',UserController.addUser);
//api.post('/login',UserController.login);


//Exportar ruta
module.exports=api;