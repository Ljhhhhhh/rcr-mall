import request from '@/utils/request';

export function fetchCar(data) {
  return request({
    url: '/gds/products',
    method: 'post',
    params: {
      data,
    },
  });
};
