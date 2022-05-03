import 'styles/globals.css';
import 'normalize.css/normalize.css';
import type { AppProps } from 'next/app';
import Layout from '@components/AppLayout';
import Navigation from '@components/Navigation';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkMember, Member } from '@apis/member';
import MetaHead from '@components/MetaHead';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: Infinity, cacheTime: Infinity },
        },
      })
  );

  const fetchUser = async () => {
    try {
      const user: Member = await checkMember(window.localStorage.getItem('kakao')!);
      queryClient.setQueryData('user', user);
      onCheckValidUser(user);
    } catch (e) {
      window.localStorage.clear();
      router.push('/');
    }
  };

  const onCheckValidUser = (user: Member) => {
    if (!user.coupleId && ['/setting', '/getting-started', '/connection'].indexOf(router.pathname) == -1) {
      router.push('/getting-started');
    }
  };

  useEffect(() => {
    const kakao = window.localStorage.getItem('kakao');
    const user = queryClient.getQueryData<Member>('user');
    if (!kakao) {
      router.push('/');
    } else {
      if (!user) {
        fetchUser();
      } else {
        onCheckValidUser(user);
      }
    }
  }, [Component]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MetaHead />
        <Layout>
          <Component {...pageProps} />
          <Navigation />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
