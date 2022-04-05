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
        width: 95%;
        height: auto;
        padding: 10px;
        border-radius: 12px;
        box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.06), 0 0 1px 0 rgba(0, 0, 0, 0.28);
      `}
      className={className}>
      {children}
    </div>
  );
}

export default Container;
