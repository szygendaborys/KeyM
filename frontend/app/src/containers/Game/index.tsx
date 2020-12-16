import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import SocketContext from "../../contexts/socket/context";
import GameError from "../../interfaces/GameError.interface";
import GameTextArea from "./GameText/GameTextArea";
import Letter from "./GameText/Letter";
import TextWrapper from "./GameText/TextWrapper";
import PlayerDTO from "./Interfaces/PlayerDTO.interface";
import Player from "./Player";
import PlayerWrapper from "./Player/PlayerWrapper";
import { getGameData } from "./Utils/GetGameData";
import { isCharacterKeyPress } from './Utils/TypingUtils';

const fetchedGameText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

export const Game = () => {
    const { socket } = useContext(SocketContext);
    const { roomId } = useParams<{ roomId: string }>();
    const history = useHistory();

    const textareaDOM:any = useRef(null);
    const [errors, setErrors] = useState<GameError[]>([]);
    const [points, setPoints] = useState<number>(0);
    const [keyIndex, setKeyIndex] = useState<number>(0);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [gameText, setGameText] = useState<string>('');
    const gameTextRef = useRef(fetchedGameText);
    const [playerText, setPlayerText] = useState<string>('');
    // const [players, setPlayers] = useState<PlayerDTO[]>([]);
    const players = useRef<PlayerDTO[]>([]);
    const winner = useRef<string>('');

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

    const setPlayerPoints = (socketId:string, currentPoints:number = 0, players:any) => {
        const playersToChange = [...players.current];
        const player = playersToChange.find(el => el.socketId === socketId);
        if(player) {
            player.points = currentPoints;
            // setPlayers(playersToChange);
            players.current = playersToChange;
            forceUpdate();
        }
    }

    const setWinner = (winnerId:string) => {
        document.removeEventListener('click', () => textareaDOM.current.focus(), true)
        
        winner.current = winnerId;
        forceUpdate();

        setTimeout(() => {
            history.push('/');
        }, 2000);
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
        setPlayerPoints(socket.id, playerPoints, players);
        forceUpdate();
    }

    useEffect(() => {   
        // console.log(match);
        getGameData(roomId).then(({data}:{data:{[key:string]:string}}) => {
            const playersToChange:PlayerDTO[] = [];
            for(const [socket, username] of Object.entries(data)) {
                getPlayerState(playersToChange, socket, username);
            }
            // setPlayers(playersToChange);
            players.current = playersToChange;

            if(!playersToChange.find(el => el.socketId === socket.id)) {
                const errs = [...errors];
                errs.push({
                    msg: 'You do not have access to this room',
                    code: 401
                });
                setErrors(errs);
            }

            setGameText(fetchedGameText);

            if(textareaDOM.current) textareaDOM.current.focus();
            
            document.addEventListener('click', () => {
                if(textareaDOM.current) textareaDOM.current.focus()
            }, true);
    
        })

        // return () => socket.disconnect();
        return () => {
            document.removeEventListener('click', () => textareaDOM.current.focus(), true)
        };
    }, []);

    useEffect(() => {

        socket.on("add point", ({socketId,points}:{socketId:string, points:number}) => {
            console.log(`A player of id ${socketId} score is ${points}`);
            setPlayerPoints(socketId, points, players);
        });

        socket.on("game finished", ({winner}:{winner:string}) => {
            console.info("GAME FINISHED");
            console.info(`THE WINNER IS: ${winner}`);
            setWinner(winner);
        });

        // return () => {
        //     cleanup
        // }
    }, [])

    if(errors.length > 0) {
        return (
            <Wrapper height="100%">
                {
                    errors.map(error => {
                        return error.msg;
                    })
                }
            </Wrapper>
        )
    }

    if(winner.current) {
        return (
            <Wrapper height="100%">
                Game finished!
                The winner is {winner.current}
            </Wrapper>
        )
    }

    return (
        <Wrapper height="100%">
            <PlayerWrapper side="left"> 
                {
                    players.current.map((player,i) => {
                        if(i % 2 === 0) return <Player key={`player${i}`} socketId={player.socketId} username={player.username} points={player.points} maxPoints={gameText.length} />
                    })
                }
            </PlayerWrapper>
            Points: {points}
            <TextWrapper width='60%' height='auto' horizontal>
                {gameText.split('').map((char:string, i:number) => <Letter key={`char${i}`} char={char} index={i} isIndexTarget={keyIndex === i} playerChar={playerText[i]}/>)}
                <GameTextArea ref={textareaDOM} onKeyDown={(e:any) => typingListener(e)}/>
            </TextWrapper>
            <PlayerWrapper side="right"> 
            {
                players.current.map((player,i) => {
                    if(i % 2 !== 0) return <Player key={`player${i}`} socketId={player.socketId} username={player.username} points={player.points} maxPoints={gameText.length} />
                })
            }
            </PlayerWrapper>

        </Wrapper>
    );
}

export default Game;