import { NextPage } from 'next';
import DiaryLog from '@components/DiaryLog';
import ColumnList from '@components/ColumnList';
import CoupleInfo from '@components/CoupleInfo';
import { useEffect, useRef, useState } from 'react';
import Profile from '@components/setting/Profile';
import { useFetchDiaryList, useFetchUser } from '@hooks/queries';
import { loadWebpackHook } from 'next/dist/server/config-utils';

const Home: NextPage = () => {
  const [modal, setModal] = useState(false);
  const fetchUser = useFetchUser();
  const fetchCoupleDiary = useFetchDiaryList(fetchUser.data?.coupleId);
  const divRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  const intersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach(async entry => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        fetchCoupleDiary.hasNextPage && (await fetchCoupleDiary.fetchNextPage());
      }
    });
  };

  useEffect(() => {
    if (fetchUser.data?.coupleInfo) {
      fetchUser.data.coupleInfo.nickname || setModal(true);
    }
  }, [fetchUser]);

  useEffect(() => {
    if (fetchCoupleDiary.data) {
      observerRef.current = new IntersectionObserver(intersectionObserver);
      divRef.current && observerRef.current?.observe(divRef.current);
    }
  }, [fetchCoupleDiary.data, observerRef, divRef, intersectionObserver]);
  return (
    <>
      <CoupleInfo />
      <ColumnList>
        {fetchCoupleDiary.data?.pages.map(page =>
          page.content.map(content => <DiaryLog key={content.id} coupleDiary={content} />)
        )}
        <div ref={divRef}></div>
      </ColumnList>
      {modal && <Profile onClose={() => setModal(false)} />}
    </>
  );
};

export default Home;
