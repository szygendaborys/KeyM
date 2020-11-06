import React, { useState, useEffect } from 'react';
import UserInput from './UserInput';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';

let socket:typeof Socket;

export const Input:React.FunctionComponent = () => {
    // const [socket, setSocket] = useState<typeof Socket | undefined>(undefined);
    const [room, setRoomId] = useState<string>('');
    const roomId = 'testRoom123';

    useEffect(() => {   
        socket = io();

        socket.on("add point", ({socketId,points}:{socketId:string, points:string}) => {

            console.log(`A player of id ${socketId} score is ${points}`);
        });

        socket.on("joined to", (data:{roomId:string}) => {
            setRoomId(data.roomId);
        })

        // return () => socket.disconnect();
      }, []);

    const onSocketInput = (e:any) => {
        const value = e.target.value;
        console.log(value);
        const data = {
            char:value,
            roomId
        }
        socket.emit('char type', data);
    }

    return (
        <UserInput onChange={(e) => onSocketInput(e)} />
    )

}

export default Input;