import React, { useEffect, useState } from 'react';
import SubTitle from '../../components/SubTitle';
import Wrapper from '../../components/Wrapper';
import { addLeadingZero } from '../Game/Utils/MathUtils';

export const TestingView:React.FunctionComponent = () => {

    const [timeLeftToStart, setTimeLeftToStart] = useState(`0.000`);

    useEffect(() => {
        setInterval(() => {
            getTimeLeft(new Date(2020,11,25,19,35))
        }, 1)        
    }, [])

    const getTimeLeft = (startDate:Date) => {
        if(startDate <= new Date()) return `0.000`;
        const msDiff = startDate.getTime() - Date.now();
        const seconds = Math.floor(msDiff / 1000);
        const milliseconds = msDiff - seconds * 1000;
        setTimeLeftToStart(`${addLeadingZero(seconds)}.${addLeadingZero(milliseconds, 3)}`);
    }

    return (
        <Wrapper height="100%" width="100%" >
            <SubTitle size="3em">Time left to start: {timeLeftToStart}</SubTitle>
        </Wrapper>
    )
}

export default TestingView;