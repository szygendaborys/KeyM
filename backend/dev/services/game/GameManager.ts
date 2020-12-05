import mongoose from "mongoose";
import { getio } from "../../Socket";
import RoomManager from "./room/RoomManager";

export default class GameManager {

    private _roomId:mongoose.Types.ObjectId;
    private _io = getio();

    constructor(roomId:mongoose.Types.ObjectId){
        this._roomId = roomId;
    }

    public startGame() {
        this._io.in(this._roomId)
    }

    public finishGame(winner:string) {
        this._io.in(this._roomId).emit('game finished', {winner});
    }

    // this gets an initial game data required in order to start the game
    public async getGameData() {

        const [data] = await new RoomManager(this._roomId).getAllPlayersData();
        // has to return 

        // players: ( socketID , username, points )
        // text: string

        return data;
    }
}