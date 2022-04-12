import IconWithText from '@components/IconWithText';
import Button from '@components/Button';
import Modal from '@components/Modal';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import Text from '@components/Text';
import { css } from '@emotion/react';
import Profile from '@components/setting/Profile';

const Auth = {
  Create: 'create',
  Code: 'code',
  Connect: 'connect',
  Profile: 'profile',
} as const;

export type AuthValue = typeof Auth[keyof typeof Auth];

interface Props {
  authValue: AuthValue;
  setModal: Dispatch<SetStateAction<boolean>>;
}

function AuthCode({ authValue, setModal }: Props) {
  const [auth, setAuth] = useState<AuthValue>(authValue);
  const handleClickConnect = () => {
    setAuth('profile');
  };
  const handleClickCreateCode = () => {
    setAuth('code');
  };
  return (
    <Modal onClose={() => setModal(false)}>
      {auth === 'create' && (
        <>
          <IconWithText container={false} src={'/icons/code.png'}>
            상대방ID 입력하기
          </IconWithText>
          <CodeInput autoFocus={true} />
          <Button onClick={handleClickCreateCode}>인증코드 생성</Button>
        </>
      )}
      {auth === 'code' && (
        <>
          <IconWithText
            css={css`
              margin-bottom: 1.5rem;
            `}
            container={false}
            src={'/icons/code.png'}>
            인증코드 발급
          </IconWithText>
          <CodeText>1</CodeText>
          <CodeText>2</CodeText>
          <CodeText>3</CodeText>
          <CodeText>4</CodeText>
          <Text
            css={css`
              display: block;
              margin-top: 1.5rem;
            `}>
            상대방에게 인증코드를 알려주세요!
          </Text>
        </>
      )}
      {auth === 'connect' && (
        <>
          <IconWithText container={false} src={'/icons/code.png'}>
            인증코드 입력하기
          </IconWithText>
          <CodeInput autoFocus={true} />
          <Button onClick={handleClickConnect}>연결하기</Button>
        </>
      )}
      {auth === 'profile' && <Profile />}
    </Modal>
  );
}

const CodeInput = styled.input`
  width: 100%;
  margin: 10px 0;
  font-size: 3.5rem;
  padding: 10px;
  outline: none;
  border: none;
`;

const CodeText = styled.span`
  display: inline-block;
  font-size: 3.5rem;
  border-radius: 1.2rem;
  border: 1.5px solid black;
  width: 5rem;
  height: 5rem;
  text-align: center;
  line-height: 5rem;
  margin-right: 1.5rem;
  user-select: none;
`;

export default AuthCode;
