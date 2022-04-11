import { NextPage } from 'next';
import Container from '@components/Container';
import { css } from '@emotion/react';
import Text from '@components/Text';
import colors from '@constants/colors';
import DiaryLog from '@components/DiaryLog';
import ColumnList from '@components/ColumnList';
import Image from '@components/Image';

const Home: NextPage = () => {
  return (
    <>
      <Container
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}>
        <Image
          css={css`
            position: absolute;
            left: 10px;
          `}
          width={60}
          height={60}
          src={'/icons/profile_mock_img_1.jpeg'}
          alt={'프로필이미지'}
        />
        <Image
          css={css`
            position: absolute;
            right: 10px;
          `}
          width={60}
          height={60}
          src={'/icons/profile_mock_img_2.jpeg'}
          alt={'프로필이미지'}
        />
        <Text
          css={css`
            font-size: 3rem;
          `}>
          2020.05.05
        </Text>
        <Text
          css={css`
            font-size: 3rem;
            color: ${colors.content300};
          `}>
          +700 연애중
        </Text>
        <Text
          css={css`
            font-size: 3rem;
            color: ${colors.content100};
            margin-top: 5px;
          `}>
          오늘의 감정을 남겨보세요
        </Text>
      </Container>
      <ColumnList>
        <DiaryLog date={{ year: 2022, month: 4, day: 11 }} />
        <DiaryLog date={{ year: 2022, month: 4, day: 10 }} />
        <DiaryLog date={{ year: 2022, month: 4, day: 9 }} />
      </ColumnList>
    </>
  );
};

export default Home;
