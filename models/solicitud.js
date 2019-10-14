'use strict'
const db = require('../config/dbConfig');
const sequelize = db.sequelize
module.exports = (sequelize, Sequelize) => {
    const Solicitud = sequelize.define('solicitude', {
        empleadoId: {
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
        periodo:{
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        }
    }, { timestamps: false });

    return Solicitud;
}