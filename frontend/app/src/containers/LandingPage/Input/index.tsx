import React, { useState, useEffect } from 'react';
import UserInput from './UserInput';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';

let socket:typeof Socket;

export const Input:React.FunctionComponent = () => {
    // const [socket, setSocket] = useState<typeof Socket | undefined>(undefined);
    const [points, setPoints] = useState<number>(0);

    useEffect(() => {
        socket = io();

        socket.on("add point", (data:{user:string}) => {
            const newPoints = points+1;
            setPoints(newPoints);
            console.log(data);
            console.log(`Points: ${points}`);
        });

        // return () => socket.disconnect();
      }, []);

    const onSocketInput = (e:any) => {
        const value = e.target.value;
        console.log(value);
        socket.emit('char type', value);
    }

    return (
        <UserInput onChange={(e) => onSocketInput(e)} />
    )

}

export default Input;