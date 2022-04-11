import { NextPage } from 'next';
import IconWithText from '@components/IconWithText';
import Button from '@components/Button';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

type ChartPath = 'diary' | 'week-emotion' | 'month-emotion' | 'frequency' | 'long';
const Chart: NextPage = () => {
  const router = useRouter();
  const route = (path: ChartPath) => {
    router.push(`/chart/${path}`);
  };
  return (
    <>
      <Button iconButton={true} onClick={() => route('diary')}>
        <IconWithText
          css={css`
            cursor: pointer;
          `}
          src={'/icons/emotions/love.png'}>
          다이어리 기록보기
        </IconWithText>
      </Button>
      <Button iconButton={true} onClick={() => route('week-emotion')}>
        <IconWithText
          css={css`
            cursor: pointer;
          `}
          src={'/icons/pie-chart.png'}>
          이번주 감정 통계 보러가기
        </IconWithText>
      </Button>
      <Button iconButton={true} onClick={() => route('month-emotion')}>
        <IconWithText
          css={css`
            cursor: pointer;
          `}
          src={'/icons/pie-chart.png'}>
          이번달 감정 통계 보러가기
        </IconWithText>
      </Button>
      <Button iconButton={true} onClick={() => route('frequency')}>
        <IconWithText
          css={css`
            cursor: pointer;
          `}
          src={'/icons/thinking.png'}>
          이번달 누가더 다이어리를 많이 썼을까요?
        </IconWithText>
      </Button>
      <Button iconButton={true} onClick={() => route('long')}>
        <IconWithText
          css={css`
            cursor: pointer;
          `}
          src={'/icons/thinking.png'}>
          누가 더 다이어리를 길게 썼을까요?
        </IconWithText>
      </Button>
    </>
  );
};

export default Chart;
