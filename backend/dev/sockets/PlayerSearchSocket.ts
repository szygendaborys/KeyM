import { Socket } from "socket.io";
import PlayerSearch from "../dataModel/searching/PlayerSearch";
import PlayerSearchModel from "../models/PlayerSearchModel";
import PlayerSearchHandler from "../services/playerSearch/PlayerSearchAlgorithm";
import SocketController from "./controller/SocketController";

export default class PlayerSearchSocket extends SocketController {

    private _handler = PlayerSearchHandler.getInstance();

    constructor(socket:Socket) {
        super(socket);
        this._init();
    }

    private _init() {
        this._initAddPlayerToSearch();
    }

    private _initAddPlayerToSearch() {
        // socketId:string, username:string

        this._socket.on('add search player', ({socketId,username,demandedPlayers}:{socketId:string, username:string, demandedPlayers:number}) => {
            PlayerSearchModel.addPlayerToQueue(username, socketId, demandedPlayers);
        })
    }
    
}