import axios from 'axios';
import { EmotionValue } from '@components/DiaryLog';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/diary`;

export interface Diary {
  id: number;
  memberId: number;
  content: string;
  predEmotion: EmotionValue;
  userEmotion: EmotionValue;
  writeTime: Date;
}

export type WriteDiary = Omit<Diary, 'id' | 'writeTime'>;

/**
 * 다이어리 작성 API
 * @param diary
 */
export const writeDiary = async (diary: WriteDiary) => {
  const response = await axios.post(API_URL, diary);
  return response.data;
};

/**
 * 커플 다이어리 조회 API
 * @param coupleId
 */
export const getCoupleDiary = async (coupleId: number) => {
  const response = await axios.get(`${API_URL}/couple?coupleId=${coupleId}`);
  return response.data;
};
