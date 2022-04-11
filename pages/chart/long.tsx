import { NextPage } from 'next';
import Header from '@components/Header';
import { useRouter } from 'next/router';
import Loading from '@components/Loading';
import Container from '@components/Container';

const Long: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Header onClick={() => router.back()}>누가 더 다이어를 길게 썼을까요?</Header>
      <Container>
        <Loading />
      </Container>
    </>
  );
};

export default Long;
