import mongoose from "mongoose";
import RedisAffixes from "../../../constants/RedisAffixes";
import { getRedisClient } from "../../../Redis";
import PlayerSearchDTO from "../../playerSearch/PlayerSearchDTO";

export default class RoomManager {

    private _redisClient = getRedisClient();
    private _roomId:string;

    constructor(roomId?:mongoose.Types.ObjectId) {
        this._roomId = roomId ? roomId.toString() : new mongoose.Types.ObjectId().toString();
    }

    public addPlayer(playerDTO:PlayerSearchDTO) {
        this._redisClient.hset(`${this.roomId}${RedisAffixes.Suffixes.PLAYER_POINTS}`, `${playerDTO.socket.id}`, 0);
        this._redisClient.hset(`${this.roomId}${RedisAffixes.Suffixes.PLAYERS}`, playerDTO.socket.id, playerDTO.username);
        playerDTO.socket.join(this._roomId);
    }

    public getPlayerData(id:string) {
        const players = this._redisClient.smembersAsync(`${this._roomId}${RedisAffixes.Suffixes.PLAYERS}`);
        const points = this._redisClient.hgetAsync(`${this._roomId}${RedisAffixes.Suffixes.PLAYER_POINTS}`, `${id}`);
        return Promise.all([players, points]);
    }

    public getAllPlayersData() {
        return this._redisClient.hgetallAsync(`${this._roomId}${RedisAffixes.Suffixes.PLAYERS}`);
    }

    public getRoomText() {
        return `lorem ipsum dolor sit amet consectetur adipiscing elit.`;
    }

    public get roomId() {
        return this._roomId;
    }

}