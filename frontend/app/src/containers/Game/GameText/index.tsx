import React from 'react';
import { Letter } from './Letter';
import TextWrapper from './TextWrapper';

type props = {
    text:string,
    keyIndex:number
}

export const GameText:React.FunctionComponent<props> = ({text,keyIndex}) => {

    const textLength = text.length;
    
    return (
        <TextWrapper width='60%' height='auto' horizontal>
            {text.split('').map((char:string, i:number) => <Letter key={`char${i}`} char={char} index={i} isIndexTarget={keyIndex === i}/>)}
        </TextWrapper>
    )
}

export default GameText;
