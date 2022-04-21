import { NextPage } from 'next';
import Header from '@components/Header';
import { useRouter } from 'next/router';
import Loading from '@components/Loading';
import Container from '@components/Container';
import { css } from '@emotion/react';
import Text from '@components/Text';
import EmotionStatistics from '@components/chart/EmotionStatistics';
import useUser from '@hooks/useUser';
import { useQuery } from 'react-query';
import { getStat, Stat } from '@apis/stat';
import { useState } from 'react';
import styled from '@emotion/styled';
import { ToJavaLocaleDate, ToStatDateString } from '@utils/date';

const MonthEmotion: NextPage = () => {
  const router = useRouter();
  const user = useUser();
  const [date, setDate] = useState(() => {
    const date = new Date();
    date.setDate(1);
    return ToJavaLocaleDate(date);
  });
  const myStat = useQuery<Stat>(['stat', user.data?.id, date], () => getStat(user.data!.id, date), {
    enabled: user.data !== undefined,
  });
  const coupleStat = useQuery<Stat>(
    ['stat', user.data?.coupleInfo?.id, date],
    () => getStat(user.data!.coupleInfo!.id, date),
    {
      enabled: user.data !== undefined,
    }
  );

  const handleClickArrow = (change: number) => {
    const _date = new Date(date);
    _date.setMonth(_date.getMonth() + change);
    setDate(ToJavaLocaleDate(_date));
  };

  return (
    <>
      <Header onClick={() => router.back()}>달별 감정 통계</Header>
      <Container
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        `}>
        <Img src={'/icons/left.png'} alt={'왼쪽'} onClick={() => handleClickArrow(-1)} />
        <Text
          css={css`
            font-size: 2.5rem;
          `}>
          {ToStatDateString(date)}
        </Text>
        <Img src={'/icons/right.png'} alt={'오른쪽'} onClick={() => handleClickArrow(1)} />
      </Container>
      {myStat.isFetched && coupleStat.isFetched ? (
        <>
          <Container
            css={css`
              margin-bottom: 2rem;
            `}>
            <EmotionStatistics nickName={user.data!.nickname} url={user.data!.imageUrl} stat={myStat.data} />
          </Container>
          <Container>
            <EmotionStatistics
              nickName={user.data!.coupleInfo!.nickname}
              url={user.data!.coupleInfo!.imageUrl}
              stat={coupleStat.data}
            />
          </Container>
        </>
      ) : (
        <Container>
          <Loading />
        </Container>
      )}
    </>
  );
};

const Img = styled.img`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

export default MonthEmotion;
