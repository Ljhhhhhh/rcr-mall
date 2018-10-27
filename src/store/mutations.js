import * as types from './mutation-types';

const matutaions = {
  [types.SET_ALBUMLIST](state, albumlist) {
    state.albumlist = albumlist;
  },
  [types.SET_FROMAPP](state, fromApp) {
    state.fromApp = fromApp;
  },
};

export default matutaions;
