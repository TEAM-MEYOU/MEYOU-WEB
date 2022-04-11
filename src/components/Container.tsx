import { css } from '@emotion/react';
import colors from '@constants/colors';
import { ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

function Container({ children, className, onClick }: Props) {
  return (
    <div
      css={css`
        position: relative;
        background-color: ${colors.white};
        width: 90%;
        height: auto;
        padding: 20px;
        border-radius: 12px;
        box-shadow: ${colors.boxShadow};
      `}
      className={className}
      onClick={onClick}>
      {children}
    </div>
  );
}

export default Container;
