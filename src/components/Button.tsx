import { ButtonHTMLAttributes, forwardRef, Ref } from 'react';
import { css } from '@emotion/react';
import colors from '@constants/colors';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  color?: string;
}

const Button = forwardRef(function Button(props: Props, forwardedRef: Ref<HTMLButtonElement>) {
  const { fullWidth = true, color, children, className, ...rest } = props;

  return (
    <button
      css={css`
        width: ${fullWidth ? '100%' : 'auto'};
        color: ${color ? color : colors.white};
        background-color: ${colors.button100};
        border: none;
        border-radius: 16px;
        font-size: 25px;
        padding: 5px 15px;
        cursor: pointer;
        height: 45px;

        &:active {
          background-color: ${color ? '' : colors.button200};
        }
      `}
      className={className}
      ref={forwardedRef}
      {...rest}>
      <span>{children}</span>
    </button>
  );
});

export default Button;
