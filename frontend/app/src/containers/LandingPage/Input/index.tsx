import React, { useState, useEffect } from 'react';
import UserInput from './UserInput';
import io from 'socket.io-client';
import { Socket } from 'dgram';

export const Input:React.FunctionComponent = () => {
    const [socket, setSocket]:any = useState<Socket | undefined>(undefined);

    useEffect(() => {
        setSocket(io());
        // socket.on("FromAPI", data => {
        //   setResponse(data);
        // });
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