import Mock from 'mockjs';

const Album = [
  {
    type: '外观',
    url: 'https://www.maserati.com/mediaObject/sites/international/Models/grancabrio/Hero/2016-05-30/120550M/resolutions/res-l1920x10000/120550M.jpg',
  },

  {
    type: '中控',
    url: 'https://www.maserati.com/mediaObject/sites/regional/cn/2018/0910-Resize/gc/%E5%AE%98%E7%BD%91%E5%86%85%E9%A5%B0%E5%9B%BE-resize-1920x1080-gc-3/original/%E5%AE%98%E7%BD%91%E5%86%85%E9%A5%B0%E5%9B%BE-resize-1920x1080-gc-3.jpg',
  },
  {
    type: '外观',
    url: 'https://www.maserati.com/mediaObject/sites/international/Models/grancabrio/in-page/2016-06-08/gc/resolutions/res-l1920x10000/gc.jpg',
  },
  {
    type: '细节',
    url: 'https://www.maserati.com/mediaObject/sites/international/Models/grancabrio/in-page/2016-05-30/120910M/resolutions/res-870x500/120910M.jpg',
  },
  {
    type: '中控',
    url: 'https://www.maserati.com/mediaObject/sites/international/Models/grancabrio/in-page/2016-05-30/120600M/resolutions/res-870x500/120600M.jpg',
  },
  {
    type: '外观',
    url: 'https://www.maserati.com/mediaObject/sites/international/Models/grancabrio/gallery-slide/2016-05-30/111400M/resolutions/res-l1920x10000/111400M.jpg',
  },
  {
    type: '细节',
    url: 'https://www.maserati.com/mediaObject/sites/international/Models/grancabrio/in-page/2016-06-08/120610M/resolutions/res-870x582/120610M.jpg',
  },
  {
    type: '细节',
    url: 'https://www.maserati.com/mediaObject/sites/international/Models/grancabrio/in-page/2016-06-08/120640M/resolutions/res-870x582/120640M.jpg',
  },
  {
    type: '中控',
    url: 'https://www.maserati.com/mediaObject/sites/regional/cn/2018/0910-Resize/gc/%E5%AE%98%E7%BD%91%E5%86%85%E9%A5%B0%E5%9B%BE-resize-1920x1080-gc-1/original/%E5%AE%98%E7%BD%91%E5%86%85%E9%A5%B0%E5%9B%BE-resize-1920x1080-gc-1.jpg',
  },

  {
    type: '外观',
    url: 'https://www.maserati.com/mediaObject/sites/international/Models/grancabrio/in-page/2016-05-30/120590M/resolutions/res-l800x10000/120590M.jpg',
  },
];
// const count = 20;

// for (let i = 0; i < count; i++) {
//   List.push(Mock.mock({
//     order_no: '@guid()',
//     timestamp: +Mock.Random.date('T'),
//     username: '@name()',
//     price: '@float(1000, 15000, 0, 2)',
//     'status|1': ['success', 'pending']
//   }));
// }
const mockList = [];
for (let i = 0, len = Album.length; i < len; i++) {
  mockList.push(Mock.mock(Album[i]));
}

export default {
  getAlbum: () => {
    return {
      code: 200,
      msg: '获取成功',
      total: mockList.length,
      items: mockList,
    };
  },
};
