import request from '@/utils/request';

export function fetchCarAlbum() {
  return request({
    url: '/car/album',
    method: 'get',
  });
};
