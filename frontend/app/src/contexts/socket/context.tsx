import io, { Socket } from "socket.io-client";
import { createContext } from "react";

const SocketContext:React.Context<{
    socket: typeof Socket;
}> = createContext({
    socket: io()
})

export default SocketContext;