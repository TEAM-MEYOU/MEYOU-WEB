import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getDiaryByDate } from '@apis/diary';
import useUser from '@hooks/useUser';
import { ToJavaLocaleDate } from '@utils/date';

const Diary: NextPage = () => {
  const router = useRouter();
  const user = useUser();
  const todayDiary = useQuery('today', () => getDiaryByDate(user.data!.id, ToJavaLocaleDate(new Date())), {
    enabled: user.data !== undefined,
    retry: 0,
  });
  useEffect(() => {
    if (todayDiary.data !== undefined) {
      todayDiary.data ? router.push('/diary/complete') : router.push('/diary/write');
    }
  }, [todayDiary.data, router]);
  return <></>;
};

export default Diary;
