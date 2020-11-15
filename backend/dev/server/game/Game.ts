import { Constants } from "../../utilities/Constants";
import PlayerDTO from "./interfaces/playerDTO.interface";

export default class Game {
    private _players:Set<PlayerDTO>;
    private _demandedPlayers:number;
    private _gameType:Constants.GameTypes;
    
    constructor(demandedPlayers:number, gameType:Constants.GameTypes = Constants.GameTypes.NORMAL) {

        this._gameType = gameType;
        this._demandedPlayers = demandedPlayers;
        this._players = new Set();
        
    }

    public async startGame() {
        
    }

    public addPlayer(player:PlayerDTO) {
        this._players.add(player);
    }

    public removePlayer(player:PlayerDTO) {
        this._players.delete(player);
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
}