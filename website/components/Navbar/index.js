import styled from "styled-components";
import Image from 'next/image';
import NavSection from "components/NavSection";
import StyledLink from "components/StyledLink";

const Wrapper = styled.div`
    height:100vh;
`

const TopPart = styled.div`
    padding: 1.5rem;
`

const BottomPart = styled.div`
    padding-top: 6rem;
    align-self: flex-end;
`

const Navigation = styled.div`
    padding: 12px 0;
`

const HorizontalLine = styled.div`
    background:var(--Neutral200);
    width:1.5rem;
    height: 1px;
    margin: 0 0 0 1.5rem;
`
const Icon = styled.span`
    padding: 0px 10px;
`

const Navbar = () => {
    return(
        <Wrapper>
            <TopPart>
                <Image src='/logo.svg' width={161} height={25} />
            </TopPart>
            <HorizontalLine/>
            <Navigation>
                <NavSection title="getting started" pages={[
                    {
                        name:"Principles",
                        link:"/"
                    },
                    {
                        name:"Accessibility",
                        link:"#"
                    }
                ]}/>
            </Navigation>
            <BottomPart>
                <StyledLink href="https://github.com" target="_blank" padding={8}>
                    <Icon>
                        <Image src="/github.svg" height={16} width={16} /> 
                    </Icon>
                    Contribute on Github
                </StyledLink>
                <StyledLink href="#" target="_blank" padding={8}>
                    <Icon>
                        <Image src="/discourse.svg" height={16} width={16} /> 
                    </Icon>
                    DS! Forum 
                </StyledLink>
            </BottomPart>
        </Wrapper>
    )
}

export default Navbar;