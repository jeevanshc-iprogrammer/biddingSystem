const {Sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');

const User = Sequelize.define("users",{
    "userId":{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    "name":{
        type: DataTypes.STRING,
        allowNull: false
    },
    "email":{
        type: DataTypes.STRING,
        allowNull: false
    },
    "password":{
        type: DataTypes.STRING,
        allowNull: false
    },
    "role":{
        type: DataTypes.ENUM('bidder','owner'),
        allowNull: false
    },
    "bids":{
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    }
},{
    timestamps: true
})

User.beforeCreate((user)=>{
    const encryptedPassword = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10));
    user.password = encryptedPassword;
});



module.exports = {
    User
};