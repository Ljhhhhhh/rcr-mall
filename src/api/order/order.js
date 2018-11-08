// biz/addTrade
import request from '@/utils/request';

export function addOrder(carId, money, deptId, financeId, type) {
  return request({
    url: '/biz/addTrade',
    method: 'post',
    params: {
      data: {
        productId: carId,
        money,
        deptId,
        financeId,
        type,
      },
    },
  });
};
