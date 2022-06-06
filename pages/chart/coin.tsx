import { NextPage } from 'next';
import Header from '@components/Header';
import { useRouter } from 'next/router';
import Text from '@components/Text';
import ColumnList from '@components/ColumnList';
import { css } from '@emotion/react';
import { CoinGainHash, CoinLog } from '@apis/coin';
import { ToJavaLocaleDate } from '@utils/date';
import colors from '@constants/colors';
import Image from '@components/Image';
import { memo } from 'react';
import { useFetchCoinLog, useFetchUser } from '@hooks/queries';

const todayDate = new Date();
const today = ToJavaLocaleDate(todayDate);
const monthAgoDate = new Date();
monthAgoDate.setMonth(monthAgoDate.getMonth() - 1);
const monthAgo = ToJavaLocaleDate(monthAgoDate);

const Coin: NextPage = () => {
  const router = useRouter();
  const fetchUser = useFetchUser();
  const fetchCoinLog = useFetchCoinLog(monthAgo, today, fetchUser.data?.coupleId);
  return (
    <>
      <Header onClick={() => router.back()}>코인 사용 기록</Header>
      <ColumnList>
        {fetchCoinLog.data?.map(log => (
          <CoinLogItem log={log} key={log.id} />
        ))}
      </ColumnList>
    </>
  );
};

interface Props {
  log: CoinLog;
}

const CoinLogItem = memo(({ log }: Props) => {
  return (
    <div
      key={log.id}
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        padding: 1rem;
        border-radius: 12px;
        background-color: ${log.coinLogType === 'GAIN' ? colors.blue100 : colors.content100};
        box-shadow: ${colors.boxShadow};
        margin-bottom: 1.5rem;
      `}>
      <Text
        css={css`
          width: 18rem;
        `}>
        {new Date(log.createdDate).toLocaleString()}
      </Text>
      <Text>{CoinGainHash[log.coinGainType]}</Text>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}>
        <Image width={20} height={20} src={'/icons/coin.png'} alt={'코인 아이콘'} />
        <Text
          css={css`
            margin-left: 0.5rem;
            font-size: 2.5rem;
          `}>
          {log.coinQuantity}
        </Text>
      </div>
    </div>
  );
});

CoinLogItem.displayName = 'CoinLogItem';

export default Coin;
