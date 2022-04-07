import { NextPage } from 'next';
import Container from '@components/Container';
import Text from '@components/Text';
import Lottie from '@components/Lottie';
import { css } from '@emotion/react';
import IconWithText from '@components/IconWithText';

const Complete: NextPage = () => {
  return (
    <>
      <Container
        css={css`
          display: flex;
          height: 500px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}>
        <Lottie
          css={css`
            width: 100%;
            height: 30rem;
          `}
          src={'/animations/check.json'}
          loop={false}
        />
        <Text
          css={css`
            font-size: 2.6rem;
          `}>
          오늘은 이미 다이어리를 작성하셨네요 !
        </Text>
      </Container>
      <IconWithText src={'/icons/emotions/love.png'}>오늘 나의 감정</IconWithText>
      <IconWithText src={'/icons/emotions/love.png'}>오늘 상대방의 감정</IconWithText>
      <IconWithText src={'/icons/coin.png'}>오늘 얻은 코인 +1</IconWithText>
    </>
  );
};

export default Complete;
