'use strict'
const db = require('../config/dbConfig');
const sequelize = db.sequelize
module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define('empleado', {
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        fechaNacimiento:{
            type: Sequelize.DATE
        },
        fechaIngreso:{
            type: Sequelize.DATE
        },
        email: {
            type: Sequelize.STRING
        },
        dpi: {
            type: Sequelize.STRING
        }
    }, { timestamps: false });

    return Empleado;
}