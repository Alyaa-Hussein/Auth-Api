const mongoose = require('mongoose')
const validator = require('validator')

const roleSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        default:'No role',
        required:true,
        validate(value){
            if(value.toLowerCase().includes('admin')){
                throw new Error('Cannot assign admin role !!!')
            }
        }

    },
    description:{
        type: String,
        required:true,

    }
})

const Role= mongoose.model('Role', roleSchema)
module.exports = Role