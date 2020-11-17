import styled from "styled-components";

type props = {
    width?:string,
};

export const InputComponent = styled.div<props>`
    width:${props => props.width ? props.width : 'auto'};
    height: 100%;
    border:none;
`;

export const PlayerInput = styled(InputComponent)<props>`
    padding-left:2em;
`;

export const PlayerNumber = styled(InputComponent)<props>`
    padding-left:2em;
`;

export const PlayerSubmit = styled(InputComponent)<props>`

`;

export default {
    InputComponent, PlayerInput, PlayerNumber, PlayerSubmit
}