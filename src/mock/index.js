import Mock from 'mockjs';
import carAlbum from './carAlbum';

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/car\/album/, 'get', carAlbum.getAlbum);

export default Mock;
