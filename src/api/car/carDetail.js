import request from '@/utils/request';

export function carDetail(id) {
  return request({
    url: '/gds/product',
    method: 'post',
    params: {
      data: {
        usrId: 2,
        id,
      },
    },
  });
};
