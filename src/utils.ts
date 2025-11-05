type HEX = string;

const durationUnitRegex = /[a-zA-Z]/;

const calculateRgba = (color: HEX, opacity: number): string => {
  if (color[0] === '#') {
    color = color.slice(1);
  }

  if (color.length === 3) {
    let res = '';
    color.split('').forEach((c: string) => {
      res += c;
      res += c;
    });
    color = res;
  }

  const rgbValues = (color.match(/.{2}/g) || []).map((hex: HEX) => parseInt(hex, 16)).join(', ');

  return `rgba(${rgbValues}, ${opacity})`;
};

const range = (size: number, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);

// export const characterRange = (startChar, endChar) =>
//   String.fromCharCode(
//     ...range(
//       endChar.charCodeAt(0) - startChar.charCodeAt(0),
//       startChar.charCodeAt(0)
//     )
//   );

// export const zip = (arr, ...arrs) =>
//   arr.map((val, i) => arrs.reduce((list, curr) => [...list, curr[i]], [val]));

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
export {
  calculateRgba,
  durationUnitRegex,
  range,
  isObject,
  isEmptyObject,
};
