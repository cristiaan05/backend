const env = {
  database: 'vacaciones',
  username: 'root',
  password: 'practicante',
  host: '104.197.191.213',
  port:'3306',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
 
module.exports = env;