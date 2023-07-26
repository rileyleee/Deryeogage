import styled from "styled-components";

export const GameStartfirst = styled.div`
    &.first {
        margin-top: 1%;
        margin-bottom: 1%;
        border: 1px #FF914D solid;
        border-radius: 30px;
        background-color: white;
        height: 38vw;
    }
`

export const GameStartsecond = styled.div`
    &.second {
        border: 1px #C5C1BF dashed;
        margin-top: 4%;
        height: 32vw;
        /* background-color: beige; */
        /* padding-bottom: 35%; */
    }
`

export const GamePick1box = styled.button`
    height: 12vw;
    margin-right: 0.9vw;
    margin-left: 0.9vw;
    border-radius: 30px;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    &.box1 {
        background-image: url("assets/rundogs/shiba1.gif"), url("assets/dog_bgi/dog_bgi_1.jpg");
        border: ${props => (props.isClicked ? '2px #FF914D solid' : 'none')};
        background-size: 70% 50%, cover;
    }
    &.box2 {
        background-image: url("assets/rundogs/walk.gif"), url("assets/dog_bgi/dog_bgi_2.jpg");
        border: ${props => (props.isClicked ? '2px #FF914D solid' : 'none')};
        background-size: 120% 80%, cover;
    }
    &.box3 {
        background-image: url("assets/rundogs/run.gif"), url("assets/dog_bgi/dog_bgi_3.jpg");
        border: ${props => (props.isClicked ? '2px #FF914D solid' : 'none')};
        background-size: 120% 80%, cover;
    }
    &.box4 {
        background-image: url("assets/rundogs/corgi.gif"), url("assets/dog_bgi/dog_bgi_4.jpg");
        border: ${props => (props.isClicked ? '2px #FF914D solid' : 'none')};
        background-size: 120% 80%, cover;
    }
    &.box5 {
        background-image: url("assets/rundogs/shiba2.gif"), url("assets/dog_bgi/dog_bgi_5.jpg");
        border: ${props => (props.isClicked ? '2px #FF914D solid' : 'none')};
        background-size: 70% 50%, cover;
    }
`

export const GamePick1Text = styled.p`
    font-size: 2vw;
    font-weight: bold;
    color: #4A2511;
    text-align: center;
    margin-top: 2vw;
    margin-bottom: 2vw;
`

export const GamePick1Input = styled.input`
    height: 3vw;
    width: 15vw;
    border-radius: 30px;
    margin-top: 4vw;
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
        margin-top: 1vw;
    }
`

