import { Socket } from "socket.io";
import PlayerSearchAlgorithm from "./PlayerSearchAlgorithm";
import PlayerSearchDTO from "./PlayerSearchDTO";

export default class PlayerSearch extends PlayerSearchAlgorithm {

    private static _instance:PlayerSearch;

    public static getInstance() {
        if(!PlayerSearch._instance) PlayerSearch._instance = new PlayerSearch();
        return PlayerSearch._instance;
    }

    constructor() {
        super();
        this.initSearch();
    }


    public addSocketToPool(socket:Socket, username:string, demandedPlayers:number) {
        this._playersPool.set(socket.id, new PlayerSearchDTO(socket,username,demandedPlayers));
    }
}