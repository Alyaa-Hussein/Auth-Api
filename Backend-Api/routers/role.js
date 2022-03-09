const express = require('express')
const Role = require('../models/role')
const auth = require('../middleware/auth')
const router = express.Router()



router.get('/roles',auth,async(req,res)=>{
    //console.log("hello from backend")
    try{

        const roles = await Role.find({})
        //console.log("Roles==>",roles)
        res.status(200).send(roles)

    }
    catch(e){
        //console.log("error heheh",e)
        res.status(400).send(e)

    }
    
})


router.post('/roles/add-new-role',auth,async(req,res)=>{
    try{
        const role = new Role(req.body)
        console.log("ID++++??",role._id)
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
router.post('/roles/update-role',auth,async(req,res)=>{
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

router.delete('/delete-role',auth,async(req,res)=>{
    try{
        const role = await Role.deleteOne({_id:req.body.id})
        console.log("DELETED")
        res.status(200).send(role)

    }
    catch(e){
        //console.log("error heheh",e)
        res.status(400).send(e)

    }
    
})



module.exports =router