import Modal from '@components/Modal';
import Text from '@components/Text';
import { css } from '@emotion/react';
import colors from '@constants/colors';
import Image from '@components/Image';
import styled from '@emotion/styled';
import Button from '@components/Button';
import { useState } from 'react';
import useUser from '@hooks/useUser';
import { Member, updateMember } from '@apis/member';
import { useQueryClient } from 'react-query';

interface Props {
  onClose: () => void;
}

function Profile({ onClose }: Props) {
  const user = useUser();
  const queryClient = useQueryClient();
  const [nickName, setNickName] = useState(() => {
    if (!user.data!.coupleInfo!.nickname) {
      return '';
    } else {
      return user.data!.coupleInfo!.nickname;
    }
  });

  const handleClickButton = async () => {
    const member: Partial<Member> = { ...user.data!.coupleInfo, nickname: nickName };
    try {
      await updateMember(member);
      await queryClient.invalidateQueries('user');
      onClose();
    } catch (e) {
      alert('해당 닉네임으로 변경 할 수 없습니다.');
    }
  };

  return (
    <Modal onClose={onClose} title="프로필   설정하기">
      <Text
        css={css`
          display: block;
          color: ${colors.content200};
        `}>
        상대방의 프로필을 설정합니다.
      </Text>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 0;
        `}>
        <ProfileInput id={'profile'} type="file" accept={'image/jpeg, image/png'} />
        <label htmlFor={'profile'}>
          <Image
            css={css`
              margin-bottom: 1.5rem;
              cursor: pointer;
              border: 1px solid ${colors.grey100};
            `}
            width={80}
            height={80}
            src={'/icons/user.jpeg'}
            alt={'프로필 이미지'}
          />
        </label>
        <NameInput
          placeholder={'닉네임 설정'}
          value={nickName}
          onChange={e => {
            setNickName(e.target.value);
          }}
        />
      </div>
      <Button onClick={handleClickButton}>변경</Button>
    </Modal>
  );
}

const ProfileInput = styled.input`
  display: none;
`;

const NameInput = styled.input`
  width: 12rem;
  font-size: 2rem;
  padding: 10px;
  background-color: ${colors.grey200};
  border: none;
  border-radius: 1.2rem;
  text-align: center;

  &:focus-within {
    background-color: ${colors.white};
  }
`;

export default Profile;
