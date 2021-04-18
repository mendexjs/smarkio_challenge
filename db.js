const Sequelize = require('sequelize');
const env = require('./public/assets/environment');
const sequelize = new Sequelize(env.environment.database.database_name, env.environment.database.user, env.environment.database.password, {
    dialect: env.environment.database.engine, 
    host: env.environment.database.host,
    port: env.environment.database.port,
});

module.exports = sequelize;