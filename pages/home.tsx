import { NextPage } from 'next';
import DiaryLog from '@components/DiaryLog';
import ColumnList from '@components/ColumnList';
import CoupleInfo from '@components/CoupleInfo';
import { useEffect, useState } from 'react';
import Profile from '@components/setting/Profile';
import useUser from '@hooks/useUser';
import { useInfiniteQuery } from 'react-query';
import { CoupleDiary, getCoupleDiary, Page } from '@apis/diary';

const Home: NextPage = () => {
  const [modal, setModal] = useState(false);
  const user = useUser();
  const coupleDiary = useInfiniteQuery<Page<CoupleDiary>>('couple_diary', () => getCoupleDiary(user.data!.coupleId), {
    enabled: user.data !== undefined && user.data.coupleId !== null,
  });

  useEffect(() => {
    if (user.data?.coupleInfo) {
      user.data.coupleInfo.nickname || setModal(true);
    }
  }, [user]);
  return (
    <>
      <CoupleInfo />
      <ColumnList>
        {coupleDiary.data?.pages.map(page =>
          page.content.map(content => <DiaryLog key={content.id} coupleDiary={content} />)
        )}
      </ColumnList>
      {modal && <Profile onClose={() => setModal(false)} />}
    </>
  );
};

export default Home;
