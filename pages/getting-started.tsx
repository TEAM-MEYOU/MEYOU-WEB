import { NextPage } from 'next';
import Container from '@components/Container';
import Text from '@components/Text';
import Lottie from '@components/Lottie';
import { css } from '@emotion/react';
import IconWithText from '@components/IconWithText';
import Button from '@components/Button';
import { useEffect, useState } from 'react';
import Modal from '@components/Modal';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const GettingStarted: NextPage = () => {
  const [id, setId] = useState('');
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const handleClickLinkShare = async () => {
    const url = `https://meyou-web.vercel.app/connection?id=${id}`;
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
      await navigator.clipboard.writeText(id);
      alert('내 ID가 복사되었습니다.');
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setId(window.localStorage.getItem('id') as string);
  }, []);
  const handleClickInput = () => {
    setModal(true);
  };
  const handleClickConnect = () => {
    router.push('/home');
  };

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
          `}>{`안녕하세요! ${id}님\n 아직 상대방과 연결되지 않았어요!`}</Text>
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
      <Button iconButton={true} onClick={handleClickCopyId}>
        <IconWithText
          css={css`
            cursor: pointer;
          `}
          src={'/icons/copy.png'}>
          내ID 복사하기
        </IconWithText>
      </Button>
      <Button iconButton={true} onClick={handleClickInput}>
        <IconWithText
          css={css`
            cursor: pointer;
          `}
          src={'/icons/code.png'}>
          상대ID 입력하기
        </IconWithText>
      </Button>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <IconWithText container={false} src={'/icons/code.png'}>
            상대방ID 입력하기
          </IconWithText>
          <CodeInput autoFocus={true} />
          <Button onClick={handleClickConnect}>연결하기</Button>
        </Modal>
      )}
    </>
  );
};

const CodeInput = styled.input`
  width: 100%;
  margin: 10px 0;
  font-size: 3.5rem;
  padding: 10px;
  outline: none;
  border: none;
`;

export default GettingStarted;
