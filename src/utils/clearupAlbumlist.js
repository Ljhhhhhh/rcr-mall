/**
 * 乱序的相册，根据图片所属类型排序
 */
export default function clearupList(albumlist = []) {
  let tabList = [];
  let newList = [];
  albumlist.forEach(album => {
    let label = album.label;
    if (!tabList.includes(label)) {
      tabList.push(label);
    }
  });
  for (let i = 0, len = tabList.length; i < len; i++) {
    albumlist.forEach(album => {
      if (album.label === tabList[i]) {
        newList.push(album);
      }
    });
  }
  return newList;
}
