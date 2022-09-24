const express=require('express')
const path=require('path')
const app=express()

const publicDirectory=path.join('__dirname','../public')

app.use(express.static(publicDirectory))



const port=process.env.PORT || 30004


app.listen(port,()=>{
    console.log(`lisening on ${port}!!!!!!!!!!`);
})

