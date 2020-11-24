import React, { useState, useRef, SelectHTMLAttributes } from 'react';
import Wrapper from "../../../components/Wrapper";
import { PlayerInput, PlayerNumber, PlayerSubmit } from './PlayerInputs';

export const SearchInput = () => {

    const [nickname, setNickname] = useState("");
    const playersNum = useRef<HTMLSelectElement>(null);

    const emitAddToSearch = () => {
        if(nickname && playersNum.current) {
            console.log(nickname);
            console.log(playersNum.current.value);
            console.log("stop");
        }
    }

    return (
        <Wrapper horizontal width="100%" height="2em" mb="2em">
            <PlayerInput as="input" placeholder="Enter your name..." width="30%" onChange={(e:any) => setNickname(e.value)}/>
            <PlayerNumber as="select" width="10%" ref={playersNum}>
                <option>How many players?</option>
            </PlayerNumber>
            <PlayerSubmit as="button" width="10%" onClick={() => emitAddToSearch()}>Search Game</PlayerSubmit>
        </Wrapper>
    )
}

export default SearchInput;