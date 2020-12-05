import { getio } from "../../Socket";

export default class GameManager {

    private _roomId:string;
    private _io = getio();

    constructor(roomId:string){
        this._roomId = roomId;
    }

    public finishGame(winner:string) {
        this._io.in(this._roomId).emit('game finished', {winner});
    }
}