const express = require('express')
const Role = require('../models/role')
const auth = require('../middleware/auth')
const router = express.Router()



router.get('/roles',auth,async(req,res)=>{
    try{

        const roles = await Role.find({})
        res.status(200).send(roles)

    }
    catch(e){
        res.status(400).send(e)

    }
    
})


router.post('/roles/add-new-role',auth,async(req,res)=>{
    try{
        const role = new Role(req.body)
        await Role.isRudundantRole(role.name)
        await role.save()
        res.status(201).send(role)

    }
    catch(e){
        //console.log("error heheh",e)
        res.status(400).send(e)

    }
    
})
// update role
router.post('/roles/update-role',auth,async(req,res)=>{
    try{
        await Role.isRudundantRole(req.body.name)
        let newRole 
        const newName = req.body.name
        const newDescription = req.body.description
        if(newName ==='' || newDescription ===''){
            throw new Error ("Empty Field!!!")
        }
        else{
            newRole = await Role.findByIdAndUpdate(req.body.id,{name:newName,description:newDescription})
            console.log("updated",newRole)
        }
        //console.log("Roles==>",currentRole)
        res.status(200).send(newRole)

    }
    catch(e){
        //console.log("error heheh",e)
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