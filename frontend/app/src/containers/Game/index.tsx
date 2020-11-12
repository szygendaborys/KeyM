import React, { useEffect, useState, useReducer, useRef } from "react";
import io, { Socket } from "socket.io-client";
import Wrapper from "../../components/Wrapper";
import Letter from "./GameText/Letter";
import GameTextArea from "./GameText/GameTextArea";
import TextWrapper from "./GameText/TextWrapper";
import { isCharacterKeyPress } from './Utils/TypingUtils';

let socket:typeof Socket;
const fetchedGameText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

export const Game = () => {
    const textareaDOM:any = useRef(null);
    const [points, setPoints] = useState<number>(0);
    const [roomId, setRoomId] = useState<string>('testRoom123');
    const [keyIndex, setKeyIndex] = useState<number>(0);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [gameText, setGameText] = useState<string>('');
    const gameTextRef = useRef(fetchedGameText);
    const [playerText, setPlayerText] = useState<string>('');

    let typingListener = function(e:any) {
        let index = keyIndex;
        let text = playerText;
        let playerPoints = points;
        const gameText = gameTextRef.current;

        if(e.keyCode === 8 && index > 0) {
            const char = text.charAt(keyIndex - 1)
            const data = {
                at:keyIndex - 1,
                roomId
            }
            if(char === gameText[keyIndex - 1])
                playerPoints--;
            
            index--;
            
            socket.emit('remove char', data)
            setKeyIndex(index);
            text = text.slice(0,keyIndex - 1);
        } else if(isCharacterKeyPress(e)) {
            const char = e.key;
            const data = {
                char,
                at:keyIndex,
                roomId
            }
            socket.emit('char type', data);

            if(gameText[index] === char)
                playerPoints++;

            index++;
            text += char;
        }

        console.log(index);
        console.log(text);

        setKeyIndex(index);
        setPlayerText(text);
        setPoints(playerPoints);
        forceUpdate();
    }

    useEffect(() => {   
        setGameText(fetchedGameText);

        socket = io();

        textareaDOM.current.focus();
        
        document.addEventListener('click', () => textareaDOM.current.focus(), true);

        socket.on("add point", ({socketId,points}:{socketId:string, points:string}) => {
            console.log(`A player of id ${socketId} score is ${points}`);
        });

        // socket.on("joined to", (data:{roomId:string}) => {
        //     console.log("joined" + data.roomId)
        //     setRoomId(data.roomId);
        // })

        // return () => socket.disconnect();
        // return () => document.removeEventListener();
    }, []);

    return (
        <Wrapper>
            Points: {points}
            {/* <GameText text={gameText} playerText={playerText} keyIndex={keyIndex} /> */}

            <TextWrapper width='60%' height='auto' horizontal>
                {gameText.split('').map((char:string, i:number) => <Letter key={`char${i}`} char={char} index={i} isIndexTarget={keyIndex === i} playerChar={playerText[i]}/>)}
                <GameTextArea ref={textareaDOM} onKeyDown={(e:any) => typingListener(e)}/>
            </TextWrapper>
        </Wrapper>
    );
}

export default Game;