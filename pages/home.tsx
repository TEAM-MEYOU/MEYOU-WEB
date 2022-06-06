import { NextPage } from 'next';
import DiaryLog from '@components/DiaryLog';
import ColumnList from '@components/ColumnList';
import CoupleInfo from '@components/CoupleInfo';
import { useEffect, useState } from 'react';
import Profile from '@components/setting/Profile';
import { useFetchDiaryList, useFetchUser } from '@hooks/queries';

const Home: NextPage = () => {
  const [modal, setModal] = useState(false);
  const fetchUser = useFetchUser();
  const fetchCoupleDiary = useFetchDiaryList(fetchUser.data?.coupleId);

  useEffect(() => {
    if (fetchUser.data?.coupleInfo) {
      fetchUser.data.coupleInfo.nickname || setModal(true);
    }
  }, [fetchUser]);
  return (
    <>
      <CoupleInfo />
      <ColumnList>
        {fetchCoupleDiary.data?.pages.map(page =>
          page.content.map(content => <DiaryLog key={content.id} coupleDiary={content} />)
        )}
      </ColumnList>
      {modal && <Profile onClose={() => setModal(false)} />}
    </>
  );
};

export default Home;
