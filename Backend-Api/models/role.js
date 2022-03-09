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

roleSchema.statics.isRudundantRole = async(name , currentId)=>{
    console.log("function=======" ,name , currentId)
    const currentObj = await Role.findById(currentId)
    console.log(currentObj)
    const result = await Role.findOne({name})
    if(result && currentObj){
        if(currentObj.name === result.name){
           return 'same'
        }
        else{
            return 'redundant'
        }

    }
    else if(currentObj === null){
        console.log("hello from inside crrent object === null===========")
        if(result.name === name){
            return 'redundant'

        }
        else{
            return 'unique'

        }
        
    }
    else{
        return 'unique'
    }
    

}
roleSchema.pre('deleteOne',async function(next){
    const role = this
    

    next()
})

const Role= mongoose.model('Role', roleSchema)
module.exports = Role