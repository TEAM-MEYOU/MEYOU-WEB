import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/couple`;

/**
 * 인증코드 생성
 * @param uniqueCode
 * @param coupleUniqueCode
 */
export const makeAuthCode = async (uniqueCode: string, coupleUniqueCode: string) => {
  const response = await axios.get(`${API_URL}/code?uniqueCode=${uniqueCode}&coupleUniqueCode=${coupleUniqueCode}`);
  return response.data;
};

/**
 * 인증코드 체크
 * @param uniqueCode
 * @param authCode
 */
export const checkAuthCode = async (uniqueCode: string, authCode: string) => {
  const response = await axios.get(`${API_URL}/check?uniqueCode=${uniqueCode}&authCode=${authCode}`);
  return response.data;
};
