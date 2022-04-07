import Container from '@components/Container';
import Text from '@components/Text';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from '@constants/colors';
import { ReactNode } from 'react';
import Image from '@components/Image';

function DiaryLog() {
  return (
    <Container
      css={css`
        margin-bottom: 15px;
      `}>
      <Text
        css={css`
          font-size: 2.6rem;
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
      <Image width={50} height={50} src={'/icons/profile_mock_img_1.jpeg'} alt={'프로필 이미지'} />
      {emotion ? (
        <Image
          css={css`
            position: absolute;
            left: 3.5rem;
            bottom: -0.6rem;
          `}
          width={25}
          height={25}
          src={`/icons/emotions/${emotion}.png`}
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
