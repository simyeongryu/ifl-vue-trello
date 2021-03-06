import * as api from '../api';
import state from './state';
import {
  LOGIN,
  ADD_BOARD,
  FETCH_BOARDS,
  FETCH_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
  ADD_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  ADD_CARD,
  FETCH_CARD,
  UPDATE_CARD,
  DELETE_CARD
} from './types/actions';

const actions = {
  // AUTH
  [LOGIN]({ commit }, { email, password }) {
    return api.auth.login(email, password)
      .then(({ accessToken }) => commit('LOGIN', accessToken));
  },

  // BOARD
  [ADD_BOARD](_, { title }) {
    return api.board.create(title).then(data => data.item);
  },

  [FETCH_BOARDS]({ commit }) {
    return api.board.fetch().then(data => {
      commit('SET_BOARDS', data.list);
    });
  },

  [FETCH_BOARD]({ commit }, { id }) {
    return api.board.fetch(id).then(data => {
      commit('SET_BOARD', data.item);
    });
  },

  [UPDATE_BOARD]({ dispatch, state }, { id, title, bgColor }) {
    return api.board.update(id, { title, bgColor })
      .then(() => dispatch('FETCH_BOARD', { id: state.board.id }));
  },

  [DELETE_BOARD]({ commit }, { id }) {
    return api.board.destroy(id)
      .then(() => commit('SET_IS_SHOW_BOARD_SETTINGS', false));
  },


  // LIST
  [ADD_LIST]({ dispatch, state }, { title, boardId, pos }) {
    return api.list.create({ title, boardId, pos })
      .then(() => dispatch('FETCH_BOARD', { id: state.board.id }));
  },

  [UPDATE_LIST]({ dispatch, state }, { id, pos, title }) {
    return api.list.update(id, { pos, title })
      .then(() => dispatch('FETCH_BOARD', { id: state.board.id }));
  },

  [DELETE_LIST]({ dispatch, state }, { id }) {
    return api.list.destroy(id)
      .then(() => dispatch('FETCH_BOARD', { id: state.board.id }));
  },

  // CARD
  [ADD_CARD]({ dispatch, state }, { title, listId, pos }) {
    return api.card.create(title, listId, pos)
      .then(() => dispatch('FETCH_BOARD', { id: state.board.id }));
  },

  [FETCH_CARD]({ commit }, { id }) {
    return api.card.fetch(id).then(data => {
      commit('SET_CARD', data.item)
    })
  },

  [UPDATE_CARD]({ dispatch, state }, { id, title, description, pos, listId }) {
    return api.card.update(id, { title, description, pos, listId })
      .then(() => dispatch('FETCH_BOARD', { id: state.board.id }));
  },

  [DELETE_CARD]({ dispatch, state }, { id }) {
    return api.card.destroy(id)
      .then(() => dispatch('FETCH_BOARD', { id: state.board.id }))
  }
}

export default actions;