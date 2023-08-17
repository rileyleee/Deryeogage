import styled from "styled-components";

export const BoardGroupWrap = styled.div`
    background-color: white;
    height: 28vw;
    border: 1px solid #FF914D;
    border-radius: 30px;
    margin: 0 2vw;
`

export const BoardBtn = styled.button`
    border: none;
    background-color: transparent;
    color: ${props => props.active ? '#FF914D' : 'black'};
    font-weight: ${props => props.active ? 'bold' : ''};
`

export const Board = styled.div`
    margin: 1vw 0;
`
