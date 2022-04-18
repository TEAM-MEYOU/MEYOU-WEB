import Container from '@components/Container';
import Text from '@components/Text';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import colors from '@constants/colors';
import Image from '@components/Image';

/**
 * 해당 년도가 윤년인지 판단해주는 유틸
 * @param year
 */
function isLeapYear(year: number) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

/**
 * 해당 년,월에 해당하는 시작 요일과, 총 날짜를 계산해주는 유틸
 * @param year
 * @param month
 */
function getCalendar(year: number, month: number) {
  const date = new Date(year, month - 1);
  const startDay = date.getDay();
  let totalOfDay = 0;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      totalOfDay = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      totalOfDay = 30;
      break;
    case 2:
      isLeapYear(year) ? (totalOfDay = 29) : (totalOfDay = 28);
      break;
  }
  return { startDay, totalOfDay };
}

export interface DiaryDate {
  year: number;
  month: number;
  day: number;
}

interface Props {
  date: DiaryDate;
  setDate: Dispatch<SetStateAction<DiaryDate>>;
}

function Calendar({ date, setDate }: Props) {
  const { startDay, totalOfDay } = getCalendar(date.year, date.month);

  const onIncreaseMonth = () => {
    if (date.month === 12) {
      setDate(prevState => ({ ...prevState, year: prevState.year + 1, month: 1 }));
    } else {
      setDate(prevState => ({ ...prevState, month: prevState.month + 1 }));
    }
  };

  const onDecreaseMonth = () => {
    if (date.month === 1) {
      setDate(prevState => ({ ...prevState, year: prevState.year - 1, month: 12 }));
    } else {
      setDate(prevState => ({ ...prevState, month: prevState.month - 1 }));
    }
  };

  const renderCalendar = new Array(startDay + totalOfDay).fill(0).map((key, index) => {
    if (index % 7 === 0) {
      return (
        <DayBox key={index}>
          {new Array(startDay + totalOfDay)
            .fill(0)
            .slice(index, index + 7)
            .map((value, i) => {
              if (index + i >= startDay) {
                return (
                  <DateBox value={index + i + 1 - startDay} key={index + i} date={date} setDate={setDate}>
                    <Text
                      css={css`
                        display: inline-block;
                        margin-bottom: 5px;
                      `}>
                      {index + i + 1 - startDay}
                    </Text>
                    <div>
                      <Image width={15} height={15} src={'/icons/emotions/love.png'} alt={''} />
                      <Image width={15} height={15} src={'/icons/emotions/happy.png'} alt={''} />
                    </div>
                  </DateBox>
                );
              } else return <DateBox key={index + i} />;
            })}
        </DayBox>
      );
    }
  });
  return (
    <Container
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}>
      <Box
        css={css`
          opacity: 0.4;
        `}>
        <SmallImg
          src={'/icons/left.png'}
          onClick={() => {
            setDate(prevState => ({ ...prevState, year: prevState.year - 1 }));
          }}
        />
        <Text>{date.year}</Text>
        <SmallImg
          src={'/icons/right.png'}
          onClick={() => {
            setDate(prevState => ({ ...prevState, year: prevState.year + 1 }));
          }}
        />
      </Box>
      <Box>
        <BigImg src={'/icons/left.png'} onClick={onDecreaseMonth} />
        <Text>{date.month}월</Text>
        <BigImg src={'/icons/right.png'} onClick={onIncreaseMonth} />
      </Box>
      <CalendarBox>
        <HeaderBox>
          <DayText>일</DayText>
          <DayText>월</DayText>
          <DayText>화</DayText>
          <DayText>수</DayText>
          <DayText>목</DayText>
          <DayText>금</DayText>
          <DayText>토</DayText>
        </HeaderBox>
        {renderCalendar}
      </CalendarBox>
    </Container>
  );
}

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 10rem;
  width: 15%;
  margin-bottom: 3rem;
`;

const SmallImg = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const BigImg = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const CalendarBox = styled.div`
  width: 100%;
`;

const HeaderBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid #eff0f2;
`;

const DayText = ({ children }: { children?: ReactNode }) => {
  return (
    <Text
      css={css`
        flex: 1;
        height: 3rem;
        text-align: center;

        &:nth-of-type(1) {
          color: ${colors.red300};
        }

        &:nth-of-type(7) {
          color: ${colors.blue300};
        }
      `}>
      {children}
    </Text>
  );
};

interface DateBoxProps {
  children?: ReactNode;
  value?: number;
}

type DateBox = DateBoxProps & Partial<Props>;

const DateBox = ({ children, value = 0, date, setDate }: DateBox) => {
  return (
    <div
      onClick={() => {
        if (setDate) {
          setDate(prevState => ({ ...prevState, day: value }));
        }
      }}
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        background-color: ${value === date?.day ? colors.grey200 : 'transparent'};
        border-radius: 12px;

        &:nth-of-type(1) {
          color: ${colors.red300};
        }

        &:nth-of-type(7) {
          color: ${colors.blue300};
        }
      `}>
      {children}
    </div>
  );
};

const DayBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  height: 70px;

  &:nth-last-of-type(1) > div {
    width: calc(100% / 7);
    flex: initial;
  }
`;

export default Calendar;
