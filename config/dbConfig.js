const env = require('./env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    port: env.port,
    dialect: env.dialect,
    operatorsAliases: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.usuario = require('../models/usuario')(sequelize, Sequelize);
db.empleado = require('../models/empleado')(sequelize, Sequelize);
db.solicitud = require('../models/solicitud')(sequelize, Sequelize);
db.vacaciones = require('../models/vacaciones')(sequelize, Sequelize);

db.empleado.hasMany(db.solicitud)
db.empleado.hasOne(db.usuario)
db.solicitud.belongsTo(db.empleado)
db.empleado.hasMany(db.vacaciones)
db.vacaciones.belongsTo(db.empleado)


module.exports = db;