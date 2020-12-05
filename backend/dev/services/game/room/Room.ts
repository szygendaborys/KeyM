import mongoose from "mongoose";

export default class Room {
    private _id:mongoose.Types.ObjectId;
    private _gameText:string;
    private _players:string[];

    constructor(id:mongoose.Types.ObjectId, players:string[], gameText:string) {
        this._id = id;
        this._players = players;
        this._gameText = gameText;
    }

}