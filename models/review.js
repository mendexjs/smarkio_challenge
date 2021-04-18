const Sequelize = require('sequelize');
const database = require('../db');
 
const Review = database.define('review', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false
    },
    readable_created_at: {
        type: Sequelize.STRING
    },
})
 
module.exports = Review;