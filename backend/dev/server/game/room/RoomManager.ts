import { threadId } from "worker_threads";
import RedisAffixes from "../../../constants/RedisAffixes";
import { getRedisClient } from "../../Redis";

export default class RoomManager {

    private _redisClient = getRedisClient();

    constructor() {
    }

    public create(id?:string) {
        if(!id)
            id = 'testRoom123';

        // playerData: {user:string, points:number}
    
    }

    public addPlayer(id:string, roomId:string) {
        this._redisClient.sadd(`${roomId}${RedisAffixes.Suffixes.PLAYERS}`, id); 
        this._redisClient.hset(roomId, `${id}${RedisAffixes.Suffixes.PLAYER_POINTS}`, 0);
    }

    public getPlayerData(id:string, roomId:string) {
        const players = this._redisClient.smembersAsync(`${roomId}${RedisAffixes.Suffixes.PLAYERS}`);
        const points = this._redisClient.hgetAsync(roomId, `${id}${RedisAffixes.Suffixes.PLAYER_POINTS}`);
        // const points = this._redisClient.hgetallAsync(roomId);
        return Promise.all([players, points]);
    }

}