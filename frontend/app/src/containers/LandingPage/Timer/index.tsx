import React, { useEffect, useState } from 'react';
import Title from '../../../components/Title';
import SubTitle from '../../../components/SubTitle';
import Wrapper from '../../../components/Wrapper';
import { addLeadingZero } from '../../Game/Utils/MathUtils';

type props = {
    startTimer:boolean;
}

export const Timer = ({startTimer}:props) => {

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    
    const init = () => {
        let seconds = 0;
        let minutes = 0;
        setInterval(() => {
            seconds++;
            if(seconds >= 60) {
                minutes++;
                seconds = 0;
                setSeconds(0);
                setMinutes(minutes);
            } else {
                setSeconds(seconds);
            }
        }, 1000);
    }

    useEffect(() => {
        if(startTimer) {
            if(seconds === 0 && minutes === 0) {
                init();
            }
        } else {
            setSeconds(0);
            setMinutes(0);
        }

        return () => {
            setSeconds(0);
            setMinutes(0);
        }
    }, [startTimer])

    return startTimer ? (
        <Wrapper>
            <Title size='4em'>Searching...</Title>
            <SubTitle size='2em'>{addLeadingZero(minutes)}:{addLeadingZero(seconds)}</SubTitle>
        </Wrapper>
    ) : null;
}

export default Timer;