import Container from '@components/Container';
import { css } from '@emotion/react';
import Image from '@components/Image';
import Text from '@components/Text';
import colors from '@constants/colors';
import { useFetchUser } from '@hooks/queries';

function UserInfo() {
  const fetchUser = useFetchUser();
  return (
    <>
      {fetchUser.data && (
        <Container>
          <Text>내 정보</Text>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}>
            <Image width={60} height={60} src={fetchUser.data!.imageUrl} alt={'프로필 이미지'} />
            <Text>{fetchUser.data!.nickname}</Text>
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
                {fetchUser.data!.kakao}
              </Text>
            </div>
            {fetchUser.data.coupleInfo && (
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
                  {fetchUser.data!.coupleInfo.kakao}
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
