const express=require('express')
const path=require('path')
const http=require('http')
const socketio=require('socket.io');




const app=express()
const server=http.createServer(app)
const io=socketio(server)

const publicDirectory=path.join('__dirname','../public')

app.use(express.static(publicDirectory))



const port=process.env.PORT || 30004


io.on('connection',()=>{
    console.log('New websocket connection');
})


server.listen(port,()=>{
    console.log(`lisening on ${port}!!!!!!!!!!`);
})

