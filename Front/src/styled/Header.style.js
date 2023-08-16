import styled from "styled-components";

export const HeaderWrapper = styled.nav`
    &.navbar-expand-lg {
        background-color: #FFE7BA;
        border-radius: 0px 0px 30px 30px;
    }
`;

export const Navlink = styled.a`
    color: ${props => (props.active ? '#FF914D' : 'inherit')};
    font-weight: ${props => (props.active ? 'bold' : 'normal')};
`;

export const ButtonWrapper = styled.button`
    background-color: #FFE7BA;
    border: none;
`; 

const NavigationWrapper = styled.div`
  a {
    text-decoration: none;
    color: #4A2511;
    padding: 8px 16px;
    transition: background-color .3s;
  }

  a.active {
    background-color: #FF914D;
    color: white;
    border-radius: 30px;
  }

  a:hover:not(.active) {
    background-color: #ddd;
  }
`;

export const DogImg = styled.img`
  
`