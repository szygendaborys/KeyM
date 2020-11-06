import { getRedisClient } from "../../Redis";

export default class PointHandler {

    private _redisClient = getRedisClient();
    private _roomId:string;

    constructor(roomId:string) {
        this._roomId = roomId;
    }

    public addPoint(socketId:string, value:number = 1) {
        this._redisClient.hincrby(this._roomId, `${socketId}:points`, value);
    }

    public getPlayerPoints(socketId:string) {
        return this._redisClient.hgetAsync(this._roomId, `${socketId}:points`);
    }
}