const db = require('../db')
const {UUID, STRING, UUIDV4} = require('sequelize')

const User  = db.define('user', {
    id:{
        primaryKey:true,
        type:UUID,
        defaultValue:UUIDV4
    },
    name:{
        type:STRING,
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:true
        }
    }
})

module.exports = User