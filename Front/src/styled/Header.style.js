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

