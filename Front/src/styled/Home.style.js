import styled from 'styled-components';

export const MainContainer = styled.div`
    max-width: 100vw;
    height: 90vh;
`

export const HomeContainer = styled.div`
  width: 100vw;
  height: 90vh;
  padding: 3vw;
  display: flex; /* Use flexbox to arrange the content */
  flex-direction: column; /* Arrange items vertically */
  position: relative; /* Set relative positioning for absolute elements */
`;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
  font-weight: bold;
`;

export const Main = styled.div`
  padding: 3vh 0;
  font-size: 3vw;
`;

export const Text = styled.div`
  padding-bottom: 1vh;
  font-size: 1.5vw;;
`;

export const RowWrap = styled.div`
  height: 60vh;
`

export const Btn =styled.button`
  background-color: transparent;
  border: none;
`
export const pTag = styled.p`
  height: 2vw;
  font-size: 2vw;
  margin: 1vw;
  text-align: center;
`

export const Name = styled.p`
  font-size: 1vw;
  &.purple {
    color: #9A5BFF;
  }
  &.green {
    color: #6B9C5A;
  }
  &.blue {
    color: #738BDD;
  }
`

export const Banner = styled.div`
  background-color: white;
`