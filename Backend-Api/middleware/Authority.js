const Authority =(param)=>{
   // const admin = req.user.admin
   return(req,res,next)=>{
       try{
           
        const admin = req.user.admin
        const role = req.user.userRole.name
     
        if (admin && param === 1)
        {
            console.log('admin authorized')
        }else if (!admin && param === 2 && role === 'Tester'){
            console.log('Tester Authorized')
        }
        else if (!admin && param === 3 && role === 'Developer'){
            console.log('Developer Authorized')
        }

        else {
           // console.log('Hello from else')
            throw new Error('Not Authorized')
        }

        next()
       }catch(e){
        res.status(401).send('You are not authorized to access this page !!')

       }
       
   }
}

module.exports = Authority