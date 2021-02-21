import React from 'react'
import styled from 'styled-components';

const NavWrapper = styled.div`
    width: 100%;
    height: 50px;
    position: fixed;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    height: 100%;
`;

const NavEl = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: ${({theme}) => theme.color.white};
    cursor: pointer;
`;

const NavShadowEl = styled.div`
    width: calc(100% + 3px);
    height: calc(100% + 3px);
    background-color: rgba(0, 0, 240, 0.2);
    z-index: -1;
    pointer-events: none;
    position: absolute;
    top: 0;
    `;

const NavElWrapper = styled.div`
    position: relative;
    width: 300px;
    transform: translateX(${({right}) => right ? '' : '-'}30px);
    
    transition: transform 300ms ease;
    
    &:hover {
        transform: translateX(${({right}) => right ? '' : '-'}5px);
    }
    `;
const NavShadowLeft = styled(NavShadowEl)`
    clip-path: polygon(0 0, 100% 0, 72% 100%, 0% 100%);
    left: 3px;
`;
const NavLeft = styled(NavEl)`
    clip-path: polygon(0 0, 100% 0, 73% 100%, 0% 100%);
`;

const NavRight = styled(NavEl)`
    clip-path: polygon(0 0, 100% 0, 100% 100%, 27% 100%);
    `;
const NavShadowRight = styled(NavShadowEl)`
    clip-path: polygon(0 0, 100% 0, 100% 100%, 28% 100%);
    right: 3px;
`;

export default function Navbar() {
    return (
        <NavWrapper>
            <Nav>
                <NavElWrapper>
                    <NavShadowLeft />
                    <NavLeft>
                        PernChat
                    </NavLeft>
                </NavElWrapper>
                <NavElWrapper right>
                    <NavShadowRight />
                    <NavRight>
                        Albatrooss
                    </NavRight>
                </NavElWrapper>
            </Nav>
        </NavWrapper>
    )
}
