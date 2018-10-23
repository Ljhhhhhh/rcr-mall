import request from '@/utils/request';

export function fetchBrands() {
  return request({
    url: '/car/album',
    method: 'get',
  });
};
