const express = require('express')
const User=require('../models/user')
const Role = require('../models/role')

const auth = require('../middleware/auth')
const Authority = require('../middleware/Authority')

const router=new express.Router()

// Register a new user
router.post('/users', async(req,res)=>{

    const defaultRole = await Role.findOne({name:'no role'})
    const user = new User({...req.body, userRole:defaultRole._id})

    try {
        await user.save()
        res.status(201).send({user})
    }catch(e){
        res.status(400).send({e})
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
        res.status(500).send({e})
    }
})

//Get list of users

router.get('/users/all',auth ,Authority(1),async (req,res)=>{
    try{
        const users = await User.find({admin:false}).populate('userRole')
        res.send({users})
    }catch(e){
        res.status(500).send()
    }
})

//Change user role

router.patch('/users/update', auth ,Authority(1),async(req,res) =>{
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
router.get('/devplan', auth , Authority(3),async(req,res)=>{
    try{
        const data =' Our  plan is based on the developer team and the project that we are developing. Our goal is to work together with our best effort to meet the user requirement'

        res.send({plan:data})
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }

})

router.get('/testplan', auth , Authority(2),async(req,res)=>{
    const data ='Our  plan is to test the code modules to deliver the best outcome'
    res.status(200).send({plan:data})
})


module.exports = router