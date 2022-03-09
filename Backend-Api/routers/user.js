const express = require('express')
const User=require('../models/user')
const Role = require('../models/role')

const auth = require('../middleware/auth')

const router=new express.Router()

// Register a new user
router.post('/users', async(req,res)=>{

    const defaultRole = await Role.findOne({name:'No Role'})
    const user = new User({...req.body, userRole:defaultRole._id})

    try {
        await user.save()
        res.status(201).send({user})
    }catch(e){
        res.status(400).send(e)
    }
})
// User Login
router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findbyCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        const info=await user.populate('userRole')
        res.send({user,token,info})

    }catch(e){
        res.status(400).send({e})
    }

})
// User logout
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

//Get list of users

router.get('/users/all',auth ,async (req,res)=>{
    try{
        const users = await User.find({admin:false}).populate('userRole')
        res.send({users})
    }catch(e){
        res.status(500).send()
    }
})

//Change user role

router.patch('/users/update', auth , async(req,res) =>{
    try{
        const newRole= await Role.findOne({name:req.body.role})
        const user= await User.findByIdAndUpdate(req.body.id,{userRole:newRole._id},{new:true})
        res.send(user)
        
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me',auth, async(req,res)=>{
    const user= req.user
    const info = await user.populate('userRole')
    res.send(info)
})


/*router.delete('/users/me', auth , async(req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})*/

module.exports = router