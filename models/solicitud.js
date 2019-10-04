'use strict'
const db = require('../config/dbConfig');
const sequelize = db.sequelize
module.exports = (sequelize, Sequelize) => {
    const Solicitud = sequelize.define('solicitude', {
        idEmpleado: {
            type: Sequelize.INTEGER,
            references: {
                model: 'empleados',
                key: 'id'
            }
        },
        fecha: {
            type: Sequelize.DATE
        },
        diasSolicitados: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.STRING
        }
    }, { timestamps: false });

    return Solicitud;
}