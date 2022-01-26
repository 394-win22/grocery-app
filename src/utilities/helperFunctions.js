export default function removeByIndex(array, index) {
  return array.filter(function (el, i) {
    return index !== i;
  });
}

export const sumDict = (obj) => Object.values(obj).reduce((a, b) => a + b);
