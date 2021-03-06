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
const STATE = {
  refreshing: 'refreshing',
  uptodate: 'uptodate',
  expired: 'expired',
};
export { getHashParams, isObject, isEmptyObject, STATE };
