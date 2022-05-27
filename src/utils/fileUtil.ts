/**
 * ObjectUrl to File Convert
 * @param dataUrl
 * @param fileName
 */
import { Dispatch, SetStateAction } from 'react';
import { IImage } from '@components/setting/Profile';

export const dataURLtoFile = (dataUrl: string, fileName: string): File => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)!;
  const bStr = window.atob(arr[1]);
  let n = bStr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bStr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime[1] });
};

export const ResizeImage = (file: File, width: number, height: number, setImage: Dispatch<SetStateAction<IImage>>) => {
  const url = URL.createObjectURL(file);
  const canvas = window.document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const canvasImage = new Image();
  canvasImage.src = url;
  const maxWidth = width;
  const maxHeight = height;

  canvasImage.onload = () => {
    let width = canvasImage.width;
    let height = canvasImage.height;
    if (width > height) {
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
    }
    canvas.width = width;
    canvas.height = height;
    ctx?.drawImage(canvasImage, 0, 0, width, height);
    const resizeImageDataUrl = canvas.toDataURL('image/webp', 0.75);
    const resizeImageFile = dataURLtoFile(resizeImageDataUrl, file.name);
    const resizeImageUrl = URL.createObjectURL(resizeImageFile);
    const image: IImage = {
      file: resizeImageFile,
      url: resizeImageUrl,
    };
    setImage(image);
  };
};
