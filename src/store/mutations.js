import * as types from './mutation-types';

const matutaions = {
  [types.SET_ALBUMLIST](state, albumlist) {
    state.albumlist = albumlist;
  },
  [types.SET_FROMAPP](state, fromApp) {
    state.fromApp = fromApp;
  },
  [types.SET_AREA](state, area) {
    state.area = area;
  },
  [types.SET_USERINFO](state, userinfo) {
    state.userinfo = userinfo;
  },
};

export default matutaions;
