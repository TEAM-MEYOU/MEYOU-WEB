import 'styles/globals.css';
import 'normalize.css/normalize.css';
import type { AppProps } from 'next/app';
import Layout from '@components/AppLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
