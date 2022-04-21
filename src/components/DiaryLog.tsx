import Container from '@components/Container';
import Text from '@components/Text';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from '@constants/colors';
import Image from '@components/Image';
import { CoupleDiary, Diary, getDiaryById } from '@apis/diary';
import { useQuery } from 'react-query';
import { ToDiaryDateString } from '@utils/date';
import useUser from '@hooks/useUser';
import { useEffect, useState, memo } from 'react';

interface Props {
  coupleDiary: CoupleDiary;
}

function DiaryLog({ coupleDiary }: Props) {
  const user = useUser();
  const diary1 = useQuery<Diary>(['diary', coupleDiary.diary1], () => getDiaryById(coupleDiary.diary1));
  const diary2 = useQuery<Diary>(['diary', coupleDiary.diary2], () => getDiaryById(coupleDiary.diary2!), {
    enabled: coupleDiary.diary2 !== null,
  });
  const [myDiary, setMyDiary] = useState<Diary>();
  const [partnerDiary, setPartnerDiary] = useState<Diary>();
  const [secret, setSecret] = useState(true);

  useEffect(() => {
    if (user.data && diary1.data && diary2.data !== null) {
      if (diary1.data.memberId === user.data.id || diary2.data?.memberId === user.data.id) {
        setSecret(false);
      }
    }
    if (diary1.data && user.data) {
      if (user.data.id === diary1.data.memberId) {
        setMyDiary(diary1.data);
        setPartnerDiary(diary2.data);
      } else {
        setMyDiary(diary2.data);
        setPartnerDiary(diary1.data);
      }
    }
  }, [diary1, diary2, user.data]);
  return (
    <Container
      css={css`
        margin-bottom: 15px;
      `}>
      <Text
        css={css`
          font-size: 2.6rem;
        `}>
        {ToDiaryDateString(coupleDiary.writeTime)}
      </Text>
      <DiaryLogItem diary={partnerDiary} profile={user.data!.coupleInfo!.imageUrl} secret={secret} />
      <DiaryLogItem diary={myDiary} profile={user.data!.imageUrl} />
    </Container>
  );
}

export default memo(DiaryLog);

const Emotion = {
  Love: 'LOVE',
  Angry: 'ANGRY',
  Sad: 'SAD',
  Smile: 'HAPPY',
  Neutral: 'NEUTRAL',
  Depressed: 'DEPRESSED',
} as const;

export type EmotionValue = typeof Emotion[keyof typeof Emotion];

interface DiaryLogItemProps {
  diary?: Diary;
  profile: string;
  secret?: boolean;
}

export const DiaryLogItem = memo(
  ({ diary, profile, secret = false }: DiaryLogItemProps) => {
    return (
      <Item>
        <Image width={50} height={50} src={profile} alt={'프로필 이미지'} />
        {diary && !secret ? (
          <Image
            css={css`
              position: absolute;
              left: 3.5rem;
              bottom: -0.6rem;
            `}
            width={25}
            height={25}
            src={`/icons/emotions/${diary.predEmotion}.png`}
            alt={'감정 아이콘'}
          />
        ) : (
          <Image
            css={css`
              position: absolute;
              left: 4.5rem;
              top: -2rem;
            `}
            width={30}
            height={30}
            src={'/icons/ask_icon.png'}
            alt={'미작성 아이콘'}
            radius={'0'}
          />
        )}
        {diary && secret && (
          <Text
            css={css`
              color: ${colors.content300};
              font-size: 2.3rem;
              margin-left: 3rem;
            `}>
            상대방의 다이어리를 보려면 다이어리를 작성해보세요!
          </Text>
        )}
        {diary && !secret && (
          <Text
            css={css`
              color: ${colors.content300};
              font-size: 2.3rem;
              margin-left: 3rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            `}>
            {diary.content}
          </Text>
        )}
        {!diary && !secret && (
          <Text
            css={css`
              color: ${colors.content200};
              font-size: 2.3rem;
              margin-left: 3rem;
            `}>
            아직 다이어리를 작성하지 않았어요!
          </Text>
        )}
      </Item>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.diary === nextProps.diary &&
      prevProps.profile === nextProps.profile &&
      prevProps.secret === nextProps.secret
    );
  }
);

DiaryLogItem.displayName = 'DiaryLogItem';

const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 45px;
`;
