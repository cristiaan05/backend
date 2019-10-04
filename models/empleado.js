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
        email: {
            type: Sequelize.STRING
        },
        dpi: {
            type: Sequelize.STRING
        },
        diasDisponibles: {
            type: Sequelize.INTEGER
        }
    }, { timestamps: false });

    return Empleado;
}