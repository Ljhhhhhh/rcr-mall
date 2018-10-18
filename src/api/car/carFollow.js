import request from '@/utils/request';

export function changeFollow(productId) {
  return request({
    url: 'user/saveFollow',
    method: 'post',
    params: {
      data: {
        productId,
      },
    },
  });
};
