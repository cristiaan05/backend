'use strict'
var express= require('express');
var UserController= require('../controllers/userController');

var api= express.Router();

//RUTAS
api.post('/login',UserController.login);
api.post('/registrar',UserController.addUser);
api.post('/agregarEmpleado',UserController.agregarEmpleado);
api.delete('/eliminarEmpleado/:id',UserController.eliminarEmpleado);
api.post('/crearSolicitud/:id',UserController.crearSolicitud);
api.get('/empleados',UserController.getEmpleados);
api.get('/solicitudes',UserController.getSolicitudes);
api.delete('/eliminarSolicitud/:id',UserController.eliminarSolicitud);
api.post('/estado/:id',UserController.estado);

//Exportar ruta
module.exports=api;