import React, { useState, useRef, useEffect, SelectHTMLAttributes, useContext } from 'react';
import Wrapper from "../../../components/Wrapper";
import { PlayerInput, PlayerNumber, PlayerSubmit } from './PlayerInputs';
import { Socket } from 'socket.io-client';
import SocketContext from '../../../contexts/socket/context';

export const SearchInput = () => {

    const [searching, setSearching] = useState(false);
    const [gameFound, setGameFound] = useState(false);

    const [nickname, setNickname] = useState("");
    const [demandedPlayers, setDemandedPlayers] = useState(2);
    const playersNum = useRef<HTMLSelectElement>(null);
    const { socket } = useContext(SocketContext);

    useEffect(() => {   

        socket.on("start game", (data:{roomId:string}) => {
            console.log("game found");
            setGameFound(true);
        })

        return () => {
            cancelSearch();
        }

      }, []);

    const emitAddToSearch = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if(nickname && playersNum.current) {
        if(nickname && demandedPlayers) {
            const dto = {
                username:nickname,
                socketId:socket.id,
                demandedPlayers
            }
            socket.emit('add search player',dto)
            setSearching(true);
        }   
    }

    const cancelSearch = () => {
        socket.emit('remove search player',{socketId:socket.id})
        setSearching(false);
    }

    return !searching ? (
        <Wrapper as="form" horizontal width="100%" height="2em" mb="2em" onSubmit={(e:any) => emitAddToSearch(e)}>
            <PlayerInput as="input" placeholder="Enter your name..." width="30%" onChange={(e:any) => setNickname(e.target.value)}/>
            <PlayerNumber as="select" width="10%" ref={playersNum}>
                <option>How many players?</option>
            </PlayerNumber>
            <PlayerSubmit as="button" type="submit" width="10%">Search Game</PlayerSubmit>
        </Wrapper>
    ) : (
        <Wrapper horizontal width="100%" height="2em" mb="2em">
            I am searching a game :)
            <button onClick={() => cancelSearch()}>Cancel</button>
            { gameFound && <p>Game found</p>}
        </Wrapper>
    )
}

export default SearchInput;