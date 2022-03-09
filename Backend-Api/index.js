require('./db/mongoose')
const express = require('express')
const userRouter= require('./routers/user')
const roleRouter = require('./routers/role')

const app= express()
app.use(express.json())
app.use(userRouter)
app.use(roleRouter)


const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });