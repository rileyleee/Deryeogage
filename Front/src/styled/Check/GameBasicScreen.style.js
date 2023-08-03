import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        height: 70vh;
        padding: 1vh;
        background-image: 
        /* url('assets/things/requirement1.png'),
        url(${props => `assets/${props.petType}/idle${props.petType}.gif`}),  */
        url(${props => `assets/home/home${props.background}.jpg`});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
`

export const GameBasicOver = styled.button`
    border:none;
    background-color: transparent;
    font-weight: bold;
    color: white;
`

export const GameModalBody = styled.div`
    background-color: #FFF7E7;
    padding: 1vw;
    border-radius: 20px;
`

export const ModalIMG = styled.img`
    width: 100%;
`

export const DogBtn = styled.button`
    background:transparent;
    border: none;
    height: 12vh;
`

export const DogImg = styled.img`
    width: 15vw;
`

export const Requirement = styled.img`
    width: 7vw;
    height: 12vh;
`