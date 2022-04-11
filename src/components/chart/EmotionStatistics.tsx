import { css } from '@emotion/react';
import Image from '@components/Image';
import Text from '@components/Text';
import styled from '@emotion/styled';

interface Props {
  className?: string;
}

function EmotionStatistics({ className }: Props) {
  return (
    <div
      className={className}
      css={css`
        display: flex;
      `}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}>
        <Image
          radius={'1.2rem'}
          width={100}
          height={100}
          src={'/icons/profile_mock_img_1.jpeg'}
          alt={'프로필 이미지'}
        />
        <Text>쪼</Text>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          min-height: 19rem;
          margin-left: 2rem;
        `}>
        <Box>
          <Text
            css={css`
              font-size: 2.3rem;
              margin-right: 0.5rem;
            `}>
            이번주 평균감정:{' '}
          </Text>
          <EmotionImage src={'/icons/emotions/love.png'} />
        </Box>
        <Box>
          <EmotionImage src={'/icons/emotions/love.png'} />
          <Text>x 4</Text>
        </Box>
        <Box>
          <EmotionImage src={'/icons/emotions/neutral.png'} />
          <Text>x 4</Text>
        </Box>
        <Box>
          <EmotionImage src={'/icons/emotions/smile.png'} />
          <Text>x 2</Text>
        </Box>
        <Box>
          <EmotionImage src={'/icons/emotions/sad.png'} />
          <Text>x 1</Text>
        </Box>
        <Box>
          <EmotionImage src={'/icons/emotions/angry.png'} />
          <Text>x 1</Text>
        </Box>
        <Text
          css={css`
            margin-top: 0.5rem;
            margin-left: auto;
          `}>
          총 작성일: 12일
        </Text>
      </div>
    </div>
  );
}

const EmotionImage = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

export default EmotionStatistics;
