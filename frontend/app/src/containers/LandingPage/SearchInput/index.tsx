import React, { useState, useRef, useEffect, SelectHTMLAttributes, useContext } from 'react';
import Wrapper from "../../../components/Wrapper";
import { PlayerInput, PlayerNumber, PlayerSubmit } from './PlayerInputs';
import SocketContext from '../../../contexts/socket/context';
import { useHistory } from 'react-router-dom';
import config from '../../../constants/config';
import Timer from '../Timer';
import CancelButton from '../Timer/CancelButton';
import Title from '../../../components/Title';
import SubTitle from '../../../components/SubTitle';
import { addLeadingZero } from '../../Game/Utils/MathUtils';

export const SearchInput = () => {

    const [searching, setSearching] = useState(false);
    const [gameFound, setGameFound] = useState(false);
    const [timeLeftToStart, setTimeLeftToStart] = useState(`0.000`);
    const history = useHistory();

    const [nickname, setNickname] = useState("");
    const [demandedPlayers, setDemandedPlayers] = useState(0);
    const playersNum = useRef<HTMLSelectElement>(null);
    const { socket } = useContext(SocketContext);

    const initStartGameTimer = (timeInMs:number) => {
        const startDate = new Date(Date.now() + timeInMs);
        setInterval(() => {
            getTimeLeft(startDate)
        }, 1)   
    }

    const getTimeLeft = (startDate:Date) => {
        if(startDate <= new Date()) return `0.000`;
        const msDiff = startDate.getTime() - Date.now();
        const seconds = Math.floor(msDiff / 1000);
        const milliseconds = msDiff - seconds * 1000;
        setTimeLeftToStart(`${addLeadingZero(seconds)}.${addLeadingZero(milliseconds, 3)}`);
    }

    const handlePlayerNumSelect = (e:any) => {
        setDemandedPlayers(e.target.value);
    }

    useEffect(() => {   

        socket.on("start game", ({roomId}:{roomId:string}) => {
            initStartGameTimer(5000);
            setGameFound(true);
            setTimeout(() => {
                history.push(`/game/${roomId}`)
            }, 5000)
        })

        return () => {
            cancelSearch();
        }

      }, []);

    const emitAddToSearch = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if(nickname && playersNum.current) {
        if(nickname && demandedPlayers > 0) {
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
            <PlayerNumber as="select" width="10%" ref={playersNum} onChange={(e:any) => handlePlayerNumSelect(e)} >
                <PlayerNumber as="option" selected disabled hidden>How many players?</PlayerNumber>
                {
                    config.playersNumber.map(number => <PlayerNumber as="option" value={number} key={`${number}opt`}>{number} Players</PlayerNumber>)
                }
            </PlayerNumber>
            <PlayerSubmit as="button" type="submit" width="10%">Search Game</PlayerSubmit>
        </Wrapper>
    ) : (
        <Wrapper height="100%" >
            { !gameFound && <>
                <Timer startTimer={true}/>
                <CancelButton onClick={() => cancelSearch()}>Cancel</CancelButton>
            </>}
            { gameFound && <>
                <Title size="5em">Game found!</Title>
                <SubTitle size="3em">Time left to start: {timeLeftToStart}</SubTitle>
            </>}
        </Wrapper>
    )
}

export default SearchInput;