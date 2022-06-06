import Container from '@components/Container';
import Text from '@components/Text';
import { css } from '@emotion/react';
import colors from '@constants/colors';
import Image from '@components/Image';
import { CoupleDiary, Diary } from '@apis/diary';
import { ToDiaryDateString } from '@utils/date';
import { useEffect, useState, memo } from 'react';
import styled from '@emotion/styled';
import { useFetchDiaryById, useFetchUser } from '@hooks/queries';

interface Props {
  coupleDiary: CoupleDiary;
}

function DiaryLog({ coupleDiary }: Props) {
  const fetchUser = useFetchUser();
  const fetchDiary1 = useFetchDiaryById(coupleDiary.diary1);
  const fetchDiary2 = useFetchDiaryById(coupleDiary.diary2);
  const [myDiary, setMyDiary] = useState<Diary>();
  const [partnerDiary, setPartnerDiary] = useState<Diary>();
  const [secret, setSecret] = useState(true);
  const [viewMore, setViewMore] = useState(false);

  const handleClickDiary = () => {
    setViewMore(true);
  };

  useEffect(() => {
    setSecret(true);
    setViewMore(false);
  }, [coupleDiary]);

  useEffect(() => {
    if (fetchUser.data && fetchDiary1.data && fetchDiary2.data !== null) {
      if (fetchDiary1.data.memberId === fetchUser.data.id || fetchDiary2.data?.memberId === fetchUser.data.id) {
        setSecret(false);
      }
    }
    if (fetchDiary1.data && fetchUser.data) {
      if (fetchUser.data.id === fetchDiary1.data.memberId) {
        setMyDiary(fetchDiary1.data);
        setPartnerDiary(fetchDiary2.data);
      } else {
        setMyDiary(fetchDiary2.data);
        setPartnerDiary(fetchDiary1.data);
      }
    }
  }, [fetchDiary1, fetchDiary2, fetchUser.data]);
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
      <DiaryLogItem diary={myDiary} profile={fetchUser.data!.imageUrl} viewMore={viewMore} />
      <DiaryLogItem
        diary={partnerDiary}
        profile={fetchUser.data!.coupleInfo!.imageUrl}
        secret={secret}
        viewMore={viewMore}
      />
      {viewMore || <TextButton onClick={handleClickDiary}>자세히 보기</TextButton>}
    </Container>
  );
}

const TextButton = styled.button`
  cursor: pointer;
  font-size: 20px;
  float: right;
`;

export default memo(DiaryLog, (prevProps, nextProps) => {
  return (
    prevProps.coupleDiary.writeTime === nextProps.coupleDiary.writeTime &&
    prevProps.coupleDiary.id === nextProps.coupleDiary.id
  );
});

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
  viewMore: boolean;
}

export const DiaryLogItem = memo(
  ({ diary, profile, viewMore, secret = false }: DiaryLogItemProps) => {
    return (
      <div
        css={css`
          display: flex;
          align-items: ${viewMore ? 'initial' : 'center'};
          margin-top: 45px;
        `}>
        <div
          css={css`
            position: relative;
            height: 50px;
          `}>
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
        </div>
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
              color: ${colors.black};
              font-size: 2.3rem;
              margin-left: 3rem;
              overflow: ${viewMore || 'hidden'};
              white-space: ${viewMore || 'nowrap'};
              text-overflow: ${viewMore || 'ellipsis'};
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
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.diary?.writeTime === nextProps.diary?.writeTime &&
      prevProps.profile === nextProps.profile &&
      prevProps.secret === nextProps.secret &&
      prevProps.viewMore === nextProps.viewMore
    );
  }
);

DiaryLogItem.displayName = 'DiaryLogItem';
