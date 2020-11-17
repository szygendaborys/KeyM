import styled, { StyledComponent } from "styled-components";

type props = {
    justifyContent?:string,
    alignItems?:string,
    height?:string,
    width?:string,
    horizontal?:boolean,
    mb?:string
}

const Wrapper = styled.div<props>`
    display:flex;
    height:${props => props.height ? `${props.height}` : 'auto'};
    width:${props => props.width ? `${props.width}` : 'auto'};;
    justify-content:${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items:${props => props.alignItems ? props.alignItems : 'center'};
    flex-direction:${props => props.horizontal ? `row` : `column`};
    flex-wrap: wrap;
    margin-bottom: ${props => props.mb ? props.mb : '0'};
`;

export default Wrapper;