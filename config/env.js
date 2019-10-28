  const env = {
  database: 'vacaciones',
  username: 'root',
  password: 'practicante',
  host: '35.223.31.3',
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