// imports always go first - if we're importing anything

import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

function setUserId(sID, message) {
    //debugger;
    vm.socketID = sID;
}

function userDC(packet) {
    debugger;
    console.log(packet);
}

function appendNewMessage(msg) {
    // push incoming message into the vue instance -- messages array
    vm.messages.push(msg);
}
//main vue instance
const vm = new Vue({
    data: {
        socketID: "",
        messages: [],
        message: "",
        nickName: ""
    },
    methods: {
        dispatchMessage() {
            //emit a message event and send to the server
            console.log('handle send message');

            socket.emit('chat_message', {
                content: this.message,
                name: this.nickName || 'anonymous'
            })
            this.message = "";
        }
    },
    components: {
        newmessage: ChatMessage
    },
    mounted: function() {
        console.log('mounted');
    }
}).$mount('#app');


//some event handling -> these events are coming from the server
socket.addEventListener('connected', setUserId);
socket.addEventListener('user_disconnect', userDC);
socket.addEventListener('new_message', appendNewMessage);