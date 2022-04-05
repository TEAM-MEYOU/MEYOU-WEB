import 'styles/globals.css';
import 'normalize.css/normalize.css';
import type { AppProps } from 'next/app';
import Layout from '@components/AppLayout';
import Navigation from '@components/Navigation';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Navigation />
    </Layout>
  );
}

export default MyApp;
