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
function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

export { cookieStringToJson, getCookie, eraseCookie };
