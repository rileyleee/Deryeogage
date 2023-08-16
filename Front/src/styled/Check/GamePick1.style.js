import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        height: 34vw;
        padding: 1.5vw;
        border: 1px #C5C1BF dashed;
    }
`

export const GamePick1box = styled.button`
    height: 10vw;
    /* margin-right: 0.9vw;
    margin-left: 0.9vw; */
    border-radius: 30px;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    image-rendering: -webkit-optimize-contrast;/* Webkit (non-standard naming) */
    image-rendering: -o-crisp-edges;           /* OS X & Windows Opera (12.02+) */
    image-rendering: pixelated;                /* Chrome */
    image-rendering: optimizeSpeed;            /* Older versions of FF */
    &.box1 {
        background-image: url("/assets/1/run1.gif"), url("/assets/dog_bgi/dog_bgi_1.jpg");
        border: ${props => (props.isclicked ? '2px #FF914D solid' : 'none')};
        background-size: 120% 80%, cover;
    }
    &.box2 {
        background-image: url("/assets/2/run2.gif"), url("/assets/dog_bgi/dog_bgi_2.jpg");
        border: ${props => (props.isclicked ? '2px #FF914D solid' : 'none')};
        background-size: 120% 80%, cover;
    }
    &.box3 {
        background-image: url("/assets/3/run3.gif"), url("/assets/dog_bgi/dog_bgi_3.jpg");
        border: ${props => (props.isclicked ? '2px #FF914D solid' : 'none')};
        background-size: 120% 80%, cover;
    }
    &.box4 {
        background-image: url("/assets/4/run4.gif"), url("/assets/dog_bgi/dog_bgi_4.jpg");
        border: ${props => (props.isclicked ? '2px #FF914D solid' : 'none')};
        background-size: 120% 80%, cover;
    }
    &.box5 {
        background-image: url("/assets/5/run5.gif"), url("/assets/dog_bgi/dog_bgi_5.jpg");
        border: ${props => (props.isclicked ? '2px #FF914D solid' : 'none')};
        background-size: 120% 80%, cover;
    }
`

export const GamePick1Text = styled.p`
    font-size: 1.5vw;
    font-weight: bold;
    color: #4A2511;
    text-align: center;
`

export const GamePick1Input = styled.input`
    height: 2.5vw;
    width: 15vw;
    border-radius: 30px;
    border: 1px #FF914D solid;
    outline: 1px #FF914D solid;
    text-align: center;
`

export const GamePick1Btn = styled.button`
    &.btn {
        font-weight: bold;
        border: none;
        background-color: #FF914D;
        padding: 0.5vw 1vw;
        border-radius: 30px;
        color: white;
    }
`

