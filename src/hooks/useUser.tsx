import { useQuery } from 'react-query';
import { checkMember, Member } from '@apis/member';

const useUser = () => {
  const user = useQuery<Member>('user', () => checkMember(window.localStorage.getItem('kakao')!));

  return user;
};

export default useUser;
