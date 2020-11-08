import React, { useEffect, useState, useReducer } from "react";
import io, { Socket } from "socket.io-client";
import Wrapper from "../../components/Wrapper";
import GameText from "./GameText";
import { isCharacterKeyPress } from './Utils/TypingUtils';

let socket:typeof Socket;

export const Game = () => {
    const [roomId, setRoomId] = useState<string>('testRoom123');
    const [keyIndex, setKeyIndex] = useState<number>(0);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [gameText, setGameText] = useState<string>('');
    const [playerText, setPlayerText] = useState<string>('');

    useEffect(() => {   
        socket = io();

        // Currying
        const typingListener = (roomId:string, keyIndex:number, setKeyIndex:Function) => {
            let index = keyIndex;
            let text = playerText;

            return function(e:any) {
                if(e.keyCode === 8 && index > 0) {
                    index--;
                    // emit.removeLastPoint
                    setKeyIndex(index);
                    text = text.slice(0,-1);
                }

                if(isCharacterKeyPress(e)) {
                    const char = e.key;
                    const data = {
                        char,
                        at:keyIndex,
                        roomId
                    }
                    socket.emit('char type', data);
                    index++;
                    text += char;
                }

                console.log(index);
                console.log(text);

                setKeyIndex(index);
                setPlayerText(text);
                forceUpdate();
            }
        }

        document.addEventListener('keydown', typingListener(roomId, keyIndex,setKeyIndex).bind({data:'someValue'}), true);

        socket.on("add point", ({socketId,points}:{socketId:string, points:string}) => {

            console.log(`A player of id ${socketId} score is ${points}`);
        });

        // socket.on("joined to", (data:{roomId:string}) => {
        //     console.log("joined" + data.roomId)
        //     setRoomId(data.roomId);
        // })

        setGameText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

        // return () => socket.disconnect();
        // return () => document.removeEventListener();
    }, []);

    return (
        <Wrapper>
            <GameText text={gameText} keyIndex={keyIndex} />
        </Wrapper>
    );
}

export default Game;