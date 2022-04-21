import { NextPage } from 'next';
import Container from '@components/Container';
import Text from '@components/Text';
import Lottie from '@components/Lottie';
import { css } from '@emotion/react';
import IconWithText from '@components/IconWithText';
import Button from '@components/Button';
import { useEffect, useState } from 'react';
import AuthCode from '@components/AuthCode';
import useUser from '@hooks/useUser';
import { getMember, Member } from '@apis/member';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';

const GettingStarted: NextPage = () => {
  const user = useUser();
  const [modal, setModal] = useState(false);
  const [connectModal, setConnectModal] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleClickLinkShare = async () => {
    const url = `https://meyou-web.vercel.app/connection?id=${user.data!.uniqueCode}`;
    if (typeof navigator.share !== 'undefined') {
      try {
        await navigator.share({
          title: 'MeYou',
          text: '당신과 연결하고 싶어해요!',
          url: url,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('링크 주소가 복사되었습니다.');
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleClickCopyId = async () => {
    try {
      await navigator.clipboard.writeText(user.data!.uniqueCode);
      alert('내 ID가 복사되었습니다.');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user.data) {
      user.data.coupleInfo && router.push('/home');
    }
    const falling = setInterval(async () => {
      const response: Member = await getMember(user.data!.id);
      if (response.coupleId) {
        await queryClient.invalidateQueries('user');
        await router.push('/home');
      }
    }, 6000);

    return () => clearInterval(falling);
  }, [user.data, router, queryClient]);

  return (
    <>
      <Container
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex: 1;
        `}>
        <Lottie
          css={css`
            width: 100%;
            height: 30rem;
          `}
          src={'https://assets7.lottiefiles.com/packages/lf20_dpohsucu.json'}
        />
        <Text
          css={css`
            text-align: center;
            font-size: 2.5rem;
          `}>{`안녕하세요! ${user.data?.uniqueCode}님\n 아직 상대방과 연결되지 않았어요!`}</Text>
      </Container>
      <Button iconButton={true} onClick={handleClickLinkShare}>
        <IconWithText
          css={css`
            cursor: pointer;
          `}
          src={'/icons/share.png'}>
          링크 공유하기
        </IconWithText>
      </Button>
      <Button iconButton={true} onClick={() => setModal(true)}>
        <IconWithText
          css={css`
            cursor: pointer;
          `}
          src={'/icons/code.png'}>
          인증코드 생성하기
        </IconWithText>
      </Button>
      <Button iconButton={true} onClick={() => setConnectModal(true)}>
        <IconWithText
          css={css`
            cursor: pointer;
          `}
          src={'/icons/code.png'}>
          인증코드 입력하기
        </IconWithText>
      </Button>
      <Button iconButton={true} onClick={handleClickCopyId}>
        <IconWithText
          css={css`
            cursor: pointer;
          `}
          src={'/icons/copy.png'}>
          내ID 복사하기
        </IconWithText>
      </Button>
      {modal && <AuthCode setModal={setModal} authValue={'create'} />}
      {connectModal && <AuthCode setModal={setConnectModal} authValue={'connect'} />}
    </>
  );
};

export default GettingStarted;
