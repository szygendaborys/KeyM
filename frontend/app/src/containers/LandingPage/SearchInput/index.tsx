import React from 'react';
import Wrapper from "../../../components/Wrapper";
import { PlayerInput, PlayerNumber, PlayerSubmit } from './PlayerInputs';

export const SearchInput = () => {



    return (
        <Wrapper horizontal width="100%" height="2em" mb="2em">
            <PlayerInput as="input" placeholder="Enter your name..." width="30%" />
            <PlayerNumber as="select" width="10%" >
                <option>How many players?</option>
            </PlayerNumber>
            <PlayerSubmit as="button" width="10%">Search Game</PlayerSubmit>
        </Wrapper>
    )
}

export default SearchInput;