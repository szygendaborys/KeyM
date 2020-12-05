import { getio } from "../../Socket";
import { Constants } from "../../utilities/Constants";
import RoomManager from "./room/RoomManager";
import PlayerSearchDTO from "../playerSearch/PlayerSearchDTO";

export default class Game {
    private _players:Set<PlayerSearchDTO>;
    private _demandedPlayers:number;
    private _gameType:Constants.GameTypes;
    
    constructor(demandedPlayers:number, gameType:Constants.GameTypes = Constants.GameTypes.NORMAL) {

        this._gameType = gameType;
        this._demandedPlayers = demandedPlayers;
        this._players = new Set();
        
    }

    public async startGame() {
        console.log("starting game...");
        const roomManager = new RoomManager();
        for(const player of Array.from(this._players)) {
            roomManager.addPlayer(player);
        }

        getio().to(roomManager.roomId.toString()).emit('start game',{
            roomId: roomManager.roomId,
            msg: ':)'
        })
    }

    public addPlayer(player:PlayerSearchDTO) {
        this._players.add(player);
    }

    public removePlayer(player:PlayerSearchDTO) {
        this._players.delete(player);
    }

    public get isFull() {
        return this._demandedPlayers === this.players.size;
    }

    public get demandedPlayers() {
        return this._demandedPlayers;
    }

    public get players() {
        return this._players;
    }

    public get gameType() {
        return this._gameType;
    }

    public get socketIds():string[] {
        return Array.from(this._players).map(el => el.socket.id);
    }
}