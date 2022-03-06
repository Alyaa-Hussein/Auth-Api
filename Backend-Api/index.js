require('./db/mongoose')
const express = require('express')
//const bodyParser =  require('body-parser')
const userRouter= require('./routers/user')

const app= express()
app.use(express.json())
app.use(userRouter)


const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });