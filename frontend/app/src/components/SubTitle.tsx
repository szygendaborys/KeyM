import styled, { StyledComponent } from "styled-components";

type props = {
    size:string
}

const SubTitle = styled.h3<props>`
    font-size: ${props => props.size};
`;

export default SubTitle;