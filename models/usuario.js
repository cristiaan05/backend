'use strict'
module.exports = (sequelize, type) => {
    return sequelize.define('usuario', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        usuario: type.STRING,
        password: type.STRING,
    },{ timestamps: false });
}