import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from '@constants/colors';

function Layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div
        css={css`
          width: 100%;
          max-width: 76.8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: ${colors.background};
        `}>
        {children}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  height: auto;
`;

export default Layout;
