import { Socket } from "socket.io";

class RoomSocket {
    private _socket:Socket;

    private _testRoomId:string = 'testRoom123';

    constructor(socket:Socket){
        this._socket = socket;
        this._init();
    }

    private _init() {
        
    } 



}

export default RoomSocket;