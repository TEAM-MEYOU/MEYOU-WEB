import { NextPage } from 'next';
import Container from '@components/Container';
import Text from '@components/Text';
import { css } from '@emotion/react';

const Game: NextPage = () => {
  return (
    <>
      <Container>
        <Text
          css={css`
            font-size: 2.5rem;
          `}>
          해당 서비스는 웹에서는 제공되지 않는 기능입니다.
        </Text>
      </Container>
    </>
  );
};

export default Game;
