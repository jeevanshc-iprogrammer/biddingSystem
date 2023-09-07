const  sequelize  = require('sequelize');
require('dotenv').config();

const Sequelize = new sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql'
    }
)

module.exports = {
    Sequelize
};