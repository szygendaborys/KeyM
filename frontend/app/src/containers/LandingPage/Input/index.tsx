import React, { useState, useEffect } from 'react';
import UserInput from './UserInput';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { GameText } from '../GameText';

let socket:typeof Socket;

export const Input:React.FunctionComponent = () => {
    // const [socket, setSocket] = useState<typeof Socket | undefined>(undefined);
    const [room, setRoomId] = useState<string>('');
    const roomId = 'testRoom123';

    const [gameText, setGameText] = useState<string>('');

    useEffect(() => {   
        socket = io();

        socket.on("add point", ({socketId,points}:{socketId:string, points:string}) => {

            console.log(`A player of id ${socketId} score is ${points}`);
        });

        socket.on("joined to", (data:{roomId:string}) => {
            setRoomId(data.roomId);
        })

        setGameText(
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
        );

        // return () => socket.disconnect();
      }, []);

    const onSocketInput = (e:any) => {
        const value = e.target.value;
        console.log(value);
        const data = {
            char:value.slice(-1),
            at:value.length - 1,
            roomId
        }
        socket.emit('char type', data);
    }

    return (
        <div>
            <GameText text={gameText} />
            <UserInput onChange={(e) => onSocketInput(e)} />
        </div>
    )

}

export default Input;

// function isCharacterKeyPress(evt) {
    //     if (typeof evt.which == "undefined") {
    //         // This is IE, which only fires keypress events for printable keys
    //         return true;
    //     } else if (typeof evt.which == "number" && evt.which > 0) {
    //         // In other browsers except old versions of WebKit, evt.which is
    //         // only greater than zero if the keypress is a printable key.
    //         // We need to filter out backspace and ctrl/alt/meta key combinations
    //         return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8;
    //     }
    //     return false;
    // }

    // <input type="text" onkeypress="alert(isCharacterKeyPress(event))"></input>