import { Socket } from "socket.io";
import SocketController from "./controller/SocketController";

export default class PlayerSearchSocket extends SocketController {

    constructor(socket:Socket) {
        super(socket);
        this._init();
    }

    private _init() {
        this._initAddPlayerToSearch();
    }

    private _initAddPlayerToSearch() {
        // socketId:string, username:string

        // todo .on players add search you query the mongo db if there are any players looking for the game, if there are - > substract this player and start the game, if not -> add this guys to the pool
        this._socket.on('add search player', ({socketId,username}:{socketId:string, username:string}) => {
            
        })
    }
    
}