export function padStartIndex(index, list) {
  let pad = (list.length + '').split('').length;
  return (index + '').padStart(pad, 0);
};
export function formatPrice(price) {
  if (price > 10000) {
    price = (price / 10000).toFixed(2) + '万';
  }
  return price;
};
