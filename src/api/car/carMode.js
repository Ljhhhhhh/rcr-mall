/**
 * 汽车品牌列表
 */
import request from '@/utils/request';

export function fetchCarBrand() {
  return request({
    url: 'car/index/brandlist',
    method: 'POST',
    params: {
      data: {},
    },
  });
}

/**
 * 根据车辆品牌寻找车系列表
 */
export function fetchCarSeries(brandId) {
  return request({
    url: 'car/index/serieslist',
    method: 'POST',
    params: {
      data: {
        brandId: brandId,
      },
    },
  });
}

/**
 * 根据车辆品牌寻找车系列表
 */
export function fetchCarMode(seriesId) {
  return request({
    url: 'car/index/modelist',
    method: 'POST',
    params: {
      data: {
        seriesId: seriesId,
      },
    },
  });
}
