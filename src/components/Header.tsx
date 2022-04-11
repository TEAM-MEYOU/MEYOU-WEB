import { css } from '@emotion/react';
import Text from '@components/Text';
import { ReactNode } from 'react';

interface Props {
  onClick?: () => void;
  children?: ReactNode;
}

const Header = ({ onClick, children }: Props) => {
  return (
    <header
      css={css`
        display: flex;
        width: 90%;
        margin-bottom: 1rem;
      `}>
      <button onClick={onClick}>
        <img
          css={css`
            width: 3rem;
            height: 3rem;
          `}
          src={'/icons/left.png'}
        />
      </button>
      <Text
        css={css`
          font-size: 3rem;
          margin-left: 5px;
        `}>
        {children}
      </Text>
    </header>
  );
};

export default Header;
