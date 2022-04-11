import Lottie from '@components/Lottie';
import { css } from '@emotion/react';
import Text from '@components/Text';

const Loading = () => {
  return (
    <>
      <Lottie
        css={css`
          width: 100%;
          height: 30rem;
          margin-bottom: 10px;
        `}
        src={'https://assets4.lottiefiles.com/packages/lf20_x62chJ.json'}
      />
      <Text
        css={css`
          width: 100%;
          text-align: center;
          font-size: 3rem;
        `}>
        {`분석중.... \n 잠시만 기다려 주세요!`}
      </Text>
    </>
  );
};

export default Loading;
