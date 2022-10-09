const socket=io()

socket.on('message',(message)=>{

    console.log("this is a "+message+" message");
})

document.querySelector('#chatSend').addEventListener('submit',(e)=>{
    e.preventDefault();

    const message=e.target.elements.message

    socket.emit('userMesssage',message);
})

