import { Socket } from "socket.io";
import GameManager from "../services/game/GameManager";
import PointHandler from "../services/game/points/PointsHandler";
import RoomManager from "../services/game/room/RoomManager";
import TypingHandler from "../services/game/typing/TypingHandler";
import SocketController from "./controller/SocketController";

class TypingSocket extends SocketController {
    // private _roomManager:RoomManager = new RoomManager();

    constructor(socket:Socket){
        super(socket);
        this._socket = socket;
        this._init();
    }

    private _init() {
        this._initTyping();
        this._initCharRemoval();

    } 

    private _initTyping() {
        this._socket.on('char type', ({roomId,char,at}:{roomId:string, char:string, at:number}) => {
            const pointsHandler = new PointHandler(roomId);
            const typingHandler = new TypingHandler(pointsHandler);

            if(typingHandler.checkChar(char, at))
                pointsHandler.addPoint(this._socket.id)

            pointsHandler.getPlayerPoints(this._socket.id).then((points:string) => {
                const data = {
                    socketId:this._socket.id,
                    points
                }
                this._socket.broadcast.to(roomId).emit('add point', data);

                if(typingHandler.checkIfShouldFinishTheGame(points)) 
                    new GameManager(roomId).finishGame(this._socket.id);
                
            });

            typingHandler.addCharToPlayerString(this._socket.id, roomId, char);
        
        })
    }

    private _initCharRemoval() {
        try {
            this._socket.on('remove char', ({roomId,at}:{roomId:string, at?:number}) => {
                const pointsHandler = new PointHandler(roomId);
                const typingHandler = new TypingHandler(pointsHandler);
    
                typingHandler.removeCharFromPlayerString(this._socket.id, roomId, at).then(res => {
                    if(res.shouldRemovePoint){
                        pointsHandler.addPoint(this._socket.id, -1);
                    }
                });
            })
        } catch (err) {
            console.error(err);
        }
    }

}

export default TypingSocket;