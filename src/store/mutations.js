import { setAuthInHeader } from '../api';
import {
  SET_IS_ADD_BOARD,
  SET_BOARDS,
  SET_BOARD,
  LOGIN,
  LOGOUT,
  SET_CARD,
  SET_THEME,
  SET_IS_SHOW_BOARD_SETTINGS
} from './types/mutations';

const mutations = {
  [SET_IS_ADD_BOARD](state, toggle) {
    state.isAddBoard = toggle;
  },

  [SET_BOARDS](state, boards) {
    state.boards = boards;
  },

  [SET_BOARD](state, board) {
    state.board = board;
  },

  [LOGIN](state, token) {
    if (!token) return;

    state.token = token;
    localStorage.setItem('token', token);
    setAuthInHeader(token);
  },

  [LOGOUT](state, token) {
    state.token = null;
    delete localStorage.token;
    setAuthInHeader(null);
  },

  [SET_CARD](state, card) {
    state.card = card;
  },

  [SET_THEME](state, color) {
    state.bodyColor = color || '#ffffff';
    state.navbarColor = color ? 'rgba(0, 0, 0, .15)' : '#026aa7';
  },

  [SET_IS_SHOW_BOARD_SETTINGS](state, toggle) {
    state.isShowBoardSettings = toggle;
  }
}

export default mutations;