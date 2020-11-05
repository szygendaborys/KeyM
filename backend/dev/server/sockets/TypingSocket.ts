import { Socket } from "socket.io";

class TypingSocket {
    private _socket:Socket;

    constructor(socket:Socket){
        this._socket = socket;
        this._init();
    }

    private _init() {
        this._initTyping();
    } 

    private _initTyping() {
        this._socket.on('char type', (msg:string) => {
            console.log("click");
            console.log(msg);
        })
    }
}

export default TypingSocket;