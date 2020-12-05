import { Socket } from "socket.io";

export default abstract class SocketController {
    protected _socket: Socket;

    constructor(socket:Socket) {
        this._socket = socket;
    }

    protected getSocket = () => this._socket;
}