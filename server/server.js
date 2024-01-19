const express=require('express')
const { connectDB } = require( './database/db' )
const app=express()
require("dotenv").config()

const port=process.env.PORT || 5000

connectDB()

app.listen(port,()=>{
    console.log(`Server live at ${port}`)
})