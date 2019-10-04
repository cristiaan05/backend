'use strict'
const Sequelize = require('sequelize');
const UsuarioModel = require('./models/usuario');
const EmpleadoModel=require('./models/empleado');
const SolicitudModel=require('./models/solicitud');
const app= require('./app');
var port=process.env.PORT || 3000

const sequelize = new Sequelize('vacaciones', 'root', 'practicante', {
  host: '35.184.203.130',
  port:'3306',
  dialect: 'mysql',
})
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
    app.set('port', port);
    app.listen(app.get('port'),()=>{
        console.log(`Servidor corriendo en puerto:'${app.get('port')}'`);
    })
  })
  .catch(err => {
    console.log('No se conecto');
  })
  
const Usuario = UsuarioModel(sequelize, Sequelize)
const Empleado= EmpleadoModel(sequelize,Sequelize)
const Solicitud= SolicitudModel(sequelize,Sequelize)
//Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
//Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
//Blog.belongsTo(User);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  Usuario,
  Empleado,
  Solicitud
  //Blog,
  //Tag
}