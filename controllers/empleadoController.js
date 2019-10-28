'use strict'
var db = require('../config/dbConfig');
var bcrypt = require('bcrypt');
const Op = db.Sequelize.Op;
const Usuario = db.usuario;
const Empleado = db.empleado;
const Solicitud = db.solicitud;

function agregarEmpleado(req, res) {
    console.log('hola')
    var params = req.body
    var nombre = params.nombre;
    var apellido = params.apellido;
    var fechaIngreso = params.fechaIngreso
    var fechaNacimiento = params.fechaNacimiento
    var dpi = params.dpi;
    var email = params.email;
    if (nombre && apellido && fechaIngreso && fechaNacimiento && dpi && email) {
        Empleado.findAll({
            where: {
                [Op.or]: [
                    { nombre: nombre.toLowerCase() },
                    { nombre: nombre.toUpperCase() },
                    { apellido: apellido.toLowerCase() },
                    { apellido: apellido.toUpperCase() },
                    { dpi: dpi }
                ]
            }
        }).then(empleados => {
            if (empleados && empleados.length >= 1) {
                return res.status(500).send({ message: 'El empleado ya existe en el sistema' })
            } else {
                Empleado.create({
                    nombre: nombre,
                    apellido: apellido,
                    fechaIngreso: fechaIngreso,
                    fechaNacimiento: fechaNacimiento,
                    dpi: dpi,
                    email: email
                }).then(empleado => {
                    var i = nombre.split("");
                    Usuario.findAll({
                        where: {
                            [Op.or]: [
                                { usuario: i[0].toLowerCase() },
                                { usuario: i[0].toUpperCase() }
                            ]
                        }
                    }).then(usuarios => {
                        console.log(usuarios)
                        if (usuarios && usuarios.length >= 1) {
                            console.log('here')
                            var i = nombre.toLowerCase().split("");
                            bcrypt.hash(dpi, 10, (err, hash) => {
                                Usuario.create({
                                    usuario: i[0] + i[1] + apellido.toLowerCase(),
                                    password: hash,
                                    rol: "usuario",
                                    empleadoId: empleado.id
                                }).then(user => {
                                    console.log(user)
                                }).catch(err => console.log(err));
                            });
                        } else {
                            console.log('here2')
                            var i = nombre.toLowerCase().split("");
                            bcrypt.hash(dpi, 10, (err, hash) => {
                                Usuario.create({
                                    usuario: i[0] + apellido.toLowerCase(),
                                    password: hash,
                                    rol: "admin",
                                    empleadoId: empleado.id
                                }).then(user => {
                                    console.log(user)
                                    // return res.send(user)
                                }).catch(err => console.log(err));
                            });
                        }
                        // Send created customer to client
                    }).catch(err => console.log(err));
                    return res.status(200).send(empleado);
                })
            }
        })
    } else {
        return res.status(500).send('Rellene todos los campos');
    }
}

function eliminarEmpleado(req, res) {
    var id = req.params.id;
    Solicitud.findOne({ where: { empleadoId: id } }).then(solicitud => {
        if (solicitud) {
            res.send('el empleado tiene solicitudes, eliminelas antes de eliminar al empleado');
        } else {
            Usuario.findOne({ where: { empleadoId: id } }).then(solicitud => {
                if (solicitud) {
                    Usuario.destroy({
                        where: { empleadoId: id }
                    }).then(() => {
                        Empleado.destroy({ where: { id: id } }).then(() => {
                            res.status(200).send('deleted successfully a employee with id = ' + id);
                        })
                    });
                } else {
                    Empleado.destroy({
                        where: { id: id }
                    }).then(() => {
                        Usuario.destroy({ where: { empleadoId: id } }).then(() => {
                            res.status(200).send('deleted successfully a employee with id = ' + id);
                        })
                    });
                }
            })
        }
    })
}

function getEmpleados(req, res) {
    Empleado.findAll().then(empleado => {
        // Send all customers to Client
        return res.send(empleado);
    });
}

function agregarVacaciones(req, res) {
    var dias = req.body.dias
    var periodo = req.body.periodo
    var empleadoId = req.body.empleadoId
    var name= req.body.name
    db.sequelize.query('CREATE EVENT '+name+' ON SCHEDULE  every 1 YEAR starts  CURRENT_TIMESTAMP  DO call agregarVacaciones(?,?,?)',
        { replacements: [name,periodo,dias,empleadoId], type: db.sequelize.QueryTypes.INSERT }
    ).then(function (projects) {
        res.send(projects)
    })
}

module.exports = {
    agregarEmpleado,
    agregarVacaciones,
    eliminarEmpleado,
    getEmpleados
}