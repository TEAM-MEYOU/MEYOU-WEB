import { NextPage } from 'next';
import Header from '@components/Header';
import { useRouter } from 'next/router';
import Container from '@components/Container';
import Text from '@components/Text';
import { css } from '@emotion/react';
import EmotionStatistics from '@components/chart/EmotionStatistics';

const WeekEmotion: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Header onClick={() => router.back()}>이번주 감정 통계</Header>
      <Container
        css={css`
          margin-bottom: 1.5rem;
        `}>
        <Text
          css={css`
            font-size: 2.5rem;
          `}>
          4월 첫째주
        </Text>
      </Container>
      <Container
        css={css`
          margin-bottom: 1.5rem;
        `}>
        <EmotionStatistics />
      </Container>
      <Container>
        <EmotionStatistics />
      </Container>
    </>
  );
};

export default WeekEmotion;
