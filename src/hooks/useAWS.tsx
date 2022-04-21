import S3 from 'aws-sdk/clients/s3';
import { updateProfileImage } from '@apis/member';

const useAWS = () => {
  const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    region: 'ap-northeast-2',
  });

  const upload = async (file: File, user: number) => {
    const uploadParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET!,
      Body: file,
      Key: `profile/${user}/profile.${file.type.split('/')[1]}`,
      ContentType: file.type,
      ACL: 'public-read',
    };

    s3.putObject(uploadParams, async (err, data) => {
      if (!err) {
        const url = `https://${process.env.NEXT_PUBLIC_AWS_S3}/profile/${user}/profile.${file.type.split('/')[1]}`;
        await updateProfileImage(user, url);
      }
    });
  };

  return { upload };
};

export default useAWS;
