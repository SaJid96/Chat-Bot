const express=require('express')
const path=require('path')
const http=require('http')
const socketio=require('socket.io');




const app=express()
const server=http.createServer(app)
const io=socketio(server)

const publicDirectory=path.join('__dirname','../public')

app.use(express.static(publicDirectory))



const port=process.env.PORT || 3000
let count=0

io.on('connection',(socket)=>{
    console.log('New websocket connection');

    socket.emit('countUpdated',0)

    socket.on('increment',()=>{
        count++
        // socket.emit('countUpdated',count)
        io.emit('countUpdated',count)

 
    })
})


server.listen(port,()=>{
    console.log(`lisening on ${port}!!!!!!!!!!`);
})

