import RedisAffixes from "../../../constants/RedisAffixes";
import { getRedisClient } from "../../../Redis";
import PointHandler from "../points/PointsHandler";

export default class TypingHandler {

    private _pointsHandler:PointHandler;
    private _redisClient = getRedisClient();

    private _gameText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

    constructor(pointsHandler:PointHandler) {
        this._pointsHandler = pointsHandler;
    }

    public checkChar(char:string, at:number) {
        console.log(this._gameText.charAt(at))
        console.log(char);
        console.log(this._gameText.charAt(at) === char)
        return this._gameText.charAt(at) === char;
    }

    public addCharToPlayerString(socketId:string, roomId:string, char:string) {
        this._redisClient.append(`${roomId}_${socketId}:${RedisAffixes.Suffixes.PLAYER_TEXT}`, char);
    }

    // if at = undefined => remove last char from string (if exists);
    public async removeCharFromPlayerString(socketId:string, roomId:string, at?:number) {
        return this._getGameTextValue(socketId, roomId).then((text?:string) => {
            if(!text) {
                console.error("no text provided");
                throw new Error("no text provided");
            }

            console.info(`Player text: ${text}`);
            if(!at) at = text.length - 1; // removing last char from the text

            if(!text.charAt(at)) {
                console.error("no char at the current index");
                throw new Error("no char at the current index");
            }

            const newText = text.substring(0, at);
            this._setGameTextValue(socketId, roomId, newText);

            return {
                shouldRemovePoint: text.charAt(at) === this._gameText.charAt(at)
            }
        })
    }

    public checkIfShouldFinishTheGame(points:string) {
        return this._gameText.length === Number(points);
    }

    private async _getGameTextValue(socketId:string, roomId:string) {
        return this._redisClient.getAsync(`${roomId}_${socketId}:${RedisAffixes.Suffixes.PLAYER_TEXT}`);;
    }

    private async _setGameTextValue(socketId:string, roomId:string, text:string) {
        this._redisClient.setAsync(`${roomId}_${socketId}:${RedisAffixes.Suffixes.PLAYER_TEXT}`, text);
    }
}