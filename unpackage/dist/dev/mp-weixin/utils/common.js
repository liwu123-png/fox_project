"use strict";
function formatTimeDiff(timestamp) {
  const currentTime = Date.now();
  const diff = currentTime - timestamp;
  const oneMinuteMs = 60 * 1e3;
  const oneHourMs = 60 * oneMinuteMs;
  const oneDayMs = 24 * oneHourMs;
  const oneMonthMs = 30 * oneDayMs;
  const threeMonthsMs = 3 * oneMonthMs;
  if (diff < oneMinuteMs) {
    return "1分钟";
  } else if (diff < oneHourMs) {
    const minutes = Math.floor(diff / oneMinuteMs);
    return `${minutes}分钟`;
  } else if (diff < oneDayMs) {
    const hours = Math.floor(diff / oneHourMs);
    return `${hours}小时`;
  } else if (diff < oneMonthMs) {
    const days = Math.floor(diff / oneDayMs);
    return `${days}天`;
  } else if (diff < threeMonthsMs) {
    const months = Math.floor(diff / oneMonthMs);
    return `${months}月`;
  }
  return null;
}
exports.formatTimeDiff = formatTimeDiff;
