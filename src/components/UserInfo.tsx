import Container from '@components/Container';
import { css } from '@emotion/react';
import Image from '@components/Image';
import Text from '@components/Text';
import colors from '@constants/colors';
import useUser from '@hooks/useUser';

function UserInfo() {
  const user = useUser();
  return (
    <>
      {user.data && (
        <Container>
          <Text>내 정보</Text>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-right: 1.5rem;
            `}>
            <Image width={60} height={60} src={user.data!.imageUrl} alt={'프로필 이미지'} />
            <Text>{user.data!.nickname}</Text>
          </div>
          <div
            css={css`
              flex: 1;
            `}>
            <div
              css={css`
                display: flex;
                margin-top: 0.5rem;
              `}>
              <Text
                css={css`
                  color: ${colors.grey500};
                `}>
                카카오 계정
              </Text>
              <Text
                css={css`
                  margin-left: auto;
                `}>
                {user.data!.kakao}
              </Text>
            </div>
            {user.data.coupleInfo && (
              <div
                css={css`
                  display: flex;
                  margin-top: 0.5rem;
                `}>
                <Text
                  css={css`
                    color: ${colors.grey500};
                  `}>
                  연결된 상대방
                </Text>
                <Text
                  css={css`
                    margin-left: auto;
                  `}>
                  {user.data!.coupleInfo.kakao}
                </Text>
              </div>
            )}
          </div>
        </Container>
      )}
    </>
  );
}

export default UserInfo;
