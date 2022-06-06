import { NextPage } from 'next';
import Header from '@components/Header';
import { useRouter } from 'next/router';
import Loading from '@components/Loading';
import Container from '@components/Container';
import { ToJavaLocaleDate } from '@utils/date';
import { useEffect, useState } from 'react';
import Versus from '@components/chart/Versus';
import BarGraph from '@components/chart/BarGraph';
import colors from '@constants/colors';
import { css } from '@emotion/react';
import Text from '@components/Text';
import { useFetchStat, useFetchUser } from '@hooks/queries';

const today = new Date();
today.setDate(1);
const date = ToJavaLocaleDate(today);
const Long: NextPage = () => {
  const router = useRouter();
  const fetchUser = useFetchUser();
  const fetchMemberStat = useFetchStat(date, fetchUser.data?.id);
  const fetchCoupleStat = useFetchStat(date, fetchUser.data?.coupleInfo?.id);
  const [win, setWin] = useState(0);

  useEffect(() => {
    if (fetchMemberStat.isFetched && fetchCoupleStat.isFetched) {
      const user = fetchMemberStat.data?.diaryLength
        ? fetchMemberStat.data.diaryLength / fetchMemberStat.data.diaryFreq
        : 0;
      const couple = fetchCoupleStat.data?.diaryLength
        ? fetchCoupleStat.data.diaryLength / fetchCoupleStat.data.diaryFreq
        : 0;
      if (user > couple) setWin(1);
      else if (user < couple) setWin(2);
      else setWin(0);
    }
  }, [fetchMemberStat, fetchCoupleStat]);
  return (
    <>
      <Header onClick={() => router.back()}>누가 더 다이어리를 길게 썼을까요?</Header>
      {fetchUser.isFetched && fetchMemberStat.isFetched && fetchCoupleStat.isFetched ? (
        <Container>
          <Versus user={fetchUser.data!} win={win} />
          <Text
            css={css`
              padding-top: 1rem;
              font-size: 2.5rem;
              color: ${colors.content200};
            `}>
            한달간 다이어리 평균 길이
          </Text>
          <BarGraph
            url={fetchUser.data!.imageUrl}
            ratio={fetchMemberStat.data!.diaryLength / fetchMemberStat.data!.diaryFreq}
            color={colors.red300}
          />
          <BarGraph
            url={fetchUser.data!.coupleInfo!.imageUrl}
            ratio={fetchCoupleStat.data!.diaryLength / fetchCoupleStat.data!.diaryFreq}
            color={colors.blue300}
          />
        </Container>
      ) : (
        <Container>
          <Loading />
        </Container>
      )}
    </>
  );
};

export default Long;
