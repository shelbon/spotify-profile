import { Duration, Interval } from 'luxon';
const generateRandomString = function (length) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
function cookieStringToJson(cookie) {
  let json = {};
  cookie.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    let name = decodeURIComponent(pair[0]);
    let value = decodeURIComponent(pair.splice(1).join('='));
    json[name] = value;
  });
  return json;
}
/**
 * determine if token should be refresh
 * @param integer expires_in  access token expiration time in  milisecond
 * @param DateTime  currentDate current date and hour
 * @param DateTime lastFetchDate time since last fetch of access token
 *
 */
function isTimeToRefreshToken(expires_in, currentDate, lastFetchDate) {
  //date when the token is invalid
  if (
    expires_in < 0 ||
    expires_in === undefined ||
    expires_in === null ||
    expires_in === NaN ||
    currentDate === undefined ||
    currentDate === null ||
    lastFetchDate === undefined ||
    lastFetchDate === null
  ) {
    return false;
  }
  let duration = Duration.fromMillis(expires_in);

  let interval = Interval.after(lastFetchDate, duration);

  return !interval.contains(currentDate);
}

export { generateRandomString, cookieStringToJson, isTimeToRefreshToken };
