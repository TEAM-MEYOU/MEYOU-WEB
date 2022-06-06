import Modal from '@components/Modal';
import Text from '@components/Text';
import styled from '@emotion/styled';
import Button from '@components/Button';
import { useState } from 'react';
import { css } from '@emotion/react';
import colors from '@constants/colors';
import { disconnectCouple } from '@apis/couple';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { disconnectMember } from '@apis/member';
import { useFetchUser } from '@hooks/queries';

const DisconnectionType = {
  COUPLE: 'Couple',
  MEYOU: 'Meyou',
} as const;

export type DisConnectionValue = typeof DisconnectionType[keyof typeof DisconnectionType];

interface Props {
  disconnection: DisConnectionValue;
  onClose: () => void;
}

function DisConnection({ disconnection, onClose }: Props) {
  const [input, setInput] = useState('');
  const fetchUser = useFetchUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleClickDisconnection = async () => {
    if (disconnection === 'Couple') {
      if (input !== '연결해제') {
        alert('입력값이 일치하지 않습니다.');
      } else {
        if (!fetchUser.data?.coupleId) {
          alert('현재 커플연결상태가 아닙니다.');
        } else {
          try {
            await disconnectCouple(fetchUser.data.coupleId);
            await queryClient.invalidateQueries('user');
            await router.push('/getting-started');
          } catch (e) {
            console.log(e);
          }
        }
      }
    } else if (disconnection === 'Meyou') {
      if (input !== '탈퇴') {
        alert('입력값이 일치하지 않습니다.');
      } else {
        if (fetchUser.data?.coupleId) {
          alert('커플연결 해제전에는 탈퇴하실 수 없습니다.');
        } else {
          try {
            await disconnectMember(fetchUser.data!.id);
            window.localStorage.clear();
            await router.push('/');
            await queryClient.invalidateQueries('user');
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  };
  return (
    <Modal onClose={onClose} title={disconnection === 'Couple' ? '연결해제' : '회원탈퇴'}>
      {disconnection === 'Couple' && (
        <>
          <Text
            css={css`
              font-size: 2.5rem;
            `}>
            정말로 커플연결을 해제하시겠습니까?
          </Text>
          <Text
            css={css`
              display: block;
              color: ${colors.content300};
              margin-bottom: 1.5rem;
            `}>
            연결해제를 위해 `연결해제`를 입력해주세요.
          </Text>
        </>
      )}
      {disconnection === 'Meyou' && (
        <>
          <Text
            css={css`
              font-size: 2.5rem;
            `}>
            정말로 탈퇴 하시겠습니까?
          </Text>
          <Text
            css={css`
              display: block;
              color: ${colors.content300};
              margin-bottom: 1.5rem;
            `}>
            탈퇴를 위해 `탈퇴`를 입력해주세요.
          </Text>
        </>
      )}
      <Input value={input} onChange={e => setInput(e.target.value)} autoFocus={true} />
      {disconnection === 'Couple' && (
        <Text
          css={css`
            display: block;
            float: right;
            color: ${colors.content200};
            margin-bottom: 1.5rem;
          `}>
          복구는 30일안에만 가능합니다.
        </Text>
      )}
      <Button onClick={handleClickDisconnection}>확인</Button>
    </Modal>
  );
}

const Input = styled.input`
  width: 100%;
  font-size: 2.5rem;
  height: 5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

export default DisConnection;
