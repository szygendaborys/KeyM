import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import Underline from './Underline';

type props = {
    char:string,
    index:number,
    isIndexTarget:boolean,
    playerChar?:string,
}

type componentProps = {
    state: 'correct' | 'incorrect' | 'unknown',
    isSpace?:boolean,
}

const LetterComponent = styled.div<componentProps>`
    position:relative;
    min-width: ${props => props.isSpace ? '5px' : 'auto'};
    /* margin-left: ${props => props.isSpace ? '5px' : '0'}; */
    font-size: 1.2em;
    min-height:32px;
    color: ${props => props.theme.letterState[props.state]};
`;


export const Letter:React.FunctionComponent<props> = ({char, index, isIndexTarget, playerChar}) => {
    const getCharState = () => {
        if(!playerChar)
            return 'unknown';
        if(char === playerChar)
            return 'correct';

        return 'incorrect';
    }


    return char !== ' ' ? (
        <LetterComponent state={getCharState()}>
            {playerChar && playerChar !== ' ' ? playerChar : char}
            {isIndexTarget && <Underline />}
        </LetterComponent>
    ) : (
        <LetterComponent isSpace state={getCharState()}>
            {playerChar}
            {isIndexTarget && <Underline />}
        </LetterComponent>
    )
}

export default Letter;
