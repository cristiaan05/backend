'use strict'
const db = require('../config/dbConfig');
const sequelize=db.sequelize
module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define('usuario', {
    usuario: {
    type: Sequelize.STRING
    },
    password: {
    type: Sequelize.STRING
    }
  },{ timestamps: false });
  
  return Usuario;
}