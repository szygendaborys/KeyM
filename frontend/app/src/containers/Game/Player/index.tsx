import React from 'react';
import { PlayerBox } from './PlayerBox';
import { PlayerName, PlayerPoints } from './PlayerData';

type Props = {
    socketId:string,
    username:string,
    points:number,
    maxPoints:number
}

export const Player = ({socketId,username,points,maxPoints}:Props) => {

    return (
        <PlayerBox>
            <PlayerName>{username}</PlayerName>
            <PlayerPoints>{Number(points / maxPoints * 100).toFixed(2)} %</PlayerPoints>
        </PlayerBox>
    )
}

export default Player;