const express = require('express')
const User=require('../models/user')
const Role = require('../models/role')

const auth = require('../middleware/auth')

const router=new express.Router()

router.post('/users', async(req,res)=>{
    const role = new Role({name:'No Role', description:'No description'})
    await role.save()
    const user = new User({...req.body, userRole:role._id})

    try {
        await user.save()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findbyCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})

    }catch(e){
        res.status(400).send(e)
    }

})

router.post('/users/logout',auth, async (req,res)=>{
    try {
        
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me', auth , (req,res)=>{
    res.send(req.user)
})

router.delete('/users/me', auth , async(req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router