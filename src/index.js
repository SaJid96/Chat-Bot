const express=require('express')
const path=require('path')
const http=require('http')
const socketio=require('socket.io');




const app=express()
const server=http.createServer(app)
const io=socketio(server)

const publicDirectory=path.join('__dirname','../public')

app.use(express.static(publicDirectory))



const port=process.env.PORT || 30001

io.on('connection',(socket)=>{
    console.log('New websocket connection');

    socket.emit('message','welcome')

    socket.on('userMesssage',(message)=>{

        io.emit('message',message)

    })

    
})


server.listen(port,()=>{
    console.log(`lisening on ${port}!!!!!!!!!!`);
})

