import { NextPage } from 'next';
import DiaryLog from '@components/DiaryLog';
import ColumnList from '@components/ColumnList';
import CoupleInfo from '@components/CoupleInfo';
import { useEffect, useState } from 'react';
import Profile from '@components/setting/Profile';
import useUser from '@hooks/useUser';

const Home: NextPage = () => {
  const [modal, setModal] = useState(false);
  const user = useUser();

  useEffect(() => {
    if (user.data) {
      user.data.coupleInfo!.nickname || setModal(true);
    }
  }, [user]);
  return (
    <>
      <CoupleInfo />
      <ColumnList>
        <DiaryLog date={{ year: 2022, month: 4, day: 11 }} />
        <DiaryLog date={{ year: 2022, month: 4, day: 10 }} />
        <DiaryLog date={{ year: 2022, month: 4, day: 9 }} />
      </ColumnList>
      {modal && <Profile onClose={() => setModal(false)} />}
    </>
  );
};

export default Home;
