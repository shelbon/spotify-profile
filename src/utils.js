function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  console.log("q", q);
  console.log("r", r);
  console.log("window.location.hash", window.location.hash);
  while ((e = r.exec(q))) {
    console.log("e[1]", e[1]);
    console.log("e[2]", e[2]);
    console.log("decodeURIComponent(e[2])", decodeURIComponent(e[2]));
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  console.log("hashParams", hashParams);
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
