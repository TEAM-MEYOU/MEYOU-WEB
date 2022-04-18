import { css } from '@emotion/react';
import Image from '@components/Image';
import Text from '@components/Text';
import colors from '@constants/colors';
import Container from '@components/Container';
import useUser from '@hooks/useUser';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { Couple, getCouple } from '@apis/couple';
import Button from '@components/Button';
import CoupleData from '@components/setting/CoupleData';
import { useState } from 'react';
import { ConvertMeYouDateString, DiffCoupleTime } from '@utils/date';

function CoupleInfo() {
  const user = useUser();
  const couple = useQuery<Couple>('couple', () => getCouple(user.data!.coupleId), {
    enabled: user.data !== undefined && user.data.coupleId !== null,
    retry: 0,
  });
  const [modal, setModal] = useState(false);
  return (
    <>
      {user.data && couple.data && (
        <Container
          css={css`
            display: flex;
            justify-content: space-between;
          `}>
          <DIV>
            <Image css={css``} width={60} height={60} src={user.data!.imageUrl} alt={'프로필이미지'} />
            <Text>{user.data.nickname}</Text>
          </DIV>
          {couple.data.coupleStart ? (
            <DIV>
              <Text
                css={css`
                  font-size: 3rem;
                `}>
                {ConvertMeYouDateString(new Date(couple.data.coupleStart))} ~
              </Text>
              <Text
                css={css`
                  font-size: 3rem;
                  color: ${colors.content300};
                `}>
                D+ {DiffCoupleTime(new Date(couple.data.coupleStart))}일째
              </Text>
              <Text
                css={css`
                  font-size: 3rem;
                  color: ${colors.content100};
                  margin-top: 5px;
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
            <Image css={css``} width={60} height={60} src={user.data!.coupleInfo!.imageUrl} alt={'프로필이미지'} />
            <Text>{user.data.coupleInfo!.nickname}</Text>
          </DIV>
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
