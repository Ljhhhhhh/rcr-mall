import * as types from './mutation-types';

const matutaions = {
  [types.SET_ALBUMLIST](state, albumlist) {
    state.albumlist = albumlist;
  },
};

export default matutaions;
