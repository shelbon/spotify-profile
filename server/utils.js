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

export  {generateRandomString,cookieStringToJson};
