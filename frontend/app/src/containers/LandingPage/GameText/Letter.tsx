import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';

type props = {
    char:string,
    index:number
}

type componentProps = {
    isSpace?:boolean;
}

const LetterComponent = styled.div<componentProps>`
    margin-left: ${props => props.isSpace ? '10px' : '0'};
`;

export const Letter:React.FunctionComponent<props> = ({char, index}) => {
    
    return char !== ' ' ? (
        <LetterComponent>
            {char}
        </LetterComponent>
    ) : (
        <LetterComponent isSpace={true}/>
    )
}

export default Letter;
