import { Socket } from "socket.io";
import IPlayerSearchDTO from "./interfaces/PlayerSearchDTO.interface";

export default class PlayerSearchDTO implements IPlayerSearchDTO {

    private _socket:Socket;
    private _username:string;
    private _demandedPlayers:number;

    constructor(socket:Socket, username:string, demandedPlayers:number) {
        this._socket = socket;
        this._username = username;
        this._demandedPlayers = demandedPlayers;
    }

    public get socket() { 
        return this._socket;
    }

    public get demandedPlayers() {
        return this._demandedPlayers;
    }

    public get username() {
        return this._username;
    }
}