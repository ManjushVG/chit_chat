
const socket = io()

let name;

let textarea = document.querySelector('#textarea')

let messagearea = document.querySelector('.message_area')

while(1){
    name = prompt("Please enter your name : ")
    if(name){
        break
    }
    else{
        alert("Name is compulsory ")
    }
}

textarea.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg= {
        user : name,
        message : message.trim()
    }

    //append to message area
    appendMessage(msg, 'outgoing')

    textarea.value = ''

    scrollToBottom()
    //send to server
    socket.emit('message', msg)

}

function appendMessage(msg,type){
        let mainDiv = document.createElement('div')
        let className = type

        mainDiv.classList.add(className, 'message')

        let markup =  `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `

        mainDiv.innerHTML = markup

        messagearea.appendChild(mainDiv)
}

//recieving braodcasted msg
socket.on('message',(msg)=>{
        appendMessage(msg, 'incoming')

        scrollToBottom()
})

function scrollToBottom(){
    messagearea.scrollTop = messagearea.scrollHeight
}