import { NextPage } from 'next';
import Header from '@components/Header';
import { useRouter } from 'next/router';
import Loading from '@components/Loading';
import Container from '@components/Container';

const MonthEmotion: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Header onClick={() => router.back()}>이번달 감정 통계</Header>
      <Container>
        <Loading />
      </Container>
    </>
  );
};

export default MonthEmotion;
