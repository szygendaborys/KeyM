import styled from "styled-components";

type props = {
    side: 'left' | 'right'
}

export const PlayerWrapper = styled.div<props>`
    margin:3em;
    position:absolute;
    display:flex;
    flex-direction: column;
    left:${props => props.side === 'right' ? 'auto' : 0};
    right:${props => props.side === 'left' ? 'auto' : 0};
    top:0;
    bottom:0;
    width:200px;
    background-color:gray;
`;

export default PlayerWrapper;