export const getDay = (date: Date) => {
  const [dateWithoutTime] = date.toISOString().split('T');

  return dateWithoutTime;
};
