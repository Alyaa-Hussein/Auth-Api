const mongoose= require('mongoose')
const User = require('../models/user')
const Role = require('../models/role')
const { ObjectId } = require('bson')

const connectionURL= 'mongodb://127.0.0.1:27017/auth-api'

mongoose.connect(connectionURL,{
    useNewUrlParser:true,
  
})


const addAdmin = async()=>{
    const role = new Role({name:'No Role', description:'No description'})
    await role.save()
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
    const role1=new Role({
        name:'Tester',
        description:'Tests code modules'
    })
    const role2=new Role({
        name:'Developer',
        description:'Developes code modules'
    })
    await role1.save()
    console.log('Tester role Created')

    await role2.save()
    console.log('Developer role Created')


}
//addMainRoles()
//addAdmin()

