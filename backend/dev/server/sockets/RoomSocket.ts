import { Socket } from "socket.io";
import SocketController from "./controller/SocketController";

class RoomSocket extends SocketController{
    private _testRoomId:string = 'testRoom123';

    constructor(socket:Socket){
        super(socket);
        this._socket = socket;
        this._init();
    }

    private _init() {
        
    } 

}

export default RoomSocket;