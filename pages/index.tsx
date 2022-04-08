import type { NextPage } from 'next';
import styled from '@emotion/styled';
import Text from '@components/Text';
import { css } from '@emotion/react';
import colors from '@constants/colors';
import Script from 'next/script';
import { useRouter } from 'next/router';

interface login {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

interface kakaoInfo {
  connected_at: string;
  id: number;
  kakao_account: {
    email: string;
    email_needs_agreement: boolean;
    has_email: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
  };
}

const Index: NextPage = () => {
  const router = useRouter();

  const handleClickKaKaoLogin = () => {
    const kakao = (window as any).Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);

      kakao.Auth.login({
        scope: 'account_email',
        success: function (response: login) {
          kakao.Auth.setAccessToken(response.access_token);
          kakao.API.request({
            url: '/v2/user/me',
            data: {
              property_keys: ['kakao_account.email'],
            },
            success: async function (response: kakaoInfo) {
              const id = response.id;
              const email = response.kakao_account.email;
              window.localStorage.setItem('id', id.toString());
              window.localStorage.setItem('email', email);
              router.push('/getting-started');
            },
            fail: function (error: Error) {
              console.log(error);
            },
          });
        },
        fail: function (error: Error) {
          console.log(error);
        },
      });
    }
  };
  return (
    <>
      <Script src={'https://developers.kakao.com/sdk/js/kakao.js'} strategy={'beforeInteractive'} />

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
      <img
        onClick={handleClickKaKaoLogin}
        src={'icons/kakao_login_large_narrow.png'}
        css={css`
          width: 180px;
          background-size: cover;
          margin-top: 200px;
          border-radius: 12px;
          cursor: pointer;
        `}
        alt={'카카오 로그인 이미지'}
      />
    </>
  );
};

const Image = styled.img`
  width: 80px;
  height: 80px;
  margin-top: 150px;
`;

export default Index;
