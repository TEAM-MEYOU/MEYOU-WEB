import { AllHTMLAttributes, Fragment, ReactNode } from 'react';
import { css } from '@emotion/react';

interface BaseProps {
  children?: ReactNode;
  className?: string;
}

type TextProps<Element extends keyof JSX.IntrinsicElements = 'span'> = BaseProps & AllHTMLAttributes<Element>;

function Text<Element extends keyof JSX.IntrinsicElements = 'span'>(props: TextProps<Element>) {
  const { className, children, style } = props as TextProps;
  return (
    <span
      css={css`
        display: inline-block;
        font-size: 2rem;
        white-space: pre-line;
        word-break: break-all;
      `}
      className={className}
      style={{ ...style }}>
      {typeof children === 'string' ? convertNewLineToJSX(children) : children}
    </span>
  );
}

function convertNewLineToJSX(str: string) {
  return str.split('\n').map((line, index) => (
    <Fragment key={index}>
      {index > 0 ? <br /> : ''}
      {line}
    </Fragment>
  ));
}

export default Text;
