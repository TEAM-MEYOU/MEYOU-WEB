import { css } from '@emotion/react';
import Image from '@components/Image';
import Text from '@components/Text';
import styled from '@emotion/styled';

interface Props {
  url: string;
  ratio?: number;
  color: string;
}

const BarGraph = ({ ratio = 0, color, url }: Props) => {
  return (
    <Box>
      <Image
        css={css`
          border: 2px solid ${color};
        `}
        width={50}
        height={50}
        src={url}
        alt={'프로필 이미지'}
      />
      <div
        css={css`
          width: ${ratio}rem;
          height: 1rem;
          background-color: ${color};
          margin: 0 1rem;
        `}
      />
      <Text>{ratio ? ratio : 0}</Text>
    </Box>
  );
};

const Box = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
`;
export default BarGraph;
