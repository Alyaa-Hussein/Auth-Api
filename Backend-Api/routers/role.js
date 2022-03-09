const express = require('express')
const Role = require('../models/role')
const User = require('../models/user')
const Authority = require('../middleware/Authority')
const auth = require('../middleware/auth')
const router = express.Router()




router.get('/roles',auth,auth,Authority(1),async(req,res)=>{
    try{

        const roles = await Role.find({})
        res.status(200).send(roles)

    }
    catch(e){
        res.status(400).send(e)

    }
    
})


router.post('/roles/add-new-role',auth,Authority(1),async(req,res)=>{
    try{
        const role = new Role(req.body)
      //  console.log("ID++++??",role._id)
        const result = await Role.isRudundantRole(role.name,role._id)
        if(result === 'unique'){
            await role.save()

        }
        else{
            throw new Error('alredy exist')
        }
        
        res.status(201).send(role)

    }
    catch(e){
        console.log("error heheh",e)
        res.status(400).send(e)

    }
    
})
// update role
router.post('/roles/update-role',auth,Authority(1),async(req,res)=>{
    try{
       const redundnt =  await Role.isRudundantRole(req.body.name,req.body.id)
       //console.log("hellllllllllllll",redundnt)
        let newRole 
        const newName = req.body.name
        const newDescription = req.body.description

        if(redundnt === 'same' || redundnt === 'unique'){
            newRole = await Role.findByIdAndUpdate(req.body.id,{name:newName,description:newDescription})

        }
        if(redundnt === 'redundant'){
           // console.log("erorr keber======>")
            throw  new Error ('already exist')
        }
        
        res.status(200).send(redundnt)

    }
    catch(e){
        console.log("error heheh",e)
        res.status(400).send(e)

    }
    
})

router.delete('/delete-role',auth,Authority(1),async(req,res)=>{
    try{
        const users = await User.find({userRole:req.body.id})
        const newRole= await Role.findOne({name:'No Role'})
       // console.log(users)
      users.forEach(async(user) => {
        const updateduser= await User.findByIdAndUpdate(user.id,{userRole:newRole._id},{new:true})
      });

    //  console.log('Role updateddddd')
        const role = await Role.deleteOne({_id:req.body.id})
      //  console.log("DELETED")
        res.status(200).send(role)

    }
    catch(e){
        //console.log("error heheh",e)
        res.status(400).send(e)

    }
    
})



module.exports =router