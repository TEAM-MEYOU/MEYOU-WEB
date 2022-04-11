import NextImage from 'next/image';
import { css } from '@emotion/react';
import { ComponentProps } from 'react';

interface Props {
  className?: string;
  width: number;
  height: number;
  src: string;
  radius?: string;
  alt: string;
}

function Image(props: Props & ComponentProps<'span'>) {
  const { className, width, height, src, radius = '50%', alt, onClick } = props;
  return (
    <span
      className={className}
      css={css`
        display: inline-block;
        width: ${width}px;
        height: ${height}px;
        border-radius: ${radius};
        box-sizing: content-box;
      `}
      onClick={onClick}>
      <NextImage
        css={css`
          border-radius: ${radius};
        `}
        width={width}
        height={height}
        src={src}
        objectFit={'cover'}
        alt={alt}
        layout={'fixed'}
        priority={true}
        quality={85}
      />
    </span>
  );
}

export default Image;
