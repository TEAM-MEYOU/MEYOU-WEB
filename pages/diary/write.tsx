import { NextPage } from 'next';
import Container from '@components/Container';
import Text from '@components/Text';
import Image from '@components/Image';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import colors from '@constants/colors';
import Button from '@components/Button';
import { ComponentProps, useState } from 'react';
import IconWithText from '@components/IconWithText';
import useUser from '@hooks/useUser';
import { WriteDiary, writeDiary } from '@apis/diary';
import { EmotionValue } from '@components/DiaryLog';
import { useRouter } from 'next/router';

const Write: NextPage = () => {
  const user = useUser();
  const [emotion, setEmotion] = useState<EmotionValue>('LOVE');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleClickEmotion = (emotion: EmotionValue) => {
    setEmotion(emotion);
  };
  const handleClickWrite = async () => {
    try {
      const diary: WriteDiary = {
        memberId: user.data!.id,
        content: content,
        userEmotion: emotion,
        predEmotion: emotion,
      };
      await writeDiary(diary);
      router.push('/diary/complete');
    } catch (e) {
      console.log(e);
    }
  };

  const date = new Date();
  return (
    <>
      <Container
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
        `}>
        <Text
          css={css`
            font-size: 2.6rem;
          `}>
          쪼의 {date.getMonth() + 1}월 {date.getDate()}일 다이어리
        </Text>
        <TextArea
          placeholder={'오늘의 다이어리를 작성해 보세요'}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <IconWithText
          css={css`
            width: auto;
            margin-left: auto;
          `}
          src={'/icons/coin.png'}>
          다이어리 작성시 코인 + 1
        </IconWithText>
      </Container>

      <Container
        css={css`
          display: flex;
          flex-direction: column;
          margin-top: 15px;
        `}>
        <Text
          css={css`
            font-size: 2.6rem;
          `}>
          오늘 나의감정
        </Text>
        <Text
          css={css`
            font-size: 1.6rem;
            color: ${colors.content200};
            margin-bottom: 10px;
          `}>
          더 좋은 서비스를위해 MeYou에 감정이 제공됩니다.
        </Text>
        <div>
          <EmotionImage emotion={'LOVE'} selectedEmotion={emotion} onClick={() => handleClickEmotion('LOVE')} />
          <EmotionImage emotion={'HAPPY'} selectedEmotion={emotion} onClick={() => handleClickEmotion('HAPPY')} />
          <EmotionImage emotion={'NEUTRAL'} selectedEmotion={emotion} onClick={() => handleClickEmotion('NEUTRAL')} />
          <EmotionImage emotion={'SAD'} selectedEmotion={emotion} onClick={() => handleClickEmotion('SAD')} />
          <EmotionImage emotion={'ANGRY'} selectedEmotion={emotion} onClick={() => handleClickEmotion('ANGRY')} />
        </div>
        <Text
          css={css`
            font-size: 2.6rem;
            margin-top: 40px;
            margin-bottom: 10px;
          `}>
          MeYou가 추측한 감정
        </Text>
        <Button
          css={css`
            width: 15rem;
          `}
          fullWidth={false}>
          분석하기
        </Button>
      </Container>

      <Button
        onClick={handleClickWrite}
        css={css`
          margin-top: 15px;
          width: 90%;
        `}>
        완료
      </Button>
    </>
  );
};

const TextArea = styled.textarea`
  flex: 1;
  padding: 10px;
  margin-top: 10px;
  font-size: 2rem;
  resize: none;
  border: 1px solid ${colors.black};
  outline-color: ${colors.content300};
  border-radius: 0.32rem;
`;

interface Props {
  emotion: EmotionValue;
  selectedEmotion?: EmotionValue;
}

const EmotionImage = ({ emotion, selectedEmotion = emotion, onClick }: Props & ComponentProps<'span'>) => {
  return (
    <Image
      css={css`
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 1.2rem;
        background-color: ${emotion === selectedEmotion ? colors.content200 : colors.background};
        padding: 10px;
        cursor: pointer;
        margin-right: 20px;
      `}
      onClick={onClick}
      width={30}
      height={30}
      src={`/icons/emotions/${emotion}.png`}
      alt={'추측 감정'}
    />
  );
};

export default Write;
