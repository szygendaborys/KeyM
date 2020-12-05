import mongoose from "mongoose";
import { getio } from "../../Socket";

export default class GameManager {

    private _roomId:string | mongoose.Types.ObjectId;
    private _io = getio();

    constructor(roomId:string | mongoose.Types.ObjectId){
        this._roomId = roomId;
    }

    public startGame() {
        this._io.in(this._roomId)
    }

    public finishGame(winner:string) {
        this._io.in(this._roomId).emit('game finished', {winner});
    }
}