import { Socket } from "socket.io";

export default interface IPlayerSearchDTO {
    socket: Socket,
    username: string,
    demandedPlayers: number
}
