import { NextPage } from 'next';
import Text from '@components/Text';
import { css } from '@emotion/react';
import Container from '@components/Container';
import colors from '@constants/colors';

const Setting: NextPage = () => {
  return (
    <>
      <SettingMenu title={'상대방 닉네임 변경'} />
      <SettingMenu title={'상대방 프로필 변경'} />
      <SettingMenu title={'커플 연결 해제'} warn={true} />
      <SettingMenu title={'탈퇴하기'} warn={true} />
    </>
  );
};

interface Props {
  title: string;
  warn?: boolean;
}

const SettingMenu = ({ title, warn }: Props) => {
  return (
    <Container
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
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
