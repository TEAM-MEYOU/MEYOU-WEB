import { ReactNode } from 'react';
import { css } from '@emotion/react';

interface Props {
  classname?: string;
  children: ReactNode;
}

const ColumnList = ({ classname, children }: Props) => {
  return (
    <ul
      className={classname}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 30px 0 0 0;
      `}>
      {children}
    </ul>
  );
};

export default ColumnList;
