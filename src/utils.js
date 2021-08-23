function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}
function isObject(variable) {
  return typeof variable === 'object' && variable !== null;
}
function isEmptyObject(obj) {
  return (
    obj === null ||
    typeof obj === 'undefined' ||
    (Object.keys(obj).length === 0 && obj.constructor === Object)
  );
}
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
export { getHashParams, isObject, isEmptyObject, cookieStringToJson };
