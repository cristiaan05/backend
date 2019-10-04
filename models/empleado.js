'use strict'
module.exports = (sequelize, type) => {
    return sequelize.define('empleado', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nombre: type.STRING,
        apellido: type.STRING,
        email:type.STRING,
        dpi:type.STRING,
        diasDisponibles:type.INTEGER,
    },{ timestamps: false });
}   