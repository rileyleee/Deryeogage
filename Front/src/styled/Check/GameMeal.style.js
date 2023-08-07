import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        height: 70vh;
        padding: 1vh;
        background-image: url("assets/requirement/yamyam.png"), url(${props => `assets/${props.petType}/sniff${props.petType}.gif`}),url("assets/requirement/meal.gif");
        background-repeat: no-repeat;
        background-position: 40% 45%,13% 53%, center;
        background-size: 20% 20%, 35% 35%, cover;
    }
`

export const GameBasicButton = styled.button`
    border: 1px #6458F5 solid;
    background-color: white;
    border-radius: 30px;
    padding: 3px 1vw;
    margin-bottom: 1vh;
    font-weight: bold;
    text-align: center
`