import { css } from '@emotion/react';
import Image from '@components/Image';
import Text from '@components/Text';
import styled from '@emotion/styled';
import colors from '@constants/colors';
import { Stat } from '@apis/stat';

interface Props {
  className?: string;
  stat?: Stat;
  nickName: string;
  url: string;
}

function EmotionStatistics({ className, stat, nickName, url }: Props) {
  return (
    <div
      className={className}
      css={css`
        display: flex;
        flex-direction: column;
      `}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.5rem;
        `}>
        <Image
          css={css`
            border: 1px solid ${colors.grey200};
          `}
          radius={'1.2rem'}
          width={100}
          height={100}
          src={url}
          alt={'프로필 이미지'}
        />
        <Text>{nickName}</Text>
      </div>
      {stat ? (
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            width: 100%;
          `}>
          <Box>
            <ImageBox>
              <EmotionImage src={'/icons/emotions/LOVE.png'} />
            </ImageBox>
            <Text>{stat?.loveFreq}</Text>
          </Box>
          <Box>
            <ImageBox>
              <EmotionImage src={'/icons/emotions/HAPPY.png'} />
            </ImageBox>
            <Text>{stat?.happyFreq}</Text>
          </Box>
          <Box>
            <ImageBox>
              <EmotionImage src={'/icons/emotions/NEUTRAL.png'} />
            </ImageBox>
            <Text>{stat?.neutralFreq}</Text>
          </Box>
          <Box>
            <ImageBox>
              <EmotionImage src={'/icons/emotions/DEPRESSED.png'} />
            </ImageBox>
            <Text>{stat?.depressedFreq}</Text>
          </Box>
          <Box>
            <ImageBox>
              <EmotionImage src={'/icons/emotions/SAD.png'} />
            </ImageBox>
            <Text>{stat?.sadFreq}</Text>
          </Box>
          <Box>
            <ImageBox>
              <EmotionImage src={'/icons/emotions/ANGRY.png'} />
            </ImageBox>
            <Text>{stat?.angryFreq}</Text>
          </Box>
        </div>
      ) : (
        <div>
          <Text
            css={css`
              width: 100%;
              text-align: center;
              font-size: 2.5rem;
              color: ${colors.content300};
            `}>
            다이어리 작성기록이 존재하지 않습니다!
          </Text>
        </div>
      )}
    </div>
  );
}

const ImageBox = styled.div`
  width: 100%;
  background-color: ${colors.content200};
  border-radius: 5px 5px 0 0;
  text-align: center;
  padding: 5px;
`;

const EmotionImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const Box = styled.div`
  width: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${colors.content200};
  border-radius: 8px;
`;

export default EmotionStatistics;
