'use strict'
var express= require('express');
var UserController= require('../controllers/userController');
var EmpleadoController= require('../controllers/empleadoController');
var SolicitudController= require('../controllers/solicitudController');
var VacacionesController= require('../controllers/vacacionesController');
var md_auth=require('../middlewares/autheticated');

var api= express.Router();

//RUTAS
api.post('/login',UserController.login);
// api.post('/registrar',UserController.addUser);
api.post('/agregarEmpleado',EmpleadoController.agregarEmpleado);
api.post('/agregarVacaciones',EmpleadoController.agregarVacaciones);
//api.post('/event',md_auth.ensureAuth,VacacionesController.event);
api.delete('/eliminarEmpleado/:id',EmpleadoController.eliminarEmpleado);
// api.post('/crearSolicitud/:id',UserController.crearSolicitud);
api.get('/empleados',EmpleadoController.getEmpleados);
// api.get('/solicitudes',UserController.getSolicitudes);
// api.delete('/eliminarSolicitud/:id',UserController.eliminarSolicitud);
// api.post('/estado/:id',UserController.estado);

//Exportar ruta
module.exports=api;