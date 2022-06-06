import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';
import { checkMember, Member } from '@apis/member';
import { AxiosError } from 'axios';
import { getStat, Stat } from '@apis/stat';
import { Couple, getCouple } from '@apis/couple';
import { CoinLog, getCoinLog } from '@apis/coin';
import {
  CoupleDiary,
  Diary,
  getCoupleDiary,
  getCoupleDiaryByDuration,
  getDiaryByDate,
  getDiaryById,
  Page,
} from '@apis/diary';

export const useFetchUser = (options?: UseQueryOptions<Member, AxiosError, Member, 'user'>) => {
  const user: UseQueryResult<Member, AxiosError> = useQuery(
    'user',
    () => checkMember(window.localStorage.getItem('kakao')!),
    {
      ...options,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  return user;
};

export const useFetchDiaryList = (
  coupleId: number | undefined,
  options?: UseInfiniteQueryOptions<Page<CoupleDiary>, AxiosError, Page<CoupleDiary>, Page<CoupleDiary>, 'diaryList'>
) => {
  const diaryList: UseInfiniteQueryResult<Page<CoupleDiary>, AxiosError> = useInfiniteQuery(
    'diaryList',
    ({ pageParam }) => getCoupleDiary(coupleId!, pageParam),
    {
      getNextPageParam: lastPage => {
        const currentPage = lastPage.pageable.pageNumber;
        if (currentPage + 1 > lastPage.totalPages) {
          return undefined;
        }
        return currentPage + 1;
      },
      enabled: coupleId !== undefined,
      ...options,
    }
  );

  return diaryList;
};

export const useFetchCouple = (
  coupleId: number | undefined,
  options?: UseQueryOptions<Couple, AxiosError, Couple, 'couple'>
) => {
  const couple: UseQueryResult<Couple, AxiosError> = useQuery('couple', () => getCouple(coupleId!), {
    enabled: coupleId !== undefined,
    ...options,
  });

  return couple;
};

export const useFetchDiaryById = (
  id: number | null,
  options?: UseQueryOptions<Diary, AxiosError, Diary, ['diary', number]>
) => {
  const diary: UseQueryResult<Diary, AxiosError> = useQuery(['diary', id!], () => getDiaryById(id!), {
    ...options,
    enabled: id !== null,
  });

  return diary;
};

export const useFetchDiaryByDate = (
  date: string,
  memberId?: number,
  options?: UseQueryOptions<Diary, AxiosError, Diary, ['diary', string]>
) => {
  const diary: UseQueryResult<Diary, AxiosError> = useQuery(['diary', date], () => getDiaryByDate(memberId!, date), {
    enabled: memberId !== undefined,
    ...options,
  });
  return diary;
};

export const useFetchDiaryByDuration = (
  start: string,
  end: string,
  coupleId?: number,
  options?: UseQueryOptions<Array<CoupleDiary>, AxiosError, Array<CoupleDiary>, ['diary', string, string]>
) => {
  const coupleDiary: UseQueryResult<Array<CoupleDiary>, AxiosError> = useQuery(
    ['diary', start, end],
    () => getCoupleDiaryByDuration(coupleId!, start, end),
    {
      ...options,
      enabled: coupleId !== undefined,
    }
  );
  return coupleDiary;
};

export const useFetchCoinLog = (
  start: string,
  end: string,
  coupleId?: number,
  options?: UseQueryOptions<Array<CoinLog>, AxiosError, Array<CoinLog>, ['coin', string, string]>
) => {
  const coinLog: UseQueryResult<Array<CoinLog>, AxiosError> = useQuery(
    ['coin', start, end],
    () => getCoinLog(coupleId!, start, end),
    {
      enabled: coupleId !== undefined,
      ...options,
    }
  );
  return coinLog;
};

export const useFetchStat = (
  date: string,
  memberId?: number,
  options?: UseQueryOptions<Stat, AxiosError, Stat, ['stat', number, string]>
) => {
  const stats: UseQueryResult<Stat, AxiosError> = useQuery(['stat', memberId!, date], () => getStat(memberId!, date), {
    ...options,
    enabled: memberId !== undefined,
  });
  return stats;
};
