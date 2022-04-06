import NextImage from 'next/image';
import { css } from '@emotion/react';

interface Props {
  className?: string;
  width: number;
  height: number;
  src: string;
  radius?: string;
  alt: string;
}

function Image(props: Props) {
  const { className, width, height, src, radius = '50%', alt } = props;
  return (
    <span className={className} css={css``}>
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
