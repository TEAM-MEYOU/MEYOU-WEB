import Modal from '@components/Modal';
import Text from '@components/Text';
import styled from '@emotion/styled';
import colors from '@constants/colors';
import { css } from '@emotion/react';
import Button from '@components/Button';
import { useQueryClient } from 'react-query';
import { updateCouple } from '@apis/couple';
import { useState } from 'react';
import { ConvertMeYouDateString } from '@utils/date';
import { useFetchCouple, useFetchUser } from '@hooks/queries';

interface Props {
  onClose: () => void;
}

function CoupleData({ onClose }: Props) {
  const queryClient = useQueryClient();
  const fetchUser = useFetchUser();
  const fetchCouple = useFetchCouple(fetchUser.data?.coupleId);
  const [date, setDate] = useState(() => {
    if (fetchCouple.data) {
      return fetchCouple.data.coupleStart ? ConvertMeYouDateString(new Date(fetchCouple.data.coupleStart)) : '';
    } else {
      return '';
    }
  });
  const handleClickButton = async () => {
    try {
      const [year, month, day] = date.split('.');
      const saveDate = new Date(Number(year), Number(month) - 1, Number(day) + 1);
      if (isNaN(saveDate.valueOf())) {
        alert('올바르지 않은 입력입니다.');
      }
      await updateCouple({ ...fetchCouple.data!, coupleStart: saveDate });
      await queryClient.invalidateQueries('couple');
      onClose();
    } catch (e) {
      alert('올바르지 않은 입력입니다.');
    }
  };
  return (
    <Modal onClose={onClose} title={'커플정보 입력'}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 1.5rem;
        `}>
        <Text
          css={css`
            font-size: 2.6rem;
            margin-bottom: 1rem;
          `}>
          우리의 시작일
        </Text>
        <Input placeholder={'시작일'} value={date} onChange={e => setDate(e.target.value)} />
        <Text
          css={css`
            font-size: 1.6rem;
            color: ${colors.content200};
          `}>
          *yyyy.mm.dd형식으로 입력해주세요!
        </Text>
      </div>
      <Button onClick={handleClickButton}>변경</Button>
    </Modal>
  );
}

const Input = styled.input`
  width: 12rem;
  font-size: 2.2rem;
  padding: 5px;
  background-color: ${colors.grey200};
  border: none;
  border-radius: 1.2rem;
  text-align: center;

  &:focus-within {
    background-color: ${colors.white};
  }
`;

export default CoupleData;
