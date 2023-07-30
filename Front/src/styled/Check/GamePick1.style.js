import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        height: 70vh;
        border: 1px #C5C1BF dashed;
        padding: 3vh;
        /* height: 70vh; */
        /* background-color: beige; */
        /* padding-bottom: 35%; */
    }
`

export const GamePick1box = styled.button`
    height: 20vh;
    /* margin-right: 0.9vw;
    margin-left: 0.9vw; */
    border-radius: 30px;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    &.box1 {
        background-image: url("assets/rundogs/shiba1.gif"), url("assets/dog_bgi/dog_bgi_1.jpg");
        border: ${props => (props.isclicked ? '2px #FF914D solid' : 'none')};
        background-size: 70% 50%, cover;
    }
    &.box2 {
        background-image: url("assets/rundogs/walk.gif"), url("assets/dog_bgi/dog_bgi_2.jpg");
        border: ${props => (props.isclicked ? '2px #FF914D solid' : 'none')};
        background-size: 120% 80%, cover;
    }
    &.box3 {
        background-image: url("assets/rundogs/run.gif"), url("assets/dog_bgi/dog_bgi_3.jpg");
        border: ${props => (props.isclicked ? '2px #FF914D solid' : 'none')};
        background-size: 120% 80%, cover;
    }
    &.box4 {
        background-image: url("assets/rundogs/corgi.gif"), url("assets/dog_bgi/dog_bgi_4.jpg");
        border: ${props => (props.isclicked ? '2px #FF914D solid' : 'none')};
        background-size: 120% 80%, cover;
    }
    &.box5 {
        background-image: url("assets/rundogs/shiba2.gif"), url("assets/dog_bgi/dog_bgi_5.jpg");
        border: ${props => (props.isclicked ? '2px #FF914D solid' : 'none')};
        background-size: 70% 50%, cover;
    }
`

export const GamePick1Text = styled.p`
    font-size: 3vh;
    font-weight: bold;
    color: #4A2511;
    text-align: center;
`

export const GamePick1Input = styled.input`
    height: 5vh;
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

