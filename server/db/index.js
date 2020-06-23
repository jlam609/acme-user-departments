const db = require('./db')
const Department = require('./models/departments')
const User  = require('./models/users')
const DepartmentUser = require('./models/departmentuser')

const departmentList = ['Admin', 'Engineering', 'HR']
const userList = ['Jane', 'Adam', 'Bob', 'Tom']

User.belongsToMany(Department, {through: DepartmentUser})
Department.belongsToMany(User, {through:DepartmentUser})

const seed = async(force = false) => {
    try{
        await db.sync({force})
        if (force === true){
            departmentList.forEach(department => Department.create({
                name:department
            }))
            userList.forEach(user => User.create({
                name:user
            }))
        }
        console.log('succeeded')
    }
    catch(e){
        console.error(e)
    }
}

module.exports = {
    db,
    seed,
    models:{
        Department,
        User
    }
}