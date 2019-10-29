'use strict'
const db = require('../config/dbConfig');
const Empleado = db.empleado;
const Solicitud = db.solicitud;
const Vacaciones = db.vacaciones;

function agaregarVacaciones(req, res) {
    var periodo = req.body.periodo;
    var diasDisponibles = 15;
    var empleadoId = req.params.id;
    Vacaciones.create({
        periodo: periodo,
        diasDisponibles: diasDisponibles,
        empleadoId: empleadoId
    }).then(vacaciones => {
        res.status(200).send(vacaciones);
    });
}

function getVacaciones(req, res) {
    var id=req.usuario.empleadoId
    console.log(id)
    Vacaciones.findAll({ where: { empleadoId: id }, include: [Empleado] }).then(vacaciones => {
        res.send(vacaciones)
    })
}

function getPeriodo(req,res) {
    var id=req.params.id
    console.log(id)
    Vacaciones.findAll({ where: { empleadoId: id }}).then(vacaciones => {
        res.send(vacaciones)
    })
}

module.exports={
    getVacaciones
}



