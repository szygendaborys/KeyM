import styled, { StyledComponent } from "styled-components";

type props = {
    size:string
}

const Title = styled.h1<props>`
    font-size: ${props => props.size};
`;

export default Title;