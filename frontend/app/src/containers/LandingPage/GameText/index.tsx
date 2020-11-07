import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import Wrapper from '../../../components/Wrapper';
import { Letter } from './Letter';

type props = {
    text:string
}

export const GameText:React.FunctionComponent<props> = ({text}) => {
    const textLength = text.length;
    
    return (
        <Wrapper width={80} horizontal>
            {text.split('').map((char:string, i:number) => <Letter key={`char${i}`} char={char} index={i} />)}
        </Wrapper>
    )
}

export default GameText;
