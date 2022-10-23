const socket = io()

// Elements

const $messageForm = document.querySelector('#chatSend')
const $messageFormInput = document.querySelector('input')
const $messageFormButton = document.querySelector('button')

socket.on('message', (message) => {

    console.log("this message is from  server!!");
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message

    socket.emit('userMesssage', message, (error) => {
        setTimeout(() => {
            $messageFormButton.removeAttribute('disabled')
            $messageFormInput.value = ''
            $messageFormInput.focus()

        }, 2000)
        if (error) {
            return console.log(error)
        }

        console.log('Message delivered!')
    });
})


const  $locationButton=document.querySelector('#send-location')

$locationButton.addEventListener('click', () => {

    if (!navigator.geolocation) {
        return alert('Geo location not supported by Browser')
    }

    $locationButton.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        var location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        socket.emit('sendLocation', location, () => {
            console.log('successfully location shared');
            setTimeout(()=>{
                $locationButton.removeAttribute('disabled')
            },2000)

        })


    })


})