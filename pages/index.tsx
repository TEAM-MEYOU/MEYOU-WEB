import type { NextPage } from 'next';
import styled from '@emotion/styled';
import Text from '@components/Text';
import { css } from '@emotion/react';
import colors from '@constants/colors';
import Button from '@components/Button';
import { useRouter } from 'next/router';

const Index: NextPage = () => {
  const router = useRouter();

  const handleClickKaKaoLogin = () => {
    router.push('/home');
    /*
    todo
    kakao oauth login logic
     */
  };
  return (
    <>
      <Image src={'/icons/app_icon.png'} alt={'로고'} />
      <Text
        css={css`
          color: ${colors.title};
          font-size: 26px;
        `}>
        MeYou
      </Text>
      <Text
        css={css`
          font-size: 30px;
          padding-top: 20px;
        `}>
        둘이서 꾸며가는 우리들만의 이야기
      </Text>
      <Button
        onClick={handleClickKaKaoLogin}
        fullWidth={false}
        color={colors.black}
        css={css`
          background-color: ${colors.yellow500};
          margin-top: 200px;
        `}>
        카카오계정으로 시작하기
      </Button>
    </>
  );
};

const Image = styled.img`
  width: 80px;
  height: 80px;
  margin-top: 150px;
`;

export default Index;
