import { NextPage } from 'next';
import Header from '@components/Header';
import Calendar from '@components/Calendar';
import { useRouter } from 'next/router';
import DiaryLog, { DiaryDate } from '@components/DiaryLog';
import ColumnList from '@components/ColumnList';
import { useState } from 'react';

const initDate: DiaryDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
};

const ChartDiary: NextPage = () => {
  const router = useRouter();
  const [date, setDate] = useState(initDate);

  return (
    <>
      <Header onClick={() => router.back()}>다이어리 기록</Header>
      <Calendar date={date} setDate={setDate} />
      <ColumnList>
        <DiaryLog date={date} />
      </ColumnList>
    </>
  );
};

export default ChartDiary;
