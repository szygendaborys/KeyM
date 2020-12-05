import mongoose from "mongoose";
import { Socket } from "socket.io";
import { threadId } from "worker_threads";
import RedisAffixes from "../../../constants/RedisAffixes";
import { getRedisClient } from "../../../Redis";
import { getio } from "../../../Socket";
import PlayerSearchDTO from "../../playerSearch/PlayerSearchDTO";

export default class RoomManager {

    private _redisClient = getRedisClient();
    private _roomId:mongoose.Types.ObjectId;

    constructor() {
        this._roomId = new mongoose.Types.ObjectId();
    }

    public addPlayer(playerDTO:PlayerSearchDTO) {
        this._redisClient.sadd(`${this.roomId.toString()}${RedisAffixes.Suffixes.PLAYERS}`, playerDTO.socket.id); 
        this._redisClient.hset(this.roomId.toString(), `${playerDTO.socket.id}${RedisAffixes.Suffixes.PLAYER_POINTS}`, 0);
        this._redisClient.hset(this.roomId.toString(), playerDTO.socket.id, playerDTO.username);
        playerDTO.socket.join(this._roomId.toString());
    }

    public getPlayerData(id:string, roomId:string) {
        const players = this._redisClient.smembersAsync(`${this._roomId.toString()}${RedisAffixes.Suffixes.PLAYERS}`);
        const points = this._redisClient.hgetAsync(this._roomId.toString(), `${id}${RedisAffixes.Suffixes.PLAYER_POINTS}`);
        // const points = this._redisClient.hgetallAsync(roomId);
        return Promise.all([players, points]);
    }

    public get roomId() {
        return this._roomId;
    }

}