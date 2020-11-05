import { Socket } from "socket.io";
import { Server } from "http";
import TypingSocket from "./sockets/TypingSocket";
// import { Server } from "https";

let io:any;

let getio = function() {
    if (!io) throw new Error("must call .init(server) before you can call .getio()");
    return io;
}
let initio = function(server:Server) {
    io = require('socket.io').listen(server); 
    io.origins('*:*');

    io.on('connection', (socket:Socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        
        new TypingSocket(socket);
    });

    return io;
}

export {
    getio, initio
}
