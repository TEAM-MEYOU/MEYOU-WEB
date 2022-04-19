import { NextPage } from 'next';
import Container from '@components/Container';
import Text from '@components/Text';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import IconWithText from '@components/IconWithText';
import Lottie from '@components/Lottie';
import { useEffect, useState } from 'react';
import useUser from '@hooks/useUser';
import { connectCouple } from '@apis/couple';
import { getMemberByUniqueCode, Member } from '@apis/member';
import { useQueryClient } from 'react-query';

const Connection: NextPage = () => {
  const router = useRouter();
  const user = useUser();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [kakao, setKakao] = useState('');
  const queryClient = useQueryClient();

  const handleClickConnect = async () => {
    setLoading(true);
    await connectCouple(id as string, user.data!.uniqueCode);
    await queryClient.invalidateQueries('user');
    setTimeout(() => {
      router.push('/home');
    }, 3000);
  };

  const fetchValidUser = async () => {
    try {
      const member: Member = await getMemberByUniqueCode(id as string);
      setKakao(member.kakao);
    } catch (e) {
      alert('유효하지 않은 페이지입니다.');
      router.push('/home');
    }
  };
  useEffect(() => {
    id && fetchValidUser();
  }, [id]);
  return (
    <>
      <Container
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
        `}>
        <Text
          css={css`
            font-size: 3rem;
          `}>
          초대메세지가 도착했어요!
        </Text>
        {loading ? (
          <>
            <Lottie
              css={css`
                width: 100%;
                height: 30rem;
                margin-bottom: 10px;
              `}
              src={'https://assets4.lottiefiles.com/packages/lf20_x62chJ.json'}
            />
            <Text
              css={css`
                width: 100%;
                text-align: center;
                font-size: 2.6rem;
              `}>{`연결중이에요! \n\n잠시만 기다려주세요..!`}</Text>
          </>
        ) : (
          <>
            <Lottie
              css={css`
                width: 100%;
                height: 30rem;
                margin-bottom: 10px;
              `}
              src={'https://assets8.lottiefiles.com/private_files/lf30_n5n2u73t.json'}
            />
            <IconWithText container={false} src={'/icons/bulb.png'}>
              {id}님의 정보를 확인하세요!
            </IconWithText>
            <Text
              css={css`
                margin-top: 5px;
                margin-bottom: 10px;
                font-size: 3rem;
              `}>
              카카오 아이디: {kakao}
            </Text>
            <Button
              onClick={handleClickConnect}
              css={css`
                margin-top: auto;
              `}>
              연결
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Connection;
