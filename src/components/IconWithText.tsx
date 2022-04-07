import Container from '@components/Container';
import { css } from '@emotion/react';
import Image from '@components/Image';
import Text from '@components/Text';
import { ReactNode } from 'react';

interface Props {
  src: string;
  className?: string;
  children: ReactNode;
  textMargin?: string;
}

function IconWithText({ src, className, children, textMargin = '1.5rem' }: Props) {
  return (
    <Container
      className={className}
      css={css`
        display: flex;
        align-items: center;
        margin-top: 15px;
      `}>
      <Image radius={'0'} width={30} height={30} src={src} alt={'코인 아이콘'} />
      <Text
        css={css`
          margin-left: ${textMargin};
          font-size: 2.2rem;
        `}>
        {children}
      </Text>
    </Container>
  );
}

export default IconWithText;
