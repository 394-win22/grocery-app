export default function removeByIndex(array, index) {
    return array.filter(function (el, i) {
            return index !== i;  
    });
}