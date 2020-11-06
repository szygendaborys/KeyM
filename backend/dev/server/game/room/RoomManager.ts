import { threadId } from "worker_threads";
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
        this._redisClient.sadd(`${roomId}:players`, id); 
        this._redisClient.hset(roomId, `${id}:points`, 0);
    }

    public getPlayerData(id:string, roomId:string) {
        const players = this._redisClient.smembersAsync(`${roomId}:players`);
        const points = this._redisClient.hgetAsync(roomId, `${id}:points`);
        // const points = this._redisClient.hgetallAsync(roomId);
        return Promise.all([players, points]);
    }

}