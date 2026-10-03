

namespace Chat {

    export function send(message: string){

        console.log("Message was sent to chat: "+message);

    }

}

namespace Email {

    export function send(message: string){

        console.log("Message was sent to email: "+message);

    }

}

Chat.send("Test")
Email.send("Test123")
