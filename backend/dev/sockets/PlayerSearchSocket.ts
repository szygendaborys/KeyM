import { Socket } from "socket.io";
import PlayerSearch from "../services/playerSearch/PlayerSearch";
import SocketController from "./controller/SocketController";

export default class PlayerSearchSocket extends SocketController {

    private _playersPool:PlayerSearch = PlayerSearch.getInstance();

    constructor(socket:Socket) {
        super(socket);
        this._init();
    }

    private _init() {
        this._initAddPlayerToSearch();
    }

    private _initAddPlayerToSearch() {

        this._socket.on('add search player', ({username,demandedPlayers}:{username:string, demandedPlayers:number}) => {
            console.log("adding to search")
            this._playersPool.addSocketToPool(this._socket, username, demandedPlayers);
        })

        this._socket.on('remove search player', ({socketId}:{socketId:string}) => {
            console.log("removing a search")
        })
    }
    
}