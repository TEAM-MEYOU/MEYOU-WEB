import { NextPage } from 'next';
import Text from '@components/Text';
import { css } from '@emotion/react';
import Container from '@components/Container';
import colors from '@constants/colors';
import Profile from '@components/setting/Profile';
import { useState } from 'react';
import CoupleData from '@components/setting/CoupleData';
import { useRouter } from 'next/router';
import UserInfo from '@components/UserInfo';
import DisConnection from '@components/setting/DisConnection';

const Setting: NextPage = () => {
  const [profile, setProfile] = useState(false);
  const [couple, setCouple] = useState(false);
  const [disCouple, setDisCouple] = useState(false);
  const [disMeyou, setDisMeyou] = useState(false);
  const router = useRouter();

  const handleClickLogOut = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      window.localStorage.clear();
      router.push('/');
    }
  };
  return (
    <>
      <UserInfo />
      <SettingMenu title={'커플 정보 변경'} onClick={() => setCouple(true)} />
      <SettingMenu title={'상대방 프로필 변경'} onClick={() => setProfile(true)} />
      <SettingMenu title={'커플 연결 해제'} warn={true} onClick={() => setDisCouple(true)} />
      <SettingMenu title={'탈퇴하기'} warn={true} onClick={() => setDisMeyou(true)} />
      <SettingMenu title={'로그아웃'} warn={true} onClick={handleClickLogOut} />
      {profile && <Profile onClose={() => setProfile(false)} />}
      {couple && <CoupleData onClose={() => setCouple(false)} />}
      {disCouple && <DisConnection disconnection={'Couple'} onClose={() => setDisCouple(false)} />}
      {disMeyou && <DisConnection disconnection={'Meyou'} onClose={() => setDisMeyou(false)} />}
    </>
  );
};

interface Props {
  title: string;
  warn?: boolean;
  onClick?: () => void;
}

const SettingMenu = ({ title, warn, onClick }: Props) => {
  return (
    <Container
      onClick={onClick}
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1.5rem;
        cursor: pointer;
      `}>
      <Text
        css={css`
          color: ${warn && colors.red600};
        `}>
        {title}
      </Text>
      <img
        css={css`
          opacity: 0.4;
        `}
        width={25}
        height={25}
        src={'/icons/right.png'}
        alt={'>'}
      />
    </Container>
  );
};

export default Setting;
