import request from '@/utils/request';

export function carDetail(id) {
  return request({
    url: '/gds/products',
    method: 'post',
    params: {
      data: {
        usrId: 2,
        id,
      },
    },
  });
};
