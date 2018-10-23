import request from '@/utils/request';

export function carDetail(data) {
  return request({
    url: '/gds/products',
    method: 'post',
    params: {
      data,
    },
  });
};
