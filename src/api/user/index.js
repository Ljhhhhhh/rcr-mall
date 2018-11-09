import request from '@/utils/request';

export function getCode(redirectUri) {
  return request({
    url: 'auth/getCode',
    method: 'POST',
    params: {
      data: {
        'redirect_uri': redirectUri,
      },
    },
  });
}
// redirectUri
export function getOpenid(code) {
  return request({
    url: 'auth/login_wx',
    method: 'POST',
    params: {
      data: {
        'code': code,
      },
    },
  });
}

export function getUserinfo(token) {
  return request({
    url: 'user/info',
    method: 'POST',
    params: {
      data: {
        'token': token,
      },
    },
  });
}
