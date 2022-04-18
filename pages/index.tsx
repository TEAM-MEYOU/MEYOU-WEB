import type { NextPage } from 'next';
import styled from '@emotion/styled';
import Text from '@components/Text';
import { css } from '@emotion/react';
import colors from '@constants/colors';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { checkMember, getMember, Member, registerMember, RegisterMember } from '@apis/member';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

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
  id: string;
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
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const onLoginSuccess = (member: Member) => {
    window.localStorage.setItem('kakao', member.kakao);
    queryClient.setQueryData('user', member);
    if (!member.coupleId) {
      router.push('/getting-started');
    } else {
      router.push('/home');
    }
  };

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
              setLoading(true);
              const uniqueCode = response.id;
              const email = response.kakao_account.email;
              try {
                const member = await checkMember(email);
                onLoginSuccess(member);
              } catch (e) {
                const regMember: RegisterMember = {
                  kakao: email,
                  uniqueCode: uniqueCode,
                };
                try {
                  const id = await registerMember(regMember);
                  const member = await getMember(id);
                  onLoginSuccess(member);
                } catch (e) {
                  console.log(e);
                }
              }
            },
            fail: function () {
              alert('카카오 로그인 에러 발생');
            },
          });
        },
        fail: function () {
          alert('카카오 로그인 에러 발생');
        },
      });
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem('kakao')) {
      router.push('/home');
    }
  }, [router]);

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
      {loading && (
        <LoadingBox>
          <Loading />
        </LoadingBox>
      )}
    </>
  );
};

const Image = styled.img`
  width: 80px;
  height: 80px;
  margin-top: 150px;
`;

const LoadingBox = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Loading = styled.span`
  position: fixed;
  top: 50%;
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #ff6969;
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Index;
