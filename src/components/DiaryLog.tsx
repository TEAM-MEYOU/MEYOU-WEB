import Container from '@components/Container';
import Text from '@components/Text';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from '@constants/colors';
import { ReactNode } from 'react';

function DiaryLog() {
  return (
    <Container
      css={css`
        margin-bottom: 15px;
      `}>
      <Text
        css={css`
          font-size: 2.5rem;
        `}>
        오늘
      </Text>
      <DiaryLogItem />
      <DiaryLogItem emotion={'love'}>
        오늘 너무 재밋있었어요! 다음주에는 꼭 우리가 저번에 말했던거 같이해요! 사랑해용
      </DiaryLogItem>
    </Container>
  );
}

export default DiaryLog;

export const Emotion = {
  LOVE: 'love',
  ANGRY: 'angry',
  SAD: 'sad',
  SMILE: 'smile',
} as const;

export type EmotionValue = typeof Emotion[keyof typeof Emotion];

interface Props {
  emotion?: EmotionValue;
  children?: ReactNode;
}

function DiaryLogItem({ emotion, children }: Props) {
  return (
    <Item>
      <ProfileImage src={'/icons/profile_mock_img_2.jpeg'} />
      {emotion ? (
        <EmotionImage src={`/icons/emotions/${emotion}.png`} />
      ) : (
        <NoEmotionImage src={'/icons/ask_icon.png'} />
      )}

      {children ? (
        <Text
          css={css`
            color: ${colors.content300};
            font-size: 2.3rem;
            margin-left: 3rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          `}>
          {children}
        </Text>
      ) : (
        <Text
          css={css`
            color: ${colors.content200};
            font-size: 2.3rem;
            margin-left: 3rem;
          `}>
          상대방이 아직 다이어리를 작성하지 않았어요!
        </Text>
      )}
    </Item>
  );
}

const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 45px;
`;

const ProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
`;

const EmotionImage = styled.img`
  position: absolute;
  left: 3.5rem;
  bottom: -0.6rem;
  width: 2.5rem;
  height: 2.5rem;
`;

const NoEmotionImage = styled.img`
  position: absolute;
  left: 4.5rem;
  top: -2rem;
  width: 3rem;
  height: 3rem;
`;
