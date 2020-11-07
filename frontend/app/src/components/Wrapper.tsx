import styled, { StyledComponent } from "styled-components";

type props = {
    justifyContent?:string,
    alignItems?:string,
    height?:number,
    width?:number,
    horizontal?:boolean
}

const Wrapper = styled.div<props>`
    display:flex;
    height:${props => props.height ? `${props.height}%` : '100%'};
    width:${props => props.width ? `${props.width}%` : '100%'};;
    justify-content:${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items:${props => props.alignItems ? props.alignItems : 'center'};
    flex-direction:${props => props.horizontal ? `row` : `column`};
    flex-wrap: wrap;
`;

export default Wrapper;