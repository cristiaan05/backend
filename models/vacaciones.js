'use strict'
const db = require('../config/dbConfig');
const sequelize = db.sequelize
module.exports = (sequelize, Sequelize) => {
    const Vacaciones = sequelize.define('vacacione', {
        periodo: {
            type: Sequelize.STRING
        },
        diasDisponibles: {
            type: Sequelize.INTEGER
        },
        empleadoId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'empleados',
                key: 'id'
            }
        }
    }, { timestamps: false });

    return Vacaciones;
}