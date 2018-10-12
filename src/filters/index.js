export function padStartIndex(index, list) {
  let pad = (list.length + '').split('').length;
  return (index + '').padStart(pad, 0);
}
