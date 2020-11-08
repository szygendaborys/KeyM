import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import Underline from './Underline';

type props = {
    char:string,
    index:number,
    isIndexTarget:boolean
}

type componentProps = {
    isSpace?:boolean;
}

const LetterComponent = styled.div<componentProps>`
    position:relative;
    min-width: ${props => props.isSpace ? '5px' : 'auto'};
    /* margin-left: ${props => props.isSpace ? '5px' : '0'}; */
    font-size: 1.2em;
    min-height:32px;
`;


export const Letter:React.FunctionComponent<props> = ({char, index, isIndexTarget}) => {
    
    return char !== ' ' ? (
        <LetterComponent>
            {char}
            {isIndexTarget && <Underline />}
        </LetterComponent>
    ) : (
        <LetterComponent isSpace>
            {isIndexTarget && <Underline />}
        </LetterComponent>
    )
}

export default Letter;
