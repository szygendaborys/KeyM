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

        this._socket.on('add search player', ({username,demandedPlayers}:{username:string, demandedPlayers:string | number}) => {
            console.log("adding to search");
            const demandedPlayersNum = Number(demandedPlayers);
            if(!isNaN(demandedPlayersNum) && demandedPlayersNum > 0 && demandedPlayersNum < 4) {
                this._playersPool.addSocketToPool(this._socket, username, demandedPlayersNum);
            }
        })

        this._socket.on('remove search player', ({socketId}:{socketId:string}) => {
            console.log("removing a search")
        })
    }
    
}