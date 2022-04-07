import colors from '@constants/colors';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

function Navigation() {
  const router = useRouter();
  const isRender = router.pathname !== '/';
  return (
    <>
      {isRender ? (
        <NavContainer>
          <Nav>
            <NavLink href={'/home'} />
            <NavLink href={'/diary'} />
            <NavLink href={'/chart'} />
            <NavLink href={'/game'} />
            <NavLink href={'/option'} />
          </Nav>
        </NavContainer>
      ) : (
        <></>
      )}
    </>
  );
}

const NavContainer = styled.nav`
  width: 100%;
`;

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 76.8rem;
  height: 5rem;
  background-color: ${colors.white};
  border-top: 0.1rem solid ${colors.grey200};
`;

interface Props {
  href: string;
}

function NavLink({ href }: Props) {
  const router = useRouter();
  const isCurrentPage = href === '/' + router.asPath.split('/')[1];
  return (
    <LinkContainer onClick={() => router.push(href)}>
      <Icon src={isCurrentPage ? `/icons${href}_active.png` : `/icons${href}.png`} />
    </LinkContainer>
  );
}

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 100%;
  font-size: 1.4rem;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  object-fit: cover;
`;

export default Navigation;
