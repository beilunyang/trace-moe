export const toThousands = num => {
  const re = /(?=(?!(\b))(\d{3})+$)/g;
  return String(num).replace(re, ",");
};

export const formatSeconds = value => {
  let secondTime = parseInt(value); // 秒
  let minuteTime = 0; // 分
  let hourTime = 0; // 小时
  if (secondTime >= 60) {
    minuteTime = parseInt(secondTime / 60);
    secondTime = parseInt(secondTime % 60);
    if (minuteTime >= 60) {
      hourTime = parseInt(minuteTime / 60);
      minuteTime = parseInt(minuteTime % 60);
    }
  }
  let result =
    "" +
    (parseInt(secondTime) < 10
      ? "0" + parseInt(secondTime)
      : parseInt(secondTime));

  result =
    "" +
    (parseInt(minuteTime) < 10
      ? "0" + parseInt(minuteTime)
      : parseInt(minuteTime)) +
    ":" +
    result;
  result =
    "" +
    (parseInt(hourTime) < 10 ? "0" + parseInt(hourTime) : parseInt(hourTime)) +
    ":" +
    result;
  return result;
};
