import { NextPage } from 'next';
import Container from '@components/Container';
import Text from '@components/Text';
import Lottie from '@components/Lottie';
import { css } from '@emotion/react';
import IconWithText from '@components/IconWithText';
import useUser from '@hooks/useUser';
import { useQuery } from 'react-query';
import { Diary, getDiaryByDate } from '@apis/diary';
import { ToJavaLocaleDate } from '@utils/date';

const Complete: NextPage = () => {
  const user = useUser();
  const todayDiary = useQuery<Diary>('today', () => getDiaryByDate(user.data!.id, ToJavaLocaleDate(new Date())), {
    enabled: user.data !== undefined,
    retry: 0,
  });
  return (
    <>
      {todayDiary.data && (
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
          <IconWithText src={`/icons/emotions/${todayDiary.data?.userEmotion}.png`}>오늘 나의 감정</IconWithText>
          <IconWithText src={`/icons/emotions/${todayDiary.data?.predEmotion}.png`}>미유가 추측한 감정</IconWithText>
          <IconWithText src={'/icons/coin.png'}>오늘 얻은 코인 +1</IconWithText>
        </>
      )}
    </>
  );
};

export default Complete;
