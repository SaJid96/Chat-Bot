const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io');
const Filter = require('bad-words')
const { generateMessage ,genrateLocationMessage} = require('./utils/messages')



const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectory = path.join('__dirname', '../public')

app.use(express.static(publicDirectory))



const port = process.env.PORT || 30001

io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.emit('message', generateMessage('Welcome'))
    socket.broadcast.emit('message', generateMessage('A new user joined'))

    socket.on('userMesssage', (message, callback) => {

        var filter = new Filter({ list: ['some', 'bad', 'word'] });

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', generateMessage(message))
        callback()

    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user left'))
    })
    socket.on('sendLocation', (location, callback) => {

        io.emit('locationmessage', genrateLocationMessage("https://www.google.com/maps?q="+location.latitude+","+location.longitude ))
        callback()

    })

})


server.listen(port, () => {
    console.log(`lisening on ${port}!!!!!!!!!!`);
})

