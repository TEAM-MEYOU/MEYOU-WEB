import { NextPage } from 'next';
import Container from '@components/Container';
import Text from '@components/Text';
import Lottie from '@components/Lottie';
import { css } from '@emotion/react';
import IconWithText from '@components/IconWithText';
import { ToJavaLocaleDate } from '@utils/date';
import { useEffect, useState } from 'react';
import { useFetchCoinLog, useFetchDiaryByDate, useFetchUser } from '@hooks/queries';

const today = ToJavaLocaleDate(new Date());
const Complete: NextPage = () => {
  const fetchUser = useFetchUser();
  const fetchDiary = useFetchDiaryByDate(today, fetchUser.data?.id);
  const fetchCoinLog = useFetchCoinLog(today, today, fetchUser.data?.coupleId);
  const [coin, setCoin] = useState<number>();

  useEffect(() => {
    if (fetchCoinLog.data) {
      let count = 0;
      fetchCoinLog.data.map(log => {
        if (log.coinLogType === 'GAIN') {
          count += log.coinQuantity;
        }
      });
      setCoin(count);
    }
  }, [fetchCoinLog.data]);
  return (
    <>
      {fetchDiary.data && (
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
          <IconWithText src={`/icons/emotions/${fetchDiary.data?.userEmotion}.png`}>오늘 나의 감정</IconWithText>
          <IconWithText src={`/icons/emotions/${fetchDiary.data?.predEmotion}.png`}>미유가 추측한 감정</IconWithText>
          <IconWithText src={'/icons/coin.png'}>오늘 얻은 코인 +{coin}</IconWithText>
        </>
      )}
    </>
  );
};

export default Complete;
