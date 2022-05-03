import { useQuery } from 'react-query';
import { checkMember, Member } from '@apis/member';

const useUser = () => {
  const user = useQuery<Member>('user', () => checkMember(window.localStorage.getItem('kakao')!), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return user;
};

export default useUser;
