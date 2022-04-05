import { GetServerSideProps, NextPage } from 'next';
import Container from '@components/Container';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Text from '@components/Text';
import colors from '@constants/colors';
import DiaryLog from '@components/DiaryLog';
import ColumnList from '@components/ColumnList';

const Home: NextPage = () => {
  return (
    <>
      <Container
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 10px;
        `}>
        <LeftProfileImage src={'/icons/profile_mock_img_1.jpeg'} alt={'프로필 이미지'} />
        <RightProfileImage src={'/icons/profile_mock_img_2.jpeg'} alt={'프로필 이미지'} />
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
        <DiaryLog />
        <DiaryLog />
        <DiaryLog />
      </ColumnList>
    </>
  );
};

const LeftProfileImage = styled.img`
  position: absolute;
  left: 10px;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  object-fit: cover;
`;

const RightProfileImage = styled.img`
  position: absolute;
  right: 10px;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Home;
