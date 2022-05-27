import Modal from '@components/Modal';
import Text from '@components/Text';
import { css } from '@emotion/react';
import colors from '@constants/colors';
import styled from '@emotion/styled';
import Button from '@components/Button';
import { ChangeEvent, useState } from 'react';
import useUser from '@hooks/useUser';
import { Member, updateMember } from '@apis/member';
import { useQueryClient } from 'react-query';
import useAWS from '@hooks/useAWS';
import { ResizeImage } from '@utils/fileUtil';

interface Props {
  onClose: () => void;
}

export interface IImage {
  file: File | null;
  url: string;
}

function Profile({ onClose }: Props) {
  const user = useUser();
  const aws = useAWS();
  const queryClient = useQueryClient();
  const [image, setImage] = useState<IImage>(() => {
    if (user.data) {
      return { file: null, url: user.data.coupleInfo!.imageUrl };
    } else {
      return { file: null, url: '/icons/user.jpeg' };
    }
  });
  const [nickName, setNickName] = useState(() => {
    if (user.data) {
      return user.data.coupleInfo!.nickname ? user.data.coupleInfo!.nickname : '';
    } else {
      return '';
    }
  });

  const onChangeImage = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    ResizeImage(file, 300, 300, setImage);
  };

  const handleClickButton = async () => {
    const member: Partial<Member> = { ...user.data!.coupleInfo, nickname: nickName };
    try {
      if (image.file) {
        await aws.upload(image.file, user.data!.coupleInfo!.id);
      }
      await updateMember(member);
      await queryClient.invalidateQueries('user');
      onClose();
    } catch (e) {
      alert('에러 발생');
    }
  };

  return (
    <Modal onClose={onClose} title="프로필 설정하기">
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
        <ProfileInput onChange={onChangeImage} id={'profile'} type="file" accept={'image/jpeg, image/png'} />
        <label htmlFor={'profile'}>
          <img
            css={css`
              margin-bottom: 1.5rem;
              cursor: pointer;
              border: 1px solid ${colors.grey100};
              border-radius: 50%;
              object-fit: cover;
            `}
            width={80}
            height={80}
            src={image.url}
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
