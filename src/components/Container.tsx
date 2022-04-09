import { css } from '@emotion/react';
import colors from '@constants/colors';
import { ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

function Container({ children, className }: Props) {
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
      className={className}>
      {children}
    </div>
  );
}

export default Container;
