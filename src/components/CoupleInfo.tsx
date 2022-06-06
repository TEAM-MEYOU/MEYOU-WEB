import { css } from '@emotion/react';
import Image from '@components/Image';
import Text from '@components/Text';
import colors from '@constants/colors';
import Container from '@components/Container';
import styled from '@emotion/styled';
import Button from '@components/Button';
import CoupleData from '@components/setting/CoupleData';
import { useState } from 'react';
import { ConvertMeYouDateString, DiffCoupleTime } from '@utils/date';
import { useFetchCouple, useFetchUser } from '@hooks/queries';

function CoupleInfo() {
  const fetchUser = useFetchUser();
  const fetchCouple = useFetchCouple(fetchUser.data?.coupleId);
  const [modal, setModal] = useState(false);
  return (
    <>
      {fetchUser.data && fetchCouple.data && (
        <Container>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}>
            <DIV>
              <Image css={css``} width={60} height={60} src={fetchUser.data!.imageUrl} alt={'프로필이미지'} />
              <Text>{fetchUser.data.nickname}</Text>
            </DIV>
            {fetchCouple.data.coupleStart ? (
              <DIV>
                <Text
                  css={css`
                    font-size: 3rem;
                  `}>
                  {ConvertMeYouDateString(new Date(fetchCouple.data.coupleStart))} ~
                </Text>
                <Text
                  css={css`
                    font-size: 3rem;
                    color: ${colors.content300};
                  `}>
                  D+ {DiffCoupleTime(new Date(fetchCouple.data.coupleStart))}일째
                </Text>
                <Text
                  css={css`
                    font-size: 2.6rem;
                    color: ${colors.content100};
                    margin-top: 5px;
                    text-align: center;
                  `}>
                  오늘의 감정을 남겨보세요
                </Text>
              </DIV>
            ) : (
              <DIV>
                <Button onClick={() => setModal(true)}>커플정보 입력</Button>
              </DIV>
            )}
            <DIV>
              <Image
                css={css``}
                width={60}
                height={60}
                src={fetchUser.data!.coupleInfo!.imageUrl}
                alt={'프로필이미지'}
              />
              <Text>{fetchUser.data.coupleInfo!.nickname}</Text>
            </DIV>
          </div>
          <div
            css={css`
              float: right;
              display: flex;
              align-items: center;
              margin-top: 1rem;
            `}>
            <img
              css={css`
                width: 2.5rem;
                height: 2.5rem;
                margin-right: 0.5rem;
              `}
              src={'/icons/coin.png'}
              alt={'코인 아이콘'}
            />
            <Text
              css={css`
                font-size: 2.5rem;
              `}>
              {fetchCouple.data.coin}
            </Text>
          </div>
        </Container>
      )}
      {modal && <CoupleData onClose={() => setModal(false)} />}
    </>
  );
}

const DIV = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default CoupleInfo;
