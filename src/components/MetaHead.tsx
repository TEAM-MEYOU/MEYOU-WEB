import Head from 'next/head';

function MetaHead() {
  return (
    <Head>
      <title>미유 다이어리</title>
      <meta name={'viewport'} content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      <meta name="description" content="서로의 감정을 분석하는 커플 다이어리 애플리케이션" />
      <meta property="og:image" key="ogimage" content="https://meyoudiary.com/og_img.png" />
      <meta property="og:title" key="ogtitle" content="미유 다이어리" />
      <meta property="og:description" key="ogdesc" content="서로의 감정을 분석하는 커플 다이어리 애플리케이션" />
      <meta property="og:url" key="ogurl" content="https://meyoudiary.com" />
      <link rel={'icon'} href={'/favicon/favicon-96x96.png'} />
    </Head>
  );
}

export default MetaHead;
