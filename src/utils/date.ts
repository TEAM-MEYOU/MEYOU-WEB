/**
 * 서버 DATE TIME -> 미유에서 사용하는 DateString으로 변환
 * @param date
 * @constructor
 */
export const ConvertMeYouDateString = (date: Date) => {
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
};

/**
 * 커플 D-Day 계산
 * @param date
 * @constructor
 */
export const DiffCoupleTime = (date: Date) => {
  const current = new Date();
  return Math.ceil((current.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)) + 1;
};

/**
 * Javascript Date -> Java LocaleTime Convert
 * @param date
 * @constructor
 */
export const ToJavaLocaleDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const padMonth = month < 10 ? '0' + month : month;
  return `${date.getFullYear()}-${padMonth}-${date.getDate()}`;
};
