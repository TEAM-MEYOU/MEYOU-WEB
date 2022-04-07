import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Diary: NextPage = () => {
  const router = useRouter();
  const random = Math.floor(Math.random() * 11);
  useEffect(() => {
    if (random >= 5) {
      router.push('/diary/complete');
    } else {
      router.push('/diary/write');
    }
  }, []);
  return <></>;
};

export default Diary;
