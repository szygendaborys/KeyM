import { StringifyOptions } from "querystring";
import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import SocketContext from "../../contexts/socket/context";
import GameTextArea from "./GameText/GameTextArea";
import Letter from "./GameText/Letter";
import TextWrapper from "./GameText/TextWrapper";
import PlayerDTO from "./Interfaces/PlayerDTO.interface";
import { getGameData } from "./Utils/GetGameData";
import { isCharacterKeyPress } from './Utils/TypingUtils';

const fetchedGameText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

export const Game = () => {
    const { socket } = useContext(SocketContext);
    const { roomId } = useParams<{ roomId: string }>();
    
    const textareaDOM:any = useRef(null);
    const [points, setPoints] = useState<number>(0);
    const [keyIndex, setKeyIndex] = useState<number>(0);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [gameText, setGameText] = useState<string>('');
    const gameTextRef = useRef(fetchedGameText);
    const [playerText, setPlayerText] = useState<string>('');
    const [players, setPlayers] = useState<PlayerDTO[]>([]);

    const getPlayerState = (players:PlayerDTO[], socketId:string, username:string, points:number = 0) => {
        const playerDTO:PlayerDTO = {
            socketId, username, points
        }
        const index = players.findIndex(el => el.socketId === socketId);
        if(index < 0) {
            players.push(playerDTO);
        } else {
            players[index] = playerDTO;
        }
    }

    let typingListener = function(e:any) {
        let index = keyIndex;
        let text = playerText;
        let playerPoints = points;
        const gameText = gameTextRef.current;
        console.log(players);

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
        // console.log(match);
        getGameData(roomId).then(({data}:{data:{[key:string]:string}}) => {
            const playersToChange:PlayerDTO[] = [];
            for(const [socket, username] of Object.entries(data)) {
                getPlayerState(playersToChange, socket, username);
            }
            setPlayers(playersToChange);

            setGameText(fetchedGameText);

            textareaDOM.current.focus();
            
            document.addEventListener('click', () => textareaDOM.current.focus(), true);
    
            socket.on("add point", ({socketId,points}:{socketId:string, points:string}) => {
                console.log(`A player of id ${socketId} score is ${points}`);
            });
    
            socket.on("game finished", ({winner}:{winner:string}) => {
                console.info("GAME FINISHED");
                console.info(`THE WINNER IS: ${winner}`);
            });
        })

        // return () => socket.disconnect();
        return () => {
            document.removeEventListener('click', () => textareaDOM.current.focus(), true)
        };
    }, []);

    return (
        <Wrapper height="100%">
            Points: {points}
            <TextWrapper width='60%' height='auto' horizontal>
                {gameText.split('').map((char:string, i:number) => <Letter key={`char${i}`} char={char} index={i} isIndexTarget={keyIndex === i} playerChar={playerText[i]}/>)}
                <GameTextArea ref={textareaDOM} onKeyDown={(e:any) => typingListener(e)}/>
            </TextWrapper>
        </Wrapper>
    );
}

export default Game;