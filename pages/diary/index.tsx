import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ToJavaLocaleDate } from '@utils/date';
import { useFetchDiaryByDate, useFetchUser } from '@hooks/queries';

const Diary: NextPage = () => {
  const router = useRouter();
  const fetchUser = useFetchUser();
  const fetchDiary = useFetchDiaryByDate(ToJavaLocaleDate(new Date()), fetchUser.data?.id);
  useEffect(() => {
    if (fetchDiary.data !== undefined) {
      fetchDiary.data ? router.push('/diary/complete') : router.push('/diary/write');
    }
  }, [fetchDiary.data, router]);
  return <></>;
};

export default Diary;
