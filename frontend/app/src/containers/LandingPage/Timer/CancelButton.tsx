import styled from "styled-components";

const CancelButton = styled.button`
    margin-top:2em;
    width:5em;
    height:2em;
    border:none;
    border-radius:10px;
    font-size:2em;
    color: ${props => props.theme.textColours.basic};
    background-color: gray;
    &:hover {
        cursor:pointer;
        filter: brightness(1.2);
    }
`;

export default CancelButton;