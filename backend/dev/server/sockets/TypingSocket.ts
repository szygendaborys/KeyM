import { Socket } from "socket.io";
import PointHandler from "../game/points/PointsHandler";
import RoomManager from "../game/room/RoomManager";
import { getRedisClient } from "../Redis";

class TypingSocket {
    private _socket:Socket;
    private _roomManager:RoomManager = new RoomManager();

    constructor(socket:Socket){
        this._socket = socket;
        this._init();
    }

    private _init() {
        this._initTyping();
    } 

    private _initTyping() {
        this._socket.on('char type', ({roomId,char}:{roomId:string, char:string}) => {
            let pointsHandler = new PointHandler(roomId);
            console.log("click");
            
            // this._roomManager.getPlayerData(this._socket.id, roomId).then(res => {
            //     console.log(res);
            // })

            pointsHandler.addPoint(this._socket.id)

            pointsHandler.getPlayerPoints(this._socket.id).then((points:string) => {
                const data = {
                    socketId:this._socket.id,
                    points
                }
                this._socket.broadcast.to(roomId).emit('add point', data);
            });

        })
    }

}

export default TypingSocket;