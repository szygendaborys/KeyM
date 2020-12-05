import { Socket } from "socket.io";
import { Server } from "http";
import TypingSocket from "./sockets/TypingSocket";
import { getRedisClient } from "./Redis";
import RoomManager from "./services/game/room/RoomManager";
import PlayerSearchSocket from "./sockets/PlayerSearchSocket";
import RoomSocket from "./sockets/RoomSocket";
// import { Server } from "https";

const _testRoomId:string = 'testRoom123';
let io:any;


let getio = function() {
    if (!io) throw new Error("must call .init(server) before you can call .getio()");
    return io;
}
let initio = function(server:Server) {
    io = require('socket.io').listen(server); 
    io.origins('*:*');

    // const roomManager = new RoomManager();
    // roomManager.create();

    io.on('connection', (socket:Socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        // player join
        // socket.join(_testRoomId);
        // roomManager.addPlayer(socket.id, _testRoomId);
        // socket.emit('joined to', {roomId: _testRoomId});
        
        new TypingSocket(socket);
        new PlayerSearchSocket(socket);
        new RoomSocket(socket);
    });

    return io;
}

export {
    getio, initio
}
