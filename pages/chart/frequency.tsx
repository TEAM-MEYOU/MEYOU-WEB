import { NextPage } from 'next';
import Header from '@components/Header';
import { useRouter } from 'next/router';
import Container from '@components/Container';
import Versus from '@components/chart/Versus';
import BarGraph from '@components/chart/BarGraph';
import colors from '@constants/colors';
import Text from '@components/Text';
import { css } from '@emotion/react';

const Frequency: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Header onClick={() => router.back()}>누가 더 다이어를 자주 썼을까요?</Header>
      <Container>
        <Versus />
        <BarGraph ratio={10} color={colors.red300} />
        <BarGraph ratio={30} color={colors.blue300} />
      </Container>
      <Container
        css={css`
          margin-top: 1rem;
        `}>
        <Text
          css={css`
            font-size: 2.5rem;
          `}>
          미유유저 평균
        </Text>
        <BarGraph ratio={12} color={colors.yellow300} />
      </Container>
    </>
  );
};

export default Frequency;
