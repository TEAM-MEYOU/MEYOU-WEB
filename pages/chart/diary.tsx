import { NextPage } from 'next';
import Header from '@components/Header';
import Calendar, { DiaryDate } from '@components/Calendar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CoupleDiary } from '@apis/diary';
import { ToJavaLocaleDate } from '@utils/date';
import Container from '@components/Container';
import DiaryLog from '@components/DiaryLog';
import Text from '@components/Text';
import { css } from '@emotion/react';
import { useFetchDiaryByDuration, useFetchUser } from '@hooks/queries';

const initDate: DiaryDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
};

const ChartDiary: NextPage = () => {
  const fetchUser = useFetchUser();
  const router = useRouter();
  const [date, setDate] = useState(initDate);
  const fetchCoupleDiary = useFetchDiaryByDuration(
    ToJavaLocaleDate(new Date(date.year, date.month - 1, 1)),
    ToJavaLocaleDate(new Date(date.year, date.month, 1)),
    fetchUser.data?.coupleId
  );
  const [diaryDate, setDiaryDate] = useState<Array<number>>([]);
  const [coupleDiary, setCoupleDiary] = useState<CoupleDiary | null>(null);

  useEffect(() => {
    if (fetchCoupleDiary.data) {
      const temp: Array<number> = [];
      fetchCoupleDiary.data.map(coupleDiary => temp.push(Number(coupleDiary.writeTime.split('-')[2])));
      setDiaryDate(temp);
    }
  }, [fetchCoupleDiary.data]);

  useEffect(() => {
    let update = false;
    if (fetchCoupleDiary.data) {
      for (const item of fetchCoupleDiary.data) {
        if (item.writeTime === ToJavaLocaleDate(new Date(date.year, date.month - 1, date.day))) {
          setCoupleDiary(item);
          update = true;
          break;
        }
      }
      if (!update) {
        setCoupleDiary(null);
      }
    }
  }, [date, fetchCoupleDiary.data]);

  return (
    <>
      <Header onClick={() => router.back()}>다이어리 기록</Header>
      <Calendar
        css={css`
          margin-bottom: 1.5rem;
        `}
        date={date}
        setDate={setDate}
        diaryDate={diaryDate}
      />
      {coupleDiary ? (
        <DiaryLog coupleDiary={coupleDiary} />
      ) : (
        <Container>
          <Text>해당 날짜에 작성된 다이어리가 존재하지 않습니다.</Text>
        </Container>
      )}
    </>
  );
};

export default ChartDiary;
