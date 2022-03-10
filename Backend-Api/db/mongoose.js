const mongoose= require('mongoose')
const User = require('../models/user')
const Role = require('../models/role')

const connectionURL= 'mongodb://127.0.0.1:27017/auth-api'

mongoose.connect(connectionURL,{
    useNewUrlParser:true,
  
})


const addAdmin = async()=>{

    const role = await Role.findOne({name:'no role'})

    console.log(role._id)
    const user = new User({
        name:'Bassant',
        email:'Bassant@test.com',
        password:'admin123',
        admin:true,
        userRole:role._id
    })
    await user.save()
    console.log('Admin Created')
}
const addMainRoles = async()=>{
    const defaultRole = new Role ({
        name:'no role',
        description:'You have not assigned a role yet'
    })
    const role1=new Role({
        name:'tester',
        description:'Tests code modules'
    })
    const role2=new Role({
        name:'developer',
        description:'Developes code modules'
    })
    await defaultRole.save()
    console.log('Default created')

    await role1.save()
    console.log('Tester role Created')

    await role2.save()
    console.log('Developer role Created')

    


}
//addMainRoles()
//addAdmin()

